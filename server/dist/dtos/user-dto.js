module.exports = /** @class */ (function () {
    function UserDto(model) {
        this.id = model.id;
        this.login = model.login;
        this.isActivated = model.isActivated;
    }
    return UserDto;
}());
