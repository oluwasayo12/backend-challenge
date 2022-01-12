'use strict';

const math = require('mathjs');
const sanitize = /^[\s\d\.+-/*)(]*$/

module.exports = class calculusController {
    initializeCalculusCalculator = async (request, response, next) => {
        try {

            //Extract "query" parameter from the URL query string.
            let query = request.query.query;
            if(!query) throw new Error(`422|Input value must be provided|`);

            //decode base64 input to string
            let calculusData = Buffer.from(query, 'base64').toString('ascii');

            //ensuring valid input is provided
            if(!calculusData) throw new Error(`422|Invalid input provided|`);

            //run regexExp to determine if supported operations exists in returned string
            if (!sanitize.test(calculusData)) throw new Error("422|Only () + - / * and numbers are supported|");

            //run calculus operation
            let calculusResult = math.evaluate(calculusData)

            response.status(200).json({
                error: false,
                result: calculusResult
            });

        }catch (e) {
            next(new Error(e.message));
        }
    }
}