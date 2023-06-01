const { default: mongoose } = require("mongoose");

const UserAddress = new mongoose.Schema({
    country: {type: String, required: true},
    state: {type: String, required: true},
    city: {type: String, required: true},
    addrees: {type: String, required: true},
    postal_code: {type: String, required: true}
})
const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    emaile: {type: String, lowercase: true},
    mobile: {type: String, required: true},
    phone: {type: String},
    password: {type: String},otp: {type: Object, default: {code: 0, expiresIn: 0}},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    address: {type: UserAddress},
    roles: {type: String, default: "USER"},
    Product: {type: [mongoose.Types.ObjectId], default: [], ref: "product"},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    UserModel: mongoose.model("user", UserSchema)
}