const { default: mongoose } = require("mongoose");

const productCategoryAttributeSchema = new mongoose.Schema({
    product: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    category_attribute: {type: mongoose.Types.ObjectId, ref: "category_attribute", required: true},
    value: {type: String, required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    productCategoryAttributeModel: mongoose.model("product_category_attribute", productCategoryAttributeSchema)
}