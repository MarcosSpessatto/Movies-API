/**
 * Module to help handling errors
 */
function errorHelper(){
    return {
        /**
         * function to make error object, with status and error message
         * @param status
         * @param message
         * @returns {Error}
         */
        makeError: function(status, message){
            var err = new Error(message);
            err.status = status;
            return err;
        }
    }
};

module.exports = errorHelper;