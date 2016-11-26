/**
 *  function to manipulate movie queries
 * */
function MovieModel(app){
    var httpStatus = app.helpers.httpStatus,
        errorHelper = app.helpers.errorHelper,
        database = app.db.database;
    return {
        /**
         * function to get movies available
         * @returns query result
         */
        getMovies: function () {
            return new Promise(function (resolve, reject) {
                var sql = 'select m.id, m.title, m.director, (m.copies- count(r.movie)) as available from database.movies m ';
                    sql += 'left join database.rent r on r.movie = m.id ';
                    sql += 'group by m.id, m.title, m.director '
                    sql += 'having available > 0 ' 
                    sql += 'order by title ASC';
                database.executeQuery(sql).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        },
        /**
         * function to get movie by title
         * @param title
         * @returns query result
         */
        getMovie: function (title) {
            return new Promise(function (resolve, reject) {
                var sql = 'select m.id, m.title, m.director, (m.copies- count(r.movie)) as available from database.movies m ';
                    sql += 'left join database.rent r on r.movie = m.id ';
                    sql +=  'where UPPER(title) like ? '
                    sql +=  'group by m.id, m.title, m.director '
                    sql +=  'order by title ASC';
                var params = ['%' + title.toUpperCase() + '%'];
                database.executeQuery(sql, params).then(function (data) {
                    resolve(data);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }
};

module.exports = MovieModel;