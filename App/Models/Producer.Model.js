const { default: mongoose, model } = require("mongoose");

const producerSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
}, {
    timestamps: true
})
producerSchema.index({title: "text"})
module.exports = {
    ProducerModel: mongoose.model("producer", producerSchema)
}