const createHttpError = require("http-errors");
const joi = require("joi");
const { FILENMAE_IMAGE_PATTERN } = require("../../Utills/Constants");

const createBlogSchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان مقاله اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار متن وارد شده اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن وارد شده اشتباه است")),
    tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
    category: joi.array().min(1).max(5).error(createHttpError.BadRequest("ساختار دسته بندی اشتباه است")),
    source: joi.array().min(1).max(10).error(createHttpError.BadRequest("ساختار منابع مقاله اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسالی اشتباه است")),
    fileUploadPath: joi.allow()
});

module.exports = {
    createBlogSchema
}