const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../Utills/Constants")

const createSubCategorySchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان زیر مجموعه اشتباه است")),
    parent: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است"))
});

module.exports = {
    createSubCategorySchema
}