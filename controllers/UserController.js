/**
 * Controller to manipulate Auth functions
 * @param app
 * @constructor
 */

function UserController(app) {
    var User = app.models.UserModel,
        errorHelper = app.helpers.errorHelper,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages;

    return {
        /**
         * function to sign up
         * @param request
         * @param response
         * @param next
         * @returns status, 200 if ok, or error message
         */
        signup: function (request, response, next) {
            var user = {},
                email = request.body.email,
                password = request.body.password,
                name = request.body.name;
            if (email !== undefined && password !== undefined && name !== undefined) {
                //if the password is weak
                if(password.length >= 5 ){
                    //if email is valid
                    if(_validateEmail(email)){
                        //verify if email already exists in the database
                        User.getByEmail(email).then(function(data){
                            //if didn't, we inserted
                            if(data.data.length === 0){
                                User.insert(email, name, password).then(function (data) {
                                    response.json(data);
                                });
                            } else{
                                next(errorHelper.makeError(httpStatus.forbidden, messages.emailExists)); //email already exists error
                            }
                        }).catch(function (err) {
                            next(err);
                        });
                    }else{
                        next(errorHelper.makeError(httpStatus.badRequest, messages.invalidEmail)); // weak password error
                    }
                }else{
                     next(errorHelper.makeError(httpStatus.badRequest, messages.weakPassword)); // weak password error
                }
            } else {
                next(errorHelper.makeError(httpStatus.badRequest, messages.parameters)); // insufficient parameters
            }
        }
    };
};

/**
 * function to validate email with Regex
 * @param email
 * @returns {boolean}
 * @private
 */
function _validateEmail(email){
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

module.exports = UserController;