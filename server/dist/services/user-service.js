"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var dbModels = require('../models');
var bcrypt = require('bcrypt');
var uuid = require('uuid');
var mailService = require('./mail-service');
var tokenService = require('./token-service');
var UserDto = require('../dtos/user-dto');
var api_error_1 = __importDefault(require("../exceptions/api-error"));
var UserModel = dbModels.user;
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.registration = function (login, password, email) {
        return __awaiter(this, void 0, void 0, function () {
            var candidate, hashPassword, activatedLink, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ where: { login: login } })];
                    case 1:
                        candidate = _a.sent();
                        if (candidate !== null) {
                            throw api_error_1["default"].BadRequest("\u041B\u043E\u0433\u0438\u043D ".concat(login, " \u0437\u0430\u043D\u044F\u0442"));
                        }
                        hashPassword = bcrypt.hashSync(password, 7);
                        activatedLink = uuid.v4();
                        return [4 /*yield*/, UserModel.create({ login: login, password: hashPassword, activated_link: activatedLink })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, mailService.sendActivationMail(email, "".concat(process.env.API_URL, "/api/activate/").concat(activatedLink))];
                    case 3:
                        _a.sent();
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.activate = function (activationLink) {
        return __awaiter(this, void 0, void 0, function () {
            var userModel, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ where: { activated_link: activationLink } })];
                    case 1:
                        userModel = _a.sent();
                        if (userModel === null) {
                            console.log('Пользователь не найден');
                            throw api_error_1["default"].BadRequest("\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D");
                        }
                        user = userModel.dataValues;
                        console.log('activate -> start');
                        console.log(user);
                        console.log('userId -> ' + user.id);
                        return [4 /*yield*/, UserModel.update({ is_activated: true }, {
                                where: { id: user.id },
                                returning: true,
                                plain: true
                            })
                                .then(function (result) {
                                console.log('activate -> ok');
                                return true;
                            })["catch"](function (err) {
                                console.log('activate -> error');
                                throw api_error_1["default"].BadRequest("\u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u043A\u0442\u0438\u0432\u0430\u0446\u0438\u0438");
                            })];
                    case 2:
                        _a.sent();
                        console.log('activate -> end');
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.login = function (login, password) {
        return __awaiter(this, void 0, void 0, function () {
            var userModel, user, isEqualsPass, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findOne({ where: { login: login } })];
                    case 1:
                        userModel = _a.sent();
                        if (userModel === null) {
                            throw api_error_1["default"].BadRequest('Неверный логин или пароль');
                        }
                        user = userModel.dataValues;
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isEqualsPass = _a.sent();
                        if (!isEqualsPass) {
                            throw api_error_1["default"].BadRequest('Неверный логин или пароль!');
                        }
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.logout = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("token -> " + refreshToken);
                        if (refreshToken === undefined) {
                            throw api_error_1["default"].BadRequest('Что-то пошло не так');
                        }
                        return [4 /*yield*/, tokenService.removeToken(refreshToken)];
                    case 1:
                        token = _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    UserService.prototype.refresh = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, tokenFromDb, user, userDto, tokens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!refreshToken) {
                            throw api_error_1["default"].UnauthorisedError();
                        }
                        userData = tokenService.validateRefreshToken(refreshToken);
                        tokenFromDb = tokenService.findToken(refreshToken);
                        if (!userData || !tokenFromDb) {
                            throw api_error_1["default"].UnauthorisedError();
                        }
                        return [4 /*yield*/, UserModel.findOne({ where: { id: userData.id } })];
                    case 1:
                        user = _a.sent();
                        userDto = new UserDto(user);
                        tokens = tokenService.generateTokens(__assign({}, userDto));
                        return [4 /*yield*/, tokenService.saveToken(userDto.id, tokens.refreshToken)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, __assign(__assign({}, tokens), { user: userDto })];
                }
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, UserModel.findAll()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return UserService;
}());
module.exports = new UserService();
