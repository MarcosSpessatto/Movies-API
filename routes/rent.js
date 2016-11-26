/**
 * rent routes  
 */
function rent (app){
    var RentController = app.controllers.RentController,
        AuthMiddleware = app.middlewares.AuthMiddleware; //Middleware to verify user access

    app
        .post('/api/movies/rent', AuthMiddleware.verifyAccess, RentController.rentMovie) //rent a movie by id
        .post('/api/movies/devolution', AuthMiddleware.verifyAccess, RentController.devolutionMovie); //returns the movie by id


}
module.exports = rent;