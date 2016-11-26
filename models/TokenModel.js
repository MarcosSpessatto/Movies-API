/**
 * function to manipulate Token queries
 */

function TokenModel(app) {
    var database = app.db.database,
        httpStatus = app.helpers.httpStatus,
        errorHelper = app.helpers.errorHelper,
        messages = app.helpers.messages,
        sql = '',
        params = [];
    return {
        /**
         * function logout user, inserting the token inside db
         * @param token
         * @returns status or erro message
         */
        logout: function(token){
            return new Promise(function(resolve, reject){
                var sql = 'insert into database.tokens (token) values (?);';
                var params = [token];
                database.executeQuery(sql , params).then(function(data){
                    resolve(httpStatus.ok);
                }).catch(function(err){
                    reject(err);
                })
            });
        },
        /**
         * function to verify if token requested hass been discarded
         * @param token
         * @returns query data
         */
        verifyToken: function(token){
            return new Promise(function(resolve, reject){
                var sql = 'select id from database.tokens where token = ?';
                var params = [token];
                database.executeQuery(sql , params).then(function(data){
                    if(data.data.length !== 0){
                        reject(errorHelper.makeError(httpStatus.unauthorized, messages.expired));
                    }
                    resolve(data);
                }).catch(function(err){
                    reject(err);
                })
            });
        }
    }
};

module.exports = TokenModel;
        