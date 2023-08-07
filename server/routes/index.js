const express = require("express");
const authRoutes = require("./auth.route");
const orderRoutes = require("./order.route");
const contactController = require('../controllers/contact.controller');
const router = express.Router();

// localhost:4050/api/auth
router.use("/auth", authRoutes);

// http://localhost:4050/api/orders
router.use("/orders", orderRoutes);

router.post('/contact', contactController.sendContactUsEmail);

module.exports = router;
