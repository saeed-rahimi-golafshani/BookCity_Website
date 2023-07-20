const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../Utills/Constants");

const createRoleSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان نقش کاربری اشتباه است")),
    permissions: joi.array().items(joi.string().pattern(MONGOID_PATTERN)).error(createHttpError.BadRequest("سطوح دسترسی برای نقش صحیح نمیباشد")),
    description: joi.string().error(createHttpError.BadRequest("ساختار توضیحات اشتباه است"))
});

module.exports = {
    createRoleSchema
}