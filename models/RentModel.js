/**
 * funciton to manipulate Rent queries
 *  */
function RentModel(app){
    var database = app.db.database,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages,
        errorHelper = app.helpers.errorHelper;
    return {
        /**
         * insert statement for the renting movie
         * @param movie
         * @param user
         * @returns status or error message
         */
        rentMovie: function(movie, user){
            return new Promise(function(resolve, reject){
                var sql = 'insert into database.rent(movie, user) values (?, ?);';
                var params = [movie, user];
                database.executeQuery(sql , params).then(function(data){
                    resolve(httpStatus.ok);
                }).catch(function(err){
                    reject(err);
                })
            });
        },
        /**
         * delete statement for erasing the renting
         * @param movie
         * @param user
         * @returns status or error message
         */
        devolutionMovie: function(movie, user){
            return new Promise(function(resolve, reject){
                var sql = 'delete from database.rent where movie = ? and user = ?';
                var params = [movie, user];
                database.executeQuery(sql , params).then(function(data){
                    resolve(httpStatus.ok);
                }).catch(function(err){
                    reject(err);
                })
            });
        }
    }
};

module.exports = RentModel;