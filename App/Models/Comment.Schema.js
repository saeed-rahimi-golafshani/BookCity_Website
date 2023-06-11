const { default: mongoose } = require("mongoose");

const AnswerSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    opentocomment: {type: Boolean, default: false}
}, {
    timestamps: {createdAt: true}
});
const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
    title: {type: String, required: true},
    negative_points: {type: [String], default: []}, // نکات منفی
    positive_points: {type: [String], default: []}, // نکات مثبت
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    openToComment: {type: Boolean, default: true},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    score: {type: String}
}, {
    timestamps: {createdAt: true}
});
const QuestionُSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
    title: {type: String, required: true},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    openToComment: {type: Boolean, default: true},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    answers: {type: [AnswerSchema], default: []}
});

module.exports = {
    CommentSchema,
    QuestionُSchema
}