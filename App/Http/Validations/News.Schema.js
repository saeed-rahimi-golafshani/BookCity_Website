const createHttpError = require("http-errors");
const joi = require("joi");
const { FILENMAE_IMAGE_PATTERN, MONGOID_PATTERN } = require("../../Utills/Constants");

const createNewsSchema = joi.object({
    title: joi.string().min(3).error(createHttpError.BadRequest("ساختار عنوان خبر اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار متن خبر اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن خبر اشتباه است")),
    tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار برچسب ها برای خبر اشتباه است")),
    newscategory: joi.array().min(1).max(5).error(createHttpError.BadRequest("ساختار دسته بندی برای خبر اشتباه است")),
    source: joi.array().min(1).max(10).error(createHttpError.BadRequest("ساختار منابع خبر اشتباه است")),
    time_range: joi.string().error(createHttpError.BadRequest("ساختار مدت زمان مطالعه اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسالی اشتباه است")),
    fileUploadPath: joi.allow()
});
const createNewsCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی خبر اشتباه است")),
    category_navbar: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی اشتباه است"))
});

module.exports = {
    createNewsSchema,
    createNewsCategorySchema
}