const joi = require("joi");
const { MONGOID_PATTERN } = require("../../Utills/Constants");
const createHttpError = require("http-errors");

const createCategoryAttributeSchema = joi.object({
    category: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی محصول اشتباه است")),
    label: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است"))
});

module.exports = {
    createCategoryAttributeSchema
}