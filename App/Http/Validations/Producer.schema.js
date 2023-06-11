const createHttpError = require("http-errors");
const joi = require("joi");

const createProducerSchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان برای تولید کننده ها اشتباه است")),
    description: joi.string().error(createHttpError.BadRequest("ساختار توضیحات برای تولید کننده ها اشتباه است"))
});

module.exports = {
    createProducerSchema
}