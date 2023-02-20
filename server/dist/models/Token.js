"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sequelize = require("sequelize");
module.exports = function (seqelize) {
    var Token = seqelize.define('token', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        refresh_token: { type: Sequelize.STRING, defaultValue: " " },
        user_id: { type: Sequelize.INTEGER, defaultValue: 0 },
    });
    return Token;
};
