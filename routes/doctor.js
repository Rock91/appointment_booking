const express = require("express");
const Controller = require('../controllers');
const middleware = require('../utils/middleware')
const router = express.Router();

router.post("/register", Controller.doctorController.register);
router.post("/login", Controller.doctorController.login);
router.post("/remove-appointment", middleware, Controller.doctorController.removeAppoiment);
router.get("/get-appointment", middleware, Controller.doctorController.getAllAppoiment);
router.get("/update-appointment", middleware, Controller.doctorController.updateAppointment);


module.exports = router;


