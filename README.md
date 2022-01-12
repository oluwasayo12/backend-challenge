## A simple web service which implements a calculator

The service offers an endpoint that reads a string input and parses it. It returns either an HTTP error code, or a solution to the calculation in JSON form. 

An example calculus query: Original query: 2 * (23/(3*3))- 23 * (2*3)
With encoding: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=

## Test app online from office
Endpoint: https://futurice-backend-challenge.herokuapp.com/v1/calculus?query=ey8gL30=

## API Description

Endpoint: GET /v1/calculus?query=[input]

The input can be expected to be UTF-8 with BASE64 encoding

Return:
- On success: JSON response of format: { "error": false, "result": number }
- On error: Either a HTTP error code or: { "error": true, "message": "string" }

- Supported operations: + - * / ( )

## Deploy on local system
- Clone repository
- run npm install (to install node dependencies)
- run npm start (to start local server)

## Run Unit Tests
run npm test

## Heroku Deployment Process

- Login to heroku web platform
- Create a new app "futurice-backend-challenge"
- Then, login via code editor (VS code) by running
    - heroku login
- After successful login, run the following
    - heroku git:remote -a futurice-backend-challenge  
    - git add .
    - git commit -am "initial deployment commit"
    - git push heroku master
- Heroku app should be deployed successfully
