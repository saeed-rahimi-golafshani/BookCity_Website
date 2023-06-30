const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Comment.Schema");

const NewsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image_refrence: {type: String, required: true},
    images: {type: [String], required: true, default: []},
    tags: {type: [String], default: []},
    newscategory: {type: [mongoose.Types.ObjectId], ref: "newscategory", required: true},
    source: {type: [String], default: []},
    time_range: {type: String, required: true, default: "0:0:0"},
    comment: {type: [CommentSchema], default: []},
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
NewsSchema.index({title: "text"});

module.exports = {
    NewsModel: mongoose.model("news", NewsSchema)
}
