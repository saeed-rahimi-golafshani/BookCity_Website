const createHttpError = require("http-errors");
const Controller = require("../Controller");
const { default: axios } = require("axios");
const { getBasketOfUser } = require("../../../GraphQl/Utills");
const { PaymentModel } = require("../../../Models/Payment.Model");
const { invoiceNumberGenerator } = require("../../../Utills/Function");
const moment = require("moment-jalali");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { StatusCodes: httpStatus } = require("http-status-codes");
const { UserModel } = require("../../../Models/User.Model");
class PaymentController extends Controller{
    async paymentGateway(req, res, next){
        try {
            const user = req.user;
            if(user.basket.products.length == 0) throw new createHttpError.BadRequest("سبد خرید خالی میباشد");
            const basket = (await getBasketOfUser(user._id))?.[0];
            if(!basket?.payDetail?.paymentAmount) throw new createHttpError.BadRequest("مشخصات پرداخت یافت نشد");
            const zarinpal_request_url = process.env.ZARINPAL_REQUEST_URL;
            const zarinpalGatewayUrl = process.env.GATEWAYURL;
            const amount = basket?.payDetail?.paymentAmount;
            const description = "برای خرید محصولات"; 
            const zarinpal_options = {
                merchant_id: process.env.ZARINPAL_MERCHANTID,
                amount: basket?.payDetail?.paymentAmount,
                description: "برای خرید محصولات",
                metadata: {
                    email: user?.email || "example@domain.com",
                    mobile: user?.mobile
                },
                callback_url: process.env.CALLBACK_URL
            }
            const requestResault = await axios.post(zarinpal_request_url, zarinpal_options).then(resaul => resaul.data);
            const { authority, code } = requestResault.data;
            await PaymentModel.create({
                invoiceNumber: invoiceNumberGenerator(),
                paymentDate: moment().format("jYYYYjMMjDDHHmmss"),
                amount,
                description,
                user: user._id,
                authority,
                verify: false,
                basket
            })
            if(code == 100 && authority){
                return res.status(httpStatus.OK).json({
                    statusCode: httpStatus.OK,
                    data: {
                        code,
                        getwayUrl: `${zarinpalGatewayUrl}/${authority}`
                    }
                });
            }
            throw new createHttpError.BadRequest("پارامتر های ارسال شده صحیح نمیباشد");
        } catch (error) {
            next(error)
        }
    };
    async verifyPayment(req, res, next){
        try {
            const {Authority: authority} = req.query;
            const verifyUrl= process.env.VERIFYURL;
            const payment = await PaymentModel.find({authority});
            if(!payment) throw new createHttpError.NotFound("تراکنش در انتظار پرداخت یافت نشد");
            if(payment.verify) throw new createHttpError.BadRequest("تراکنش مورد نظر از قبل پرداخت شد");
            const verifyBody = JSON.stringify({
                authority,
                amount: payment.amount,
                merchant_id: process.env.ZARINPAL_MERCHANTID
            });
            const verifyResault = await fetch(verifyUrl, {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: verifyBody
            }).then(resault => resault.json());
            if(verifyResault.data.code == 100){
                await PaymentModel.updateOne({authority}, {
                    $set: {
                        refID: verifyResault.data.ref_id,
                        cardHash: verifyResault.data.card_hash,
                        verify: true
                    }
                });
                const user = await UserModel.findById(payment.user)
                await UserModel.updateOne({_id: payment.user}, {
                    $set: {
                        Product: [...payment?.basket?.payDetail?.productIds || [], ...user.Product],
                        basket: {
                            products: []
                        }
                    }
                });
                return res.status(httpStatus.OK).json({
                    statusCode: httpStatus.OK,
                    data: {
                        message: "پرداخت شما با موفقیت انجام شد"
                    }
                });
            }
            throw createHttpError.BadRequest("پرداخت انجام نشد، در صورت کسر وجه از حساب شما طی 72 ساعت وجه به حساب شما باز میگردد")
        } catch (error) {
            next(error)
        }
    }
};

module.exports = {
    PaymentController: new PaymentController()
}