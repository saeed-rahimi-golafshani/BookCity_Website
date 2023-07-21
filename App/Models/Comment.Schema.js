const { default: mongoose } = require("mongoose");


const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
    title: {type: String, required: true},
    negative_points: {type: [String], default: []}, // نکات منفی
    positive_points: {type: [String], default: []}, // نکات مثبت
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    score: {type: String}
}, {
    timestamps: {createdAt: true}
});


module.exports = {
    CommentSchema
}