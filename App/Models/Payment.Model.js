const { default: mongoose } = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    invoiceNumber: {type: String},
    authority: {type: String},
    paymentDate: {type: Number},
    amount: {type: Number},
    description: {type: String, default: "بابت خرید محصول"},
    verify: {type: Boolean, default: false},
    user: {type: mongoose.Types.ObjectId, ref: "user"},
    basket: {type: Object, default: {}},
    refID: {type: String, default: undefined},
    cardHash: {type: String},
    
}, {
    timestamps: true
});

module.exports = {
    PaymentModel: mongoose.model("payment", PaymentSchema)
}