const { default: mongoose } = require("mongoose");

const categoryAttributeSchema = new mongoose.Schema({
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    label: {type: String, required: true}
 }, {
   timestamps: true,
   toJSON: {
      virtuals: true
   }
});

module.exports = {
   CategoryAttributeModel: mongoose.model("category_attribute", categoryAttributeSchema)
 }