const joi = require("joi");
const { EMAIL_PATTERN, PHONE_PATTERN } = require("../../Utills/Constants");
const createHttpError = require("http-errors");

const createContactSchema = joi.object({
    phone: joi.string().length(11).pattern(PHONE_PATTERN).error(createHttpError.BadRequest("ساختار شماره موبایل اشتباه است")),
    email: joi.string().pattern(EMAIL_PATTERN).error(createHttpError.BadRequest("ساختار ایمیل اشتباه است")),
    address: joi.string().error(createHttpError.BadRequest("ساختار آدرس اشتباه است")),
    fax: joi.string().pattern(PHONE_PATTERN).error(createHttpError.BadRequest("ساختار شماره تلفن اشتباه است"))
});

module.exports = {
    createContactSchema
}