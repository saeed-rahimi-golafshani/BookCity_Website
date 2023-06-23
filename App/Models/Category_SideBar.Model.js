const { default: mongoose } = require("mongoose");

const CategorySidebarSchema = new mongoose.Schema({
    title: {type: String, required: true},
    icon: {type: String, required: true},
    category_navbar: {type: mongoose.Types.ObjectId, required: true, ref: "categorynavbar"}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    CategorySidebarModel: mongoose.model("categorysidbar", CategorySidebarSchema)
}