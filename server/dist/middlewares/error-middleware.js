"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var api_error_1 = __importDefault(require("../exceptions/api-error"));
module.exports = function (err, req, res, next) {
    console.log("===============================");
    console.log(err.message);
    console.log("+++++++++++++++++++++++++++++++");
    if (err instanceof api_error_1["default"]) {
        console.log("err instanceof is ApiError");
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    console.log("err instanceof is not ApiError");
    return res.status(500).json({ message: err.message });
};
