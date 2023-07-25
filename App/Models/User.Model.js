const { default: mongoose } = require("mongoose");

const UserAddress = new mongoose.Schema({
    state: {type: String, required: true},
    city: {type: String, required: true},
    addrees: {type: String, required: true},
    postal_code: {type: String, required: true}
});
const ProductSchema = new mongoose.Schema({
    productId: {type: mongoose.Types.ObjectId, ref: "product"},
    count: {type: Number, default: 1} // اگر یک محصولی تکراری بود آی دی ذخیره نشود
});
const BasketSchema = new mongoose.Schema({
    products: {type: [ProductSchema], default: []}
});
const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    emaile: {type: String, lowercase: true},
    mobile: {type: String, required: true},
    phone: {type: String},
    password: {type: String},
    otp: {type: Object, default: {code: 0, expiresIn: 0}},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    address: {type: UserAddress},
    roles: {type: String, default: "USER"},
    Product: {type: [mongoose.Types.ObjectId], default: [], ref: "product"},
    basket: {type: BasketSchema} 
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    UserModel: mongoose.model("user", UserSchema)
}