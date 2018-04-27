module.exports = function (crowdboticsObj, appContext) {

    var appUtil = crowdboticsObj.appUtil,
        sqliteDB = appContext.sqliteDB,
        constants = appContext.constants;

    exports.registerUser = function (data, cb) {
        console.log(data);
        var name = data.name,
            email = data.email,
            currentDateTime = appUtil.currentDateTime();

        if (name == '' || email == '') {
            response = appUtil.createSuccessResponse(constants.responseCode.ALL_FIELD_REQUIRE);
            return cb(response, null);
        } else {
            var saveUserData = sqliteDB.prepare(constants.SAVE_USER_INFO);
            saveUserData.run(name, email, function (error, result) {
                if (error) {
                    console.log("Register User Error is : " + error);
                    response = appUtil.createErrorResponse(constants.responseCode.INTERNAL_SERVER_ERROR);
                    return cb(response, null);
                } else {
                    response = appUtil.createSuccessResponse(constants.responseCode.SUCCESS);
                    return cb(null, response);
                }
            })
        }
    }

    return exports;
}