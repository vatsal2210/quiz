module.exports = function (appContext) {

    var crowdboticsObj = {};

    //Util
    var appUtil = require("../util/app-util.js")(appContext);
    crowdboticsObj.appUtil = appUtil;

    //Controller
    var userController = require("../controller/userController.js")(crowdboticsObj, appContext);
    crowdboticsObj.userController = userController;

    var dashboardController = require("../controller/dashboardController.js")(crowdboticsObj, appContext);
    crowdboticsObj.dashboardController = dashboardController;

    //Router
    var userRoute = require("./user-route.js")(crowdboticsObj, appContext);
    var dashboardRoute = require("./dashboard-route.js")(crowdboticsObj, appContext);

}