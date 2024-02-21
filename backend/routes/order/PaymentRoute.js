const express = require("express");
const {
  initiatePayment,
  handleEsewaSuccess,
  updatePaymentInfo,
} = require("../../controllers/order/PaymentController");
const { protect, verified } = require("../../middleware/authMiddleware");
const app = express();

app.post("/initiate-payment", protect, verified, initiatePayment);
app.get("/success/esewa", handleEsewaSuccess, updatePaymentInfo);

module.exports = app;
