"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(status, message, errors) {
        if (errors === void 0) { errors = []; }
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.errors = errors;
        return _this;
    }
    ApiError.UnauthorisedError = function () {
        return new ApiError(401, 'Пользователь не авторизовани');
    };
    ApiError.BadRequest = function (message, errors) {
        if (errors === void 0) { errors = []; }
        return new ApiError(400, message, errors);
    };
    return ApiError;
}(Error));
exports["default"] = ApiError;
