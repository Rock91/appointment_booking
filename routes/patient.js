const express = require("express");
const Controller = require('../controllers');
const middleware = require('../utils/middleware')
const router = express.Router();

router.post("/register", Controller.patientController.register);
router.post("/login", Controller.patientController.login);
router.get("/getDoctors", middleware, Controller.patientController.getDoctors);
router.post("/add-appointment", middleware, Controller.patientController.createAppoiment);
router.post("/remove-appointment", middleware, Controller.patientController.removeAppoiment);
router.get("/get-appointment", middleware, Controller.patientController.getAllAppoiment);
router.post("/update-appointment", middleware, Controller.patientController.updateAppointment);

module.exports = router;


