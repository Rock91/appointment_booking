
const appointment = require("./appointment");
const patientType = require("./user-type");
const user = require("./user");

appointment.belongsTo(user, { constraints: true, onDelete: "CASCADE" })

module.exports = {
    appointment,
    patientType,
    user
}