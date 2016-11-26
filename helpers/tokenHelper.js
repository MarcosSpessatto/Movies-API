/**
 * Module to help manipulation of JWT
 */
var config = require('config'),
	moment = require('moment'),
	jwt = require('jwt-simple');

function tokenHelper(){
    return {
        /**
         * function to make token with user data
         * @param data
         * @returns json web token with seven days to expires
         */
        makeToken: function(data){
            return new Promise(function(resolve, reject) {
                var secret = jwt.encode({
                    id: data.data.id,
                    email: data.data.email,
                    name: data.data.name,
                    exp: moment().add(config.get('sessionDuration'), 'days').valueOf()
                }, config.get('secret'));
                resolve(secret);
            });
        },
        /**
         * function to decode the token and get the user data
         * @param token
         * @returns object with the data which was the token
         */
        decodeToken: function(token){
            return new Promise(function(resolve, reject) {
                try {
                    var decoded = jwt.decode(token, config.get('secret'));
                    resolve(decoded);
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
};

module.exports = tokenHelper;