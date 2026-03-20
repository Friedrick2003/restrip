const express = require("express");
const { body } = require("express-validator");
const ctrl     = require("../controllers/hotelController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const router = express.Router();

const hotelRules = [
  body("name").trim().notEmpty().withMessage("Hotel name required"),
  body("city").trim().notEmpty().withMessage("City required"),
  body("country").trim().notEmpty().withMessage("Country required"),
  body("address").trim().notEmpty().withMessage("Address required"),
  body("description").trim().notEmpty().withMessage("Description required"),
  body("cheapestPrice").isNumeric().withMessage("Price must be a number"),
];

// Public
router.get("/",    ctrl.getAllHotels);
router.get("/:id", ctrl.getHotelById);

// Admin only
router.post(  "/",    verifyToken, verifyAdmin, hotelRules, ctrl.createHotel);
router.put(   "/:id", verifyToken, verifyAdmin,             ctrl.updateHotel);
router.delete("/:id", verifyToken, verifyAdmin,             ctrl.deleteHotel);

module.exports = router;
