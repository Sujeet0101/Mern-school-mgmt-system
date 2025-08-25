const {DataTypes} = require('sequelize');
const sequelize = require('../../config/db');
const User = require('./User');

const School = sequelize.define('School', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false},
    schema_name: { type: DataTypes.STRING, allowNull: false, unique: true},    
}, {
    tableName: "schools",
    underscored: true,
    timestamps: true,
});

module.exports = School;