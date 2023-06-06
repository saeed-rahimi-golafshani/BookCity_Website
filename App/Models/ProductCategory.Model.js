const { default: mongoose } = require("mongoose");

const ProductCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref: "productcategory", default: undefined},
    sub_category: {type: mongoose.Types.ObjectId, ref: "subcategory", required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    ProductCategoryModel: mongoose.model("productcategory", ProductCategorySchema)
};
