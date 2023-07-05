const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Comment.Schema");
const { string } = require("joi");

const BlogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image_refrence: {type: String, required: true},
    images: {type: [String], required: true, default: []},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], ref: "categorynavbar", required: true},
    source: {type: [String], default: []},
    comments: {type: [CommentSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    view: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
BlogSchema.index({title: "text"});

BlogSchema.virtual("imageURL").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.images}`
});
BlogSchema.virtual("imagerefrenceurl").get(function(){
    return `${process.env.BASEURL}:${process.env.APPLICATION_PORT}/${this.image_refrence}`
});

module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
}