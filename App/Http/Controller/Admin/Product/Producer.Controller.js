const createHttpError = require("http-errors");
const { ProducerModel } = require("../../../../Models/Producer.Model");
const { createProducerSchema } = require("../../../Validations/Producer.schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

class ProducerController extends Controller{
    async createProducer(req, res, next){
        try {
            const requestBody = await createProducerSchema.validateAsync(req.body);
            const { title, description } = requestBody;
            await this.checkExistProducerBytitle(title);
            const producer = await ProducerModel.create({title, description});
            if(!producer) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
            data: {
                message: "تولید کننده با موفقیت ثبت شد"
            }
            });

        } catch (error) {
            next(error)
        }
    }
    async listOfProducer(req, res, next){
       try {
        const { search } = req.query;
        let producer;
        if(search){
            producer = await ProducerModel.find({
                $text: {
                    $search: new RegExp(search, "ig")
                }
            })
        } else {
            producer = await ProducerModel.find({})
        }
        if(!producer) throw new createHttpError.NotFound("تولید کننده ای یافت نشد");
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                producer
            }
        })
       } catch (error) {
        next(error)
       }
    }
    async checkExistProducerBytitle(title){
        const producer = await ProducerModel.findOne({title});
        if(producer) throw new createHttpError.BadRequest("عنوان تولید کننده از قیل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return producer
    }
}

module.exports = {
    ProducerController: new ProducerController()
}