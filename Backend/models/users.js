const { DataTypes } = require("sequelize");
const db = require("../config/db");

const user = db.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT
}, {
    freezeTableName: true
})

module.exports = user