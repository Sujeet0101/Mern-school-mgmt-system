const User = require("./superAdmin/User");
const School = require("./superAdmin/School");

// Associations
School.hasMany(User, { foreignKey: "school_id" });
User.belongsTo(School, { foreignKey: "school_id" });

module.exports = { User, School };
