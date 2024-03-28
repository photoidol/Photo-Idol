const crypto = require("crypto");
const PriceLimitConfigModel = require("../../models/order/PriceLimitConfigModel");
const PaymentModel = require("../../models/order/PaymentModel");
const { ESEWA_KEY } = require("../../utils/variables");
const UserModel = require("../../models/users/UserModel");
const failureRedirectUrl = "http://fotoidol.com/admin";

function generateUniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

exports.initiatePayment = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!req.user || !req.user.isVerified) {
      return res.status(401).json({
        message: "Unauthorized. Please log in and verify your account.",
      });
    }

    const paidAmount = await PriceLimitConfigModel.findOne();
    if (!paidAmount) {
      return res.status(404).json({ message: "Amount not found" });
    }

    const uniqueUuid = generateUniqueId();
    const transactionUuid = `${userId}-${uniqueUuid}`;

    const signature = this.createSignature(`total_amount=${paidAmount.priceLimit},transaction_uuid=${transactionUuid},product_code=NP-ES-FOTOIDOL`);

    const formData = {
      amount: paidAmount.priceLimit,
      failure_url: failureRedirectUrl,
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "NP-ES-FOTOIDOL",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "https://api.fotoidol.com/api/v1/payment/success/esewa",
      tax_amount: "0",
      total_amount: paidAmount.priceLimit,
      transaction_uuid: transactionUuid,
    };

    // Find or create the payment record for the user
    let paymentRecord = await PaymentModel.findOne({ userId });
    if (!paymentRecord) {
      paymentRecord = new PaymentModel({
        userId,
        amount: paidAmount.priceLimit,
        transactionUuid,
      });

      await paymentRecord.save();
    } else {
      paymentRecord.amount = paidAmount.priceLimit;
      paymentRecord.transactionUuid = transactionUuid;
      await paymentRecord.save();
    }
    res.json({ message: "Payment Successfully", paidAmount, formData });
    //console.log("Payment Successfully");
  } catch (err) {
    // console.error(err);
    return res.status(400).json({ message: err?.message || "No Payment Available" });
  }
};

exports.handleEsewaSuccess = async (req, res, next) => {
  try {
    const { data } = req.query;
    const decodedData = JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
    // console.log(decodedData);

    if (decodedData.status !== "COMPLETE") {
      return res.status(400).json({ messgae: "errror" });
    }
    const message = decodedData.signed_field_names
      .split(",")
      .map((field) => `${field}=${decodedData[field] || ""}`)
      .join(",");
    //console.log(message);
    const signature = this.createSignature(message);

    if (signature !== decodedData.signature) {
      res.json({ message: "integrity error" });
    }

    req.transaction_uuid = decodedData.transaction_uuid;
    req.transaction_code = decodedData.transaction_code;

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err?.message || "No Orders found" });
  }
};

exports.updatePaymentInfo = async (req, res) => {
  try {
    const payment = await PaymentModel.findOne({
      transactionUuid: req.transaction_uuid,
    });
    if (!payment) {
      res.status(404);
      throw new Error("Payment record not found");
    }

    payment.status = "success";
    await payment.save();

    const userId = payment.userId;
    await UserModel.findByIdAndUpdate(userId, { paid: true });

    res.redirect("http://fotoidol.com/admin");

    //console.log("Payment info updated successfully");
  } catch (err) {
    //console.error("Error updating payment info:", err);
    res.status(500);
    throw new Error("Error updating payment info");
  }
};

exports.createSignature = (message) => {
  const secret = ESEWA_KEY;
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  const hashInBase64 = hmac.digest("base64");
  return hashInBase64;
};
