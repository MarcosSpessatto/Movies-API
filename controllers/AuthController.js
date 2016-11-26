/**
 * Controller to manipulate Auth functions
 * @param app
 * @constructor
 */

function AuthController(app) {
    var User = app.models.UserModel,
        Token = app.models.TokenModel,
        tokenHelper = app.helpers.tokenHelper,
        errorHelper = app.helpers.errorHelper,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages;

    return {
        /**
         * function login, verify identity
         * @param request
         * @param response
         * @param next
         * @returns User object and TOKEN in header -> authorization
         */
        authenticate: function (request, response, next) {
            var user = {};
            var email = request.body.email;
            var password = request.body.password;
            if (email !== undefined && password !== undefined) {
                User.authenticate(email, password).then(function (data) {
                    //if login was invalid
                    if(data.data.length === 0){
                        throw errorHelper.makeError(httpStatus.forbidden, messages.invalidLogin);
                    }
                    user = data;
                    //Making the JWT
                    return tokenHelper.makeToken(user).then(function (token) {
                        return token;
                    });
                }).then(function (token) {
                    response.header('authorization', token); //append token to the header
                    response.json(user); //send response
                }).catch(function (err) {
                    next(err);
                });
            } else {
                next(errorHelper.makeError(httpStatus.badRequest, messages.parameters)); //insufficient parameters
            }
        },
        /**
         * function to make logout. We inserted the token that was already used in the database to avoid problems
         * @param request
         * @param response
         * @param next
         * @returns an status: 200, if Ok or a error message
         */
        logout: function(request, response, next){
            var token = request.headers.authorization;
            if(token !== undefined){
                //verify if already exists in the database, prevent logout one more times
                Token.verifyToken(token).then(function(data){
                    if(data.data.length === 0){
                        //inserting in the database
                        Token.logout(token).then(function(data){
                        });
                    }
                    response.json(httpStatus.ok)
                }).catch(function(err){
                    next(err);
                });                 
            }else{
                throw errorHelper.makeError(httpStatus.badRequest, messages.noToken); //if not exists token in the request header
            }
        }
    };
};
module.exports = AuthController;