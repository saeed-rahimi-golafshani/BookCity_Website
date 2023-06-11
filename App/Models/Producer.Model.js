const { default: mongoose, model } = require("mongoose");

const producerSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: string},
}, {
    timestamps: true
})

module.exports = {
    ProducerModel: mongoose.model("producer", producerSchema)
}