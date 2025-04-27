const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payments");
const { memberShipAmount } = require("../utils/constants");
const {validateWebhookSignature} = require('razorpay/dist/utils/razorpay-utils');
const User = require("../models/user");
// const payments = require("../models/payments");

paymentRouter.post("/payment/create", userAuth, async(req, res) => {
    try{

        const { memberShipType } = req.body;
        const { firstName, lastName, emailId } = req.user;

        const order = await razorpayInstance.orders.create({
            "amount": memberShipAmount[memberShipType] * 100,
            "currency": "INR",
            "receipt": "receipt#1",
            "partial_payment": false,
            "notes": {
              firstName,
              lastName,
              emailId,
              "membershipType " : memberShipType,
            },
          });

          // save it to my DB
          // console.log(order);
          const payment = new Payment({
            userId : req.user._id,
            orderId : order.id,
            status : order.status,
            amount : order.amount,
            currency : order.currency,
            receipt : order.receipt,
            notes : order.notes,
          });

          const savePayment = await payment.save();


          // Return back my order details to frontend
          res.json({ ...savePayment.toJSON(), keyId : process.env.RAZORPAY_KEY_ID });



    } catch(err){
        return res.status(500).json({msg : err.message});
    }
})

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebHookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!isWebHookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    // If my webhook is valid then update my payment status in DB
    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    // updated the user in DB
    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.memberShipType = payment.notes.membershipType;
    await user.save();
    /*
       Update the user as premium 

      if(req.body.event == "payment.captured"){

      }

      if(req.body.event == "payment.failed"){

      }
      */

    // return success response to razorpay
    return res.status(200).json({ msg: "webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  // console.log(user);
  if (user.isPremium) {
    // console.log(user.isPremium);
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentRouter;