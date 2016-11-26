/**
 * movies routes
 */
function movies (app){
    var MovieController = app.controllers.MovieController,
        AuthMiddleware = app.middlewares.AuthMiddleware; //Middleware to verify user access

    app
        .get('/api/movies', AuthMiddleware.verifyAccess, MovieController.getMovies) //get available movies
        .get('/api/movies/:title', AuthMiddleware.verifyAccess, MovieController.getMovie); //get movies by title


}
module.exports = movies;