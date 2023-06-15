const joi = require("joi");
const { MONGOID_PATTERN } = require("../../Utills/Constants");
const createHttpError = require("http-errors");

const createProductCatAttributeSchema = joi.object({
    category_attribute: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار مشخصات دسته بندی اشتباه است")),
    product: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار شناسه محصول اشتباه است")),
    value: joi.string().error(createHttpError.BadRequest("مقدار مشخصات محصول اشتباه است"))
});

module.exports = {
    createProductCatAttributeSchema
}