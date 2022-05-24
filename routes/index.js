const express = require("express");
const patient = require("./patient");
const doctor = require("./doctor");
const admin = require("./admin");

const router = express.Router();

router.use('/admin', admin)
router.use("/patient", patient);
router.use("/doctor", doctor);

module.exports = router;