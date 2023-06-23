const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Comment.Schema");
const { QuestionُSchema } = require("./Comment.Schema");

const PorductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    en_title: {type: String},
    introduction: {type: String, required: true}, // معرفی محصول
    expert_Check: {type: String, default: ""}, // بررسی تخصصی 
    images: {type: [String], required: true, default: []},
    image_refrence: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    main_price: {type: Number, default: 0},
    price: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    count: {type: Number},
    description: {type: String},
    seller: {type: String, default: []}, // فروشنده
    producer:{type: mongoose.Types.ObjectId, ref: "producer", default: ""}, // تولید کننده
    active: {type: String},
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
PorductSchema.index({title: "text"});
PorductSchema.virtual("attribute", {
    ref: "product_category_attribute",
    localField: "_id",
    foreignField: "product"
}, {
        ref: "product_category_attribute",
        localField: "_id",
        foreignField: "category_attribute"
});

function autoPopulate(next){
    this.populate([{path: "attribute", select: {__v: 0, id: 0, updatedAt: 0, createdAt: 0}}
]);
    next()
}
PorductSchema.pre("findOne", autoPopulate).pre("find", autoPopulate)
module.exports = {
    ProductModel: mongoose.model("product", PorductSchema)
}