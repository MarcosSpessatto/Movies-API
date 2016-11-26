/**
 * Controller to manipulate Auth functions
 * @param app
 * @constructor
 */

function RentController(app) {
    var Rent = app.models.RentModel,
        errorHelper = app.helpers.errorHelper,
        tokenHelper = app.helpers.tokenHelper,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages;

    return {
        /**
         * function to rent a movie, passing the id of movie requested
         * @param request
         * @param response
         * @param next
         * @returns status: 200 if ok, or error message
         */
        rentMovie: function (request, response, next) {
            var token = request.query.token || request.headers.authorization;
            var movie = request.body.movieId;
            if (movie !== undefined) {
                //decode the token to get the user id for inserting the rent in the database
                tokenHelper.decodeToken(token).then(function(data){
                    var user = data.id
                    Rent.rentMovie(movie, user).then(function (data) {
                        response.json(data);
                    })
                }).catch(function (err) {
                    next(err);
                });
            } else {
                next(errorHelper.makeError(httpStatus.badRequest, messages.parameters)); //Insufficient parameters
            }
        },
        /**
         * function to devolution of renting movie
         * @param request
         * @param response
         * @param next
         * @returns status: 200 if ok, or error message
         */
        devolutionMovie: function(request, response, next){
            var token = request.query.token || request.headers.authorization;
            var movie = request.body.movieId;
            if (movie !== undefined) {
                ////decode the token to get the user id for deleting the rent in the database
                tokenHelper.decodeToken(token).then(function(data){
                    var user = data.id
                    Rent.devolutionMovie(movie, user).then(function (data) {
                        response.json(data);
                    })
                }).catch(function (err) {
                    next(err);
                });
            } else {
                next(errorHelper.makeError(httpStatus.badRequest, messages.parameters)); //Insufficient parameters
            }
        }
    };
};
module.exports = RentController;