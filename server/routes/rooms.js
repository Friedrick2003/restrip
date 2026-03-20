const express = require("express");
const { body } = require("express-validator");
const ctrl     = require("../controllers/roomController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

const roomRules = [
  body("hotelId").notEmpty().withMessage("hotelId required"),
  body("title").trim().notEmpty().withMessage("Room title required"),
  body("price").isNumeric().isFloat({ min: 1 }).withMessage("Valid price required"),
  body("maxPeople").isInt({ min: 1 }).withMessage("maxPeople must be a positive integer"),
];

// Public
router.get("/",                   ctrl.getRoomsByHotel);
router.get("/:id",                ctrl.getRoomById);
router.get("/:id/availability",   ctrl.checkAvailability);

// Admin only
router.post(  "/",    verifyToken, verifyAdmin, roomRules, ctrl.createRoom);
router.put(   "/:id", verifyToken, verifyAdmin,            ctrl.updateRoom);
router.delete("/:id", verifyToken, verifyAdmin,            ctrl.deleteRoom);

module.exports = router;
