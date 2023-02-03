"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var tokenService = require('../services/token-service');
module.exports = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(api_error_1["default"].UnauthorisedError());
        }
        var token = authHeader.split(' ')[1];
        if (!token) {
            return next(api_error_1["default"].UnauthorisedError());
        }
        var userData = tokenService.validateAccessToken(token);
        if (!userData) {
            return next(api_error_1["default"].UnauthorisedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next(api_error_1["default"].UnauthorisedError());
    }
};
