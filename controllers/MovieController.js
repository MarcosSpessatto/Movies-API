/**
 * Controller to manipulate Movies functions
 * @param app
 * @constructor
 */

function MovieController(app) {
    var Movie = app.models.MovieModel,
        tokenHelper = app.helpers.tokenHelper,
        errorHelper = app.helpers.errorHelper,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages;

    return {
        /**
         * get all Movies
         * @param request
         * @param response
         * @param next
         * @returns  an array of movies
         */
        getMovies: function(request, response, next){
            Movie.getMovies().then(function(data){
                response.json(data);
            }).catch(function(err){
                next(err);
            });
        },
        /**
         * get movie by title
         * @param request
         * @param response
         * @param next
         * @returns an array of search criteria
         */
        getMovie: function(request, response, next){
            var title = request.params.title;
            Movie.getMovie(title).then(function(data){
                response.json(data);
            }).catch(function(err){
                next(err);
            });
        }
    };
};
module.exports = MovieController;