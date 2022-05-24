const Sequelize = require("sequelize").Sequelize;
const sequelize = require('../utils/database')

const User = sequelize.define("User", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  type: Sequelize.STRING,
});

module.exports = User
