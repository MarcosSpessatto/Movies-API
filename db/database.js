/**
 * Module to make operations in the database, all of then Async
 */

var mysql = require('mysql');

/**
 * create connection with Mysql
 */
var db = mysql.createPool({
    host: 'localhost',
    user: 'yourDatabse',
    password: 'yourPassword',
    database: 'evaluation'
});

//handling error winth connection
db.on('error', function () {
    console.log('Problema na conexão com o banco de dados');
    db.end();
});

function database(app) {
    var errorHelper = app.helpers.errorHelper,
        httpStatus = app.helpers.httpStatus,
        messages = app.helpers.messages,
        response = {};
    return {
        //function to execute any query, implements a Promise
        executeQuery: function (query, params, list) {
            return new Promise(function (resolve, reject) {
                var rejectError = errorHelper.makeError(httpStatus.unavailable, messages.dbError);
                db.getConnection(function (err, connection) {
                    //if we having trouble, we rolledback the transaction, and reject it
                    if (err) {
                        connection.rollback(function () {
                            reject(rejectError);
                        });
                    }
                    //if having params, we execute query with params, else without them
                    if (params !== undefined) {
                        connection.query(query, params, function (err, rows) {
                            connection.release();
                            if (!err) {
                                //parse the response if having one row
                                 if (rows.length === 1 && list === undefined) {
                                    response.data = JSON.parse(JSON.stringify(rows[0]));
                                }
                                else {
                                    response.data = JSON.parse(JSON.stringify(rows));
                                }
                            }
                        });
                    } else {
                        connection.query(query, function (err, rows) {
                            connection.release();
                            if (!err) {
                                //parse the response if having one row
                                 if (rows.length === 1 && list === undefined) {
                                    response.data = JSON.parse(JSON.stringify(rows[0]));
                                }
                                else {
                                    response.data = JSON.parse(JSON.stringify(rows));
                                }
                            }
                        });
                    }
                    //if it was a success, we commited
                    connection.commit(function (err) {
                        //if has error when commiting, we rolledback and reject it
                        if (err) {
                            return connection.rollback(function () {
                                reject(errorHelper.makeError(httpStatus.unavailable, messages.queryError));
                            });
                        }
                        //if we did some data inside response, we resolve the Promise, else reject
                        if (response.data !== undefined) {
                            resolve(response);
                        } else {
                            reject(errorHelper.makeError(httpStatus.unavailable, messages.queryError));
                        }
                    });

                    connection.on('error', function (err) {
                        reject(rejectError);
                    });
                });
            });
        }
    }
}

module.exports = database;
