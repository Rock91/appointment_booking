const express = require('express')
const Controller = require('../controllers');
const middleware = require("../utils/middleware");
const router = express.Router();

router.get('/get-patients', Controller.adminController.getPatient);
router.get('/get-doctors', middleware, Controller.adminController.getDoctors)
router.get("/get-appointment", middleware, Controller.adminController.getAllAppoiment);
router.post("/edit-patients", Controller.adminController.updateUsers);
router.post("/edit-doctors", Controller.adminController.updateDoctor);
router.post("/create-appointment", Controller.adminController.createAppoiment);
router.post("/edit-appointment", Controller.adminController.updateAppointment);
router.get("/delete-appointment", Controller.adminController.removeAppoiment);

module.exports = router