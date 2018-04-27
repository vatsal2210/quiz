module.exports = function (appContext) {

    var moment = appContext.moment;

    exports.currentDateTime = function () {
        return moment().format("YYYY-MM-DD HH:mm:ss");
    };

    exports.createResponse = function (code, message, data) {
        return {
            code: code,
            message: message,
            data: data
        };
    };

    exports.createErrorResponse = function (responseCode, data) {
        return exports.createResponse(responseCode.code, responseCode.message, data);
    };

    exports.createSuccessResponse = function (responseCode, data) {
        return exports.createResponse(responseCode.code, responseCode.message, data);
    };   

    return exports;
}