"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 5000;
app.post('/', function (request, response) {
    response.json({ message: "rere" });
});
app.listen(port, function () { return console.log("Running on port ".concat(port)); });
