const Sequelize = require("sequelize").Sequelize;
const sequelize = require("../utils/database");

const Appointment = sequelize.define("appointment", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  doctorId: Sequelize.UUID,
  time: Sequelize.DATE,
  accept: Sequelize.BOOLEAN,
});
module.exports = Appointment;