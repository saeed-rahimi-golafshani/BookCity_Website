const { default: mongoose } = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    images: {type: [String], required: true, default: []},
    tags: {type: [String], default: []},
    sub_category: {type: [mongoose.Types.ObjectId], ref: "subcategory", required: true},
    news_category: {type: [mongoose.Types.ObjectId], ref: "newscategory", required: true},
    source: {type: [String], default: []},
    time: {type: [CommentSchema], default: []}, // زمان حدودی مطالعه
}, {
    timestamps: true
});

module.exports = {
    NewsModel: mongoose.model("news", NewsSchema)
}
