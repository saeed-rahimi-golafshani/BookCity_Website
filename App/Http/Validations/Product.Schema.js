const joi = require("joi");
const createHttpError = require("http-errors");
const { MONGOID_PATTERN, FILENMAE_IMAGE_PATTERN } = require("../../Utills/Constants");

const createProductSchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان محصول اشتباه است")),
    introduction: joi.string().error(createHttpError.BadRequest("ساختار معرفی محصول اشتباه است")),
    expert_Check: joi.string().error(createHttpError.BadRequest("ساختار معرفی محصول اشتباه است")),
    tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
    category: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار دسته بندی محصول اشتباه است")),
    seller: joi.string().error(createHttpError.BadRequest("ساختار فروشنده محصول اشتباه است")),
    description: joi.string().error(createHttpError.BadRequest("ساختار توضیحات محصول اشتباه است")),
    producer: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار تولید کننده محصول اشتباه است")),
    main_price: joi.number().error(createHttpError.BadRequest(" ساختار قیمت اصلی وارد شده صحیح نمیباشد")),
    discount: joi.number().error(createHttpError.BadRequest(" ساختار تخفیف وارد شده صحیح نمیباشد")),
    count: joi.number().error(createHttpError.BadRequest("ساختار تعداد محصول اشتباه است")),
    active: joi.string().error(createHttpError.BadRequest("ساختار فعال بودن یا نبودن محصول اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسالی اشتباه است")),
    fileUploadPath: joi.allow()
});
 
module.exports = {
    createProductSchema
}