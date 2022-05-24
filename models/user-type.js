const Sequelize = require("sequelize").Sequelize;
const sequelize = require("../utils/database");

const userType = sequelize.define("userType", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  }
});
module.exports = userType;