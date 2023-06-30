const { default: mongoose } = require("mongoose");

const NewsCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    category_navbar: {type: mongoose.Types.ObjectId, ref: "categorynavbar", required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    NewsCategoryModel: mongoose.model("newscategory", NewsCategorySchema)
}