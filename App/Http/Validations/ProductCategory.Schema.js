const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../Utills/Constants");

const createProductCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی محصولات اشتباه است")),
    parent: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است")),
    sub_category: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است"))
});

module.exports = {
    createProductCategorySchema
}