const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");
const School = require("./School");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.STRING, allowNull: false},
    role: { type: DataTypes.ENUM('superadmin', 'schooladmin'), defaultValue: 'schooladmin'}, 
}, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
});




module.exports = User;