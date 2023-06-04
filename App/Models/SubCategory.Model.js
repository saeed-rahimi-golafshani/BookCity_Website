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
SubCategorySchema.virtual("children", {
    ref: "subcategory",
    localField: "_id",
    foreignField: "parent"
});
function autoPopulate(next){
    this.populate([{path: "children", select: {__v: 0, id: 0}}]);
    next()
}
SubCategorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate)

module.exports = {
    SubCategoryModel: mongoose.model("subcategory", SubCategorySchema)
}