"use strict";
const express = require("express");
const server = express();

// include body parser
const bodyParser = require( "body-parser" );

server.use( bodyParser.json() );

const bootstrap = require("./bootstrap");
const errorHandler = require('./error-handler');
const router = express.Router();


server.use(router);
bootstrap(server, router);
//handling none-existence routes
server.use( ( request, result, next ) => {
    next( {
        error: true,
        message: 'Route Not Found'
    });
} )

// handling and skipped system errors.
server.use( (error, request, response, next) => {
    if (error instanceof Error) {
        error = new errorHandler(error);
    }

    const statusCode =  (error.errorCode) ? error.errorCode : 500;
    const statusMessage = {
        error: true,
        message: error.message
    };

    response.status(statusCode).json(statusMessage);
} )

module.exports = server;