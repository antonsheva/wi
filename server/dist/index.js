"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 5000;
app.get('/', function (request, response) {
    response.send('Hello world!');
});
app.listen(port, function () { return console.log("Running on port ".concat(port)); });
