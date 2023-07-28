const Controller = require("../Controller");

class PaymentController extends Controller{
    async paymentGateway(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
};

module.exports = {
    PaymentController: new PaymentController()
}