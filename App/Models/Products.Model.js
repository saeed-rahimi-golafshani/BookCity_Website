const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Comment.Schema");
const { QuestionُSchema } = require("./Comment.Schema");

// عنوان مشخصات
const Specs = new mongoose.Schema({
    title: {type: String, required: true},
    value: {type: String, required: true}
});

const PorductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    introduction: {type: String, required: true}, // معرفی محصول
    expert_Check: {type: String}, // بررسی تخصصی 
    specifications: {type: [Specs], required: true, default: []}, // مشخصات
    images: {type: [String], required: true, default: []},
    image_refrence: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    main_price: {type: Number, default: 0},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    description: {type: String},
    seller: {type: [Seller], default: []}, // فروشنده
    producer:{type: mongoose.Types.ObjectId, ref: "producer", default: ""}, // تولید کننده
    comments: {type: [CommentSchema], default: []},
    questions: {type: [QuestionُSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    ProductModel: mongoose.model("product", PorductSchema)
}