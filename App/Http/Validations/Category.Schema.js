const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN, FILENMAE_ICON_PATTERN } = require("../../Utills/Constants")

const createCategorySchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان زیر مجموعه اشتباه است")),
    parent: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است"))
});
const createCategoryNavbarSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی اشتباه است")),
    filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
    fileUploadPath: joi.allow()
});
const createCategorySidebarSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان دسته بندی اشتباه است")),
    category_navbar: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار گزینه مورد نظر اشتباه است ")),
    filename: joi.string().pattern(FILENMAE_ICON_PATTERN).error(createHttpError.BadRequest("ساختار فرمت آیکون مورد نظر اشتباه است")),
    fileUploadPath: joi.allow()
})
module.exports = {
    createCategorySchema,
    createCategoryNavbarSchema,
    createCategorySidebarSchema
}