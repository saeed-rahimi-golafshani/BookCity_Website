const { default: mongoose } = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category"},
    image: {type: String}
}, {
    toJSON: {
        virtuals: true
    }
});
SubCategorySchema.virtual("imageUrl").get(function() {
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.image}`
});

module.exports = {
    SubCategoryModel: mongoose.model("subcategory", SubCategorySchema)
}