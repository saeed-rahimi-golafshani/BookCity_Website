const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Public.Schema");

const BlogSchema = new mongoose.Schema({
    author : {type: mongoose.Types.ObjectId, ref: "user", required: true},
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true, default: []},
    tags: {type: [String], default: []},
    category: {type: [mongoose.Types.ObjectId], ref: "category", required: true},
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

module.exports = {
    BlogModel: mongoose.model("blog", BlogSchema)
}