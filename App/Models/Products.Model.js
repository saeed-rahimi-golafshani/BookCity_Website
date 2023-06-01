const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Public.Schema");
const { QuestionُSchema } = require("./Public.Schema");

// عنوان مشخصات
const Specs = new mongoose.Schema({
    title: {type: String, required: true},
    value: {type: String, required: true}
})

const PorductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    introduction: {type: String, required: true}, // معرفی محصول
    expert_Check: {type: String}, // بررسی تخصصی 
    specifications: {type: [Specs], required: true, default: []}, // مشخصات
    images: {type: [String], required: true, default: []},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    comments: {type: [CommentSchema], default: []},
    questions: {type: [QuestionُSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    main_price: {type: Number, default: 0},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    ProductModel: mongoose.model("product", PorductSchema)
}