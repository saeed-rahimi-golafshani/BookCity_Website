const createHttpError = require("http-errors");
const joi = require("joi");

const createPermissionSchema = joi.object({
    name: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار مجوز برای نقشها اشتباه است")),
    description: joi.string().error(createHttpError.BadRequest("ساختار آیتم مورد نظر اشتباه است"))
});

module.exports = {
    createPermissionSchema
}