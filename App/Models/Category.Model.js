const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref: "category", default: undefined},
    sub_category: {type: mongoose.Types.ObjectId, ref: "subcategory", required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    CategoryModel: mongoose.model("category", CategorySchema)
};
