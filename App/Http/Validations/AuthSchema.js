const joi = require("joi");
const { MOBILE_PATTERN } = require("../../Utills/Constants");
const createHttpError = require("http-errors");

const loginWithOtpSchema = joi.object({
    mobile: joi.string().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار شماره موبایل اشتباه است"))
});

module.exports = {
    loginWithOtpSchema
}

