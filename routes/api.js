/**
 * generic routes
 */
function api (app){
    var AuthController = app.controllers.AuthController,
        UserController = app.controllers.UserController,
        AuthMiddleware = app.middlewares.AuthMiddleware; //Middleware to verify user access

    
    app
    .post('/api/signin', AuthController.authenticate) //Sign In
    .post('/api/signout', AuthMiddleware.verifyAccess, AuthController.logout) //Sign Out
    .post('/api/signup', UserController.signup) //Sign Up

}
module.exports = api;