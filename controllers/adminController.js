const Models = require("../models");
const sendResponce = require("../utils/common");

async function getAllAppoiment(req, res) {
  await Models.appointment
    .findAll()
    .then((appointment) => {
      console.log(appointment);
      if (appointment)
        return appointment.getDoctors();
      else {
        sendResponce(req, res, [], "Appoiment List is empty");
      }
    })
    .then((products) => {
      sendResponce(req, res, products, "get Appoiment List  succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
}
async function getDoctors(req, res) {
  Models.user.findAll({ where: { type: "doctor" } })
    .then((doctors) => {
      sendResponce(req, res, doctors, "doctors list fetch succesfully");
    }).catch(err => {
      console.trace("error in - getDoctors->", error)
    })
}
async function getPatient(req, res) {
  Models.user.findAll({ where: { type: "patient" } })
    .then((patient) => {
      sendResponce(req, res, patient, "patient list fetch succesfully");
    }).catch(err => {
      console.trace("error in - getpatient->", error)
    })
}
async function createAppoiment(req, res) {
  const { doctor, time, userId } = req.body
  if (!doctor) res.status(400).send(" doctor required!");
  else if (!time) res.status(400).send(" time required!");
  else if (!userId) res.status(400).send(" userId required!");
  else {
    let doctorExists = await doctor.exists({ where: { type: "doctor", doctor: doctor, userId: userId } })
    if (doctorExists) {
      await Models.appointment
        .create({ userId: userId, doctorId: doctor, time })
        .then((appointment) => {
          sendResponce(req, res, appointment, "appointment created succesfully");
        })
    } else {
      sendResponce(req, res, null, "doctor not exists", 400);
    }
  }
}
async function removeAppoiment(req, res) {
  const { appointmentId } = req.body
  if (!appointmentId) res.status(400).send(" appointmentId required!");
  else {
    let appoimentExists = await Models.appointment.exists({ where: { id: appointmentId } })
    if (appoimentExists) {
      await Models.appointment
        .destroy({ id: appointmentId })
        .then((appointment) => {
          sendResponce(req, res, appointment, "appointment removed succesfully");
        })
    } else {
      sendResponce(req, res, null, "appointment not exists", 400);
    }
  }
}
async function updateAppointment(req, res) {
  const { appointmentId, time, doctor, accept, userId } = req.body
  if (!doctor) res.status(400).send(" doctor required!");
  else if (!time) res.status(400).send(" time required!");
  else if (!userId) res.status(400).send(" userId required!");
  else {
    let appoimentExists = await Models.appointment.exists({ where: { id: appointmentId } })
    if (appoimentExists) {
      await Models.appointment
        .update({ accept, doctor, patient, time }, { where: { id: appointmentId } })
        .then((appointment) => {
          sendResponce(req, res, appointment, "appointment updated succesfully");
        })
    } else {
      sendResponce(req, res, null, "appointment not exists", 400);
    }
  }
}

async function updateDoctor(req, res) {
  const { id, email, type, name } = req.body
  if (!id) res.status(400).send(" id required!");
  else if (!email) res.status(400).send(" email required!");
  else if (!type) res.status(400).send(" type required!");
  else if (!name) res.status(400).send(" name required!");
  else {
    let doctorExists = await Models.user.exists({ where: { id: id, type: "doctor" } })
    if (doctorExists) {
      await Models.user
        .update({ email, type, name }, { where: { id: id } })
        .then((doctor) => {
          sendResponce(req, res, doctor, "doctor profile updated succesfully");
        })
    } else {
      sendResponce(req, res, null, "doctor profile not exists", 400);
    }
  }
}

async function updateUsers(req, res) {
  const { id, email, type, name } = req.body
  if (!id) res.status(400).send(" id required!");
  else if (!email) res.status(400).send(" email required!");
  else if (!type) res.status(400).send(" type required!");
  else if (!name) res.status(400).send(" name required!");
  else {
    let patientExists = await Models.user.exists({ where: { id: id, type: "patient" } })
    if (patientExists) {
      await Models.user
        .update({ email, type, name }, { where: { id: id } })
        .then((user) => {
          sendResponce(req, res, user, "patient profile updated succesfully");
        })
    } else {
      sendResponce(req, res, null, "patient profile not exists", 400);
    }
  }
}

module.exports = {
  getAllAppoiment,
  getDoctors,
  getPatient,
  createAppoiment,
  removeAppoiment,
  updateAppointment,
  updateUsers,
  updateDoctor
};