const { PaymentController } = require("../../Http/Controller/Api/Payment.Controller");
const { verifyAccessToken } = require("../../Http/Middleware/verifyAccessToken");

const router = require("express").Router();

router.post("/payment", verifyAccessToken, PaymentController.paymentGateway);
router.post("/verify");

module.exports = {
    PaymentApiRoutes: router 
}