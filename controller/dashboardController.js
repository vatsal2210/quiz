module.exports = function (crowdboticsObj, appContext) {

    var appUtil = crowdboticsObj.appUtil,
    sqliteDB = appContext.sqliteDB,
        constants = appContext.constants;

    exports.dashboardDetails = function (data, cb) {
        var details, questionArray = [];
        
        var questionDetails = sqliteDB.prepare(constants.GET_QUIZ_QUESTION_DETAILS);
        questionDetails.all(function (err, result) {
            if (err) {
                response = appUtil.createErrorResponse(constants.responseCode.INTERNAL_SERVER_ERROR);
                return cb(response, null);
            } else {                
                if (result.length > 0) {     
                    promise1 = new Promise((resolve, reject) => { 
                        var questionNumber = 0;
                        var callBackFunction = function() {                                                       
                            if(questionNumber == result.length) {                            
                                resolve(true);
                            }
                        }               

                        for (var p = 0; p < result.length; p++) {
                            questionArray.push(result[p]);
                            questionNumber++;
                            callBackFunction();
                        }
                        
                    });

                    promise2 = new Promise((resolve, reject) => { 
                        var processQuestion = 0;                       
                        var callBackFunction = function() {
                            if(processQuestion == result.length) {                            
                                resolve(true);
                            }
                        }

                        for(var j=0; j < questionArray.length; j++) {                                                
                            var getOptionDetails = sqliteDB.prepare(constants.GET_OPTIONS_DETAILS);
                            getOptionDetails.all(questionArray[j].id, function(err, response){
                                if(err) {
                                    processQuestion = processQuestion + 1;
                                    callBackFunction();
                                } else {                                    
                                    questionArray[processQuestion].optionDetails = response;                                    
                                    processQuestion = processQuestion + 1;
                                    callBackFunction();
                                }
                            })
                        }       
                    })

                    var callBackFunction = function () {
                        response = appUtil.createErrorResponse(constants.responseCode.SUCCESS, questionArray);
                        return cb(null, response);
                    }

                    function main() {
                        Promise.all([promise1, promise2]).then(callBackFunction);
                    }

                    main();                                                                                                                             
                } else {                   
                    response = appUtil.createErrorResponse(constants.responseCode.SUCCESS, details);
                    return cb(null, response);
                }
            }
        });
    }

    exports.submitResult = function(data, cb){         
        var details = data.answerArray;
        var totalCorrectAnswer = 0, processQuestion = 0;
        
        var callBackFunction = function() {
            if(processQuestion == details.length) {
                console.log('totalCorrectAnswer ' , totalCorrectAnswer);
                var data = {
                    totalCorrectAnswer: totalCorrectAnswer
                }
                response = appUtil.createErrorResponse(constants.responseCode.SUCCESS, data);
                return cb(null, response);
            }
        }

        for(var i=0;i<details.length; i++){
            console.log(details[i].question_id, details[i].answer);
            var checkQuestionAnswer = sqliteDB.prepare(constants.CHECK_ANSWER);
            checkQuestionAnswer.all(details[i].question_id, details[i].answer, function(err, result){
                if(result.length > 0) {                    
                    var score = result[0].score;                    
                    totalCorrectAnswer = totalCorrectAnswer + score;
                    processQuestion++;
                    callBackFunction();                                        
                } else {  
                    processQuestion++;
                    callBackFunction();
                }
            });
        }
    }
    return exports;
};