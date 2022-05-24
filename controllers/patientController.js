const Models = require('../models')
const sendResponce = require('../utils/common')
const jwt = require("../utils/jwtOptions");

//login
async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password)
    res.send('email or password require')
  else {
    await Models.user
      .findOne({ where: { email } })
      .then(async (user) => {
        if (user) {
          if (password == user.password) {
            const token = await jwt.createToken({ id: user.id });
            sendResponce(req, res, token, "login succesfully");
          } else {
            sendResponce(req, res, null, "login credentials are wrong", 400);
          }
        } else {
          res.status(400).send(" email is not exists");
        }
      })
      .catch((err) => {
        console.trace("err-- login");
      });
  }
}

// registration
async function register(req, res) {
  const { email, password, name } = req.body
  if (!email)
    res.send("email required!")
  else if (!password)
    res.send("password required!")
  else if (!name)
    res.send("name required!")
  else {
    await Models.user
      .findOne({ where: { email } })
      .then((user) => {
        if (user) sendResponce(req, res, null, "email already exists", 400);
        else {
          Models.user
            .create({ email, password, name, type: "patient" })
            .then((user) => {
              sendResponce(req, res, user, "patient registration done");
            });
        }
      })
      .catch((err) => {
        console.trace("err-- registration");
      });
  }
}

// get all Product
async function getDoctors(req, res) {
  Models.user.findAll({ where: { type: "doctor" } })
    .then((doctors) => {
      sendResponce(req, res, doctors, "doctors list fetch succesfully");
    }).catch(err => {
      console.trace("error in - getDoctors->", error)
    })
}

async function createAppoiment(req, res) {
  const { doctor, time } = req.body
  if (!doctor) res.status(400).send(" doctor required!");
  else if (!time) res.status(400).send(" time required!");
  else {
    let doctorExists = await Models.user.exists({ where: { type: "doctor", id: doctor } })
    if (doctorExists) {
      await Models.appointment
        .create({ userId: req.user.id, doctorId: doctor, time })
        .then((appointment) => {
          sendResponce(req, res, appointment, "appointment created succesfully");
        })
    } else {
      sendResponce(req, res, null, "doctor not exists", 400);
    }
  }
}
async function updateAppointment(req, res) {
  const { appointmentId, time, doctor } = req.body
  if (!appointmentId) res.status(400).send(" appointmentId required!");
  else if (!doctor) res.status(400).send(" doctor required!");
  else if (!time) res.status(400).send(" time required!");
  else {
    let appoimentExists = await Models.appointment.exists({ where: { id: appointmentId, userId: req.user.id } })
    if (appoimentExists) {
      await Models.appointment
        .update({ accept, doctor, time }, { where: { id: appointmentId } })
        .then((appointment) => {
          sendResponce(req, res, appointment, "appointment updated succesfully");
        })
    } else {
      sendResponce(req, res, null, "appointment not exists", 400);
    }
  }
}
async function removeAppoiment(req, res) {
  const { appointmentId } = req.body
  if (!appointmentId) res.status(400).send(" appointmentId required!");
  else {
    let appoimentExists = await Models.appointment.exists({ where: { id: appointmentId, userId: req.user.id } })
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

async function getAllAppoiment(req, res) {
  await Models.appointment
    .findAll({ where: { customerId: req.user.id } })
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


module.exports = {
  login,
  register,
  getDoctors,
  createAppoiment,
  updateAppointment,
  removeAppoiment,
  getAllAppoiment,
}