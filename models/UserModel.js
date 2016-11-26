/**
 * function to manipulate User's queries
 */
var md5 = require('md5');

function UserModel(app) {
    var database = app.db.database,
        tokenHelper = app.helpers.tokenHelper,
        httpStatus = app.helpers.httpStatus,
        sql = '',
        params = [];
    return {
        /**
         * function to authenticate user
         * @param email
         * @param password
         * @returns query result
         */
        authenticate: function (email, password) {
            return new Promise(function (resolve, reject) {
                var sql = 'select id, name, email from database.users where email = ? and password = ?';
                var params = [email, md5(password)];
                database.executeQuery(sql, params).then(function (user) {
                    resolve(user);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * function to insert user
         * @param email
         * @param password
         * @returns status or error message
         */
        insert: function(email, name, password){
            return new Promise(function (resolve, reject) {
                var sql = 'insert into database.users(email, name, password)values (?, ?, ?)';
                var params = [email, name, md5(password)];
                database.executeQuery(sql, params).then(function (data) {
                    resolve(httpStatus.ok);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * function to get user by email, used for verify if email has been already used
         * @param email
         * @returns query result
         */
        getByEmail: function(email){
            return new Promise(function (resolve, reject) {
                var sql = 'select * from database.users where email = ?';
                var params = [email];
                database.executeQuery(sql, params).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }
};

module.exports = UserModel;