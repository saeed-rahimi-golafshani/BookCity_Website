const { default: mongoose } = require("mongoose");

const CategoryNavbarSchema = new mongoose.Schema({
    title: {type: String, required: true},
    icon: {type: String, required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    CategoryNavbarModel: mongoose.model("categorynavbar", CategoryNavbarSchema)
}

