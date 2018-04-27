module.exports = function (crowdboticsObj, appContext) {

    var dashboardController = crowdboticsObj.dashboardController,
        appUtil = crowdboticsObj.appUtil,
        app = appContext.app;

    app.get('/dashboard', function (req, res) {
        dashboardController.dashboardDetails(req.body, function (error, result) {
            if (error) {
                req.flash('error_msg', "Try Again!");
                res.redirect('/login');
            } else {
                console.log('Quiz data ', result);
                res.render('dashboard', result);
            }
        });       
    });

    app.post('/submitResult', function (req, res) {
        console.log('In Submit result ', req.body);
        dashboardController.submitResult(req.body, function (error, result) {
            if (error) {
                req.flash('error_msg', "Try Again!");
                res.redirect('/login');
            } else {
                console.log('Quiz Result ', result);
                res.json(result);
            }
        });       
    });
}