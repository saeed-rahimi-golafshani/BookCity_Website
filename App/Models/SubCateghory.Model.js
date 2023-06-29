const { default: mongoose } = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category"},
    image: {type: String}
});

module.exports = {
    SubCategoryModel: mongoose.model("subcategory", SubCategorySchema)
}