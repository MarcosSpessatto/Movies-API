/**
 * middleware to verify user access, if he has token, and if he has expired
 */
var jwt = require('jwt-simple'),
    config = require('config'),
    moment = require('moment');

function AuthMiddleware (app){
    var errorHelper = app.helpers.errorHelper,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages,
        User = app.models.UserModel,
        Token = app.models.TokenModel;
    return {
        /**
         * function that implements the middleware auth
         * @param request
         * @param response
         * @param next
         * @returns {next() if has permission
         */
        verifyAccess: function(request, response, next) {
            var token = request.query.token || request.headers.authorization;
            //if didn't have token, we throwing error
                if (token !== undefined) {
                    try {
                        var decoded = jwt.decode(token, config.get('secret'));
                        var isExpired = moment(decoded.exp).isBefore(new Date());
                        //if he is expired, for the time
                        if (isExpired) {
                            return next(errorHelper.makeError(httpStatus.unauthorized, messages.expired)); //expired for the time
                        } else {
                            //verify if token has already been used, and has been discarded with row inserted in the database 
                            Token.verifyToken(token).then(function(data){
                                next(); //if the token is still alive
                            }).catch(function(err){
                                return next(err); //if has already been discarded
                            })
                        }
                    } catch (err) {
                        return next(err);
                    }
                }else {
                    throw errorHelper.makeError(httpStatus.forbidden, messages.noToken); //without token
                }
        }
    }
};

module.exports = AuthMiddleware;