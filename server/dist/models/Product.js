"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
module.exports = function (seqelize) {
    var Product = seqelize.define('product', {
        id: {
            type: sequelize_1.default.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        qr: { type: sequelize_1.default.STRING, allowNull: true },
        title: { type: sequelize_1.default.STRING, allowNull: true },
        description: { type: sequelize_1.default.STRING, defaultValue: " ", allowNull: true },
        user_id: { type: sequelize_1.default.INTEGER, defaultValue: 0, allowNull: true },
        vote_qt: { type: sequelize_1.default.INTEGER, defaultValue: 0, allowNull: true },
        rating: { type: sequelize_1.default.INTEGER, defaultValue: 0, allowNull: true },
    });
    return Product;
};
