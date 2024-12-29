const express = require("express");
const router = express.Router();
const { buyProduct } = require("../Controller/paymentController");

// Define the POST route
router.post("/checkout", buyProduct);

module.exports = router;
