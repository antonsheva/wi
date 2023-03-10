"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userService = require('../services/user-service');
var validationResult = require('express-validator').validationResult;
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.registration = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, login, password, email, resp, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, next(api_error_1.default.BadRequest('???????????? ??????????????????', errors.array()))];
                        }
                        _a = req.body, login = _a.login, password = _a.password, email = _a.email;
                        return [4 /*yield*/, userService.registration(login, password, email)];
                    case 1:
                        resp = _b.sent();
                        if (resp.error) {
                            res.status(200).json({ error: resp.error, message: resp.message, userData: resp.userData });
                        }
                        res.cookie('refreshToken', resp.userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                        res.status(200).json({ error: 0, userData: resp.userData });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, _a, login, password, userData, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        errors = validationResult(req);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, next(api_error_1.default.BadRequest('???????????? ??????????????????', errors.array()))];
                        }
                        _a = req.body, login = _a.login, password = _a.password;
                        return [4 /*yield*/, userService.login(login, password)];
                    case 1:
                        userData = _b.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                        res.status(200).json(userData);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        next(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.logout = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, token;
            return __generator(this, function (_a) {
                try {
                    refreshToken = req.cookies.refreshToken;
                    console.log("logout : refreshToken -> " + refreshToken);
                    token = userService.logout(refreshToken);
                    res.clearCookie('refreshToken');
                    return [2 /*return*/, res.status(200).json({ token: token })];
                }
                catch (e) {
                    next(e);
                }
                return [2 /*return*/];
            });
        });
    };
    UserController.prototype.activate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var activationLink, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('activate');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        activationLink = req.params.link;
                        return [4 /*yield*/, userService.activate(activationLink)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, res.redirect(process.env.CLIENT_URL)];
                    case 3:
                        e_3 = _a.sent();
                        next(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.refresh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, userData, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        refreshToken = req.cookies.refreshToken;
                        return [4 /*yield*/, userService.refresh(refreshToken)];
                    case 1:
                        userData = _a.sent();
                        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
                        res.status(200).json(userData);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        next(e_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var users, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userService.getAllUsers()];
                    case 1:
                        users = _a.sent();
                        console.log("--- getUsers ---");
                        res.status(200).json(users);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        next(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
module.exports = new UserController();
