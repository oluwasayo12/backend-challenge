"use strict";
const express = require("express");
let router = express.Router();

router.use(async function(request, res, next) {
    try {
        next();
    } catch (e) {
        next(new Error(e.stack));
    }
});

let calculusController = require('./_controller/calculus');
calculusController = new calculusController();

router
    .route('/calculus')
    .get(calculusController.initializeCalculusCalculator);

module.exports = router;