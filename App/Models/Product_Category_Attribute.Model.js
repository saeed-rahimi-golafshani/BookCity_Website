const { default: mongoose } = require("mongoose");

const productCategoryAttributeSchema = new mongoose.Schema({
    category_attribute: {type: mongoose.Types.ObjectId, ref: "category_attribute", required: true},
    product: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    value: {trype: String, required: true}
}, {
    timestamps: true,
    toJSON: {virtuals: true}
});

module.exports = {
    productCategoryAttributeModel: mongoose.model("product_category_attribute", productCategoryAttributeSchema);
}