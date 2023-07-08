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

CategoryNavbarSchema.virtual("iconUrl").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.icon}`
});

module.exports = {
    CategoryNavbarModel: mongoose.model("categorynavbar", CategoryNavbarSchema)
}

