"use strict";
class ErrorHandler {
    constructor(error) {
        return this.handler(error);
    }

    handler = (errorMessage) => {
        let message = errorMessage.message;

        if(message.includes('|'))
        {
            // split the error response
            message = message.split('|');
            return {
                errorCode: message[0],
                message: message[1]
            }
        }

        return {
            message: message
        }
        
    }
}


module.exports = ErrorHandler;
