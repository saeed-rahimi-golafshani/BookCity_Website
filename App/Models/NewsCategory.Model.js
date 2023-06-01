const { default: mongoose } = require("mongoose");

const NewsCategorySchema = new mongoose.Schema({
    title: {type: String, require: true}
}, {
    timestamps: true
});

module.exports = {
    NewsCategoryModel: mongoose.model("newscategory", NewsCategorySchema)
}