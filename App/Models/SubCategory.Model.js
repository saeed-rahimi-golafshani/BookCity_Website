const { default: mongoose } = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref: "subcategory", default: undefined}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    SubCategoryModel: mongoose.model("subcategory", SubCategorySchema)
}