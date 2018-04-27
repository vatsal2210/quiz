module.exports = function (crowdboticsObj, appContext) {

    var userController = crowdboticsObj.userController,
        appUtil = crowdboticsObj.appUtil,
        app = appContext.app;

    //Login page
    app.get('/login', function (req, res) {
        res.render('login');
    });

    //Start Quiz
    app.post('/registerUser', function (req, res) {
        userController.registerUser(req.body, function (error, result) {
            if (error) {
                req.flash('error_msg', "Try Again!");
                res.redirect('/login');
            } else {
                res.redirect('/dashboard');
            }
        });
    });

}
