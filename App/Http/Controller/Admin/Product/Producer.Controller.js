const createHttpError = require("http-errors");
const { ProducerModel } = require("../../../../Models/Producer.Model");
const { createProducerSchema } = require("../../../Validations/Producer.schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../Utills/Function");

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
    async listOfProducerById(req, res, next){
        try {
            const { id } = req.params;
            const producer = await this.checkExistProducerById(id);
            const resault = await ProducerModel.findOne({_id: producer._id});
            if(!resault) throw new createHttpError.NotFound("تولید کننده ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    listOfProducer: resault
                }
            })


        } catch (error) {
            next(error)
        }
    }
    async updateProducer(req, res, next){
        try {
            const { id } = req.params;
            const producer = await this.checkExistProducerById(id);
            const dataBody = copyObject(req.body);
            const nullishData = ["", " ", null, 0, NaN, undefined];
            Object.keys(dataBody).forEach(key => {
                if(nullishData.includes(dataBody[key])) delete dataBody[key]
            });
            const updateResault = await ProducerModel.updateOne({_id: producer._id}, {$set: dataBody});
            if(!updateResault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async deleteProducer(req, res, next){
        try {
            const { id } = req.params;
            const producer = await this.checkExistProducerById(id);
            const deleteResault = await ProducerModel.deleteOne({_id: producer._id});
            if(!deleteResault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "تولید کننده با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistProducerBytitle(title){
        const producer = await ProducerModel.findOne({title});
        if(producer) throw new createHttpError.BadRequest("عنوان تولید کننده از قیل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return producer
    }
    async checkExistProducerById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const producer = await ProducerModel.findById(id);
        if(!producer) throw new createHttpError.NotFound("تولید کننده ای یافت نشد");
        return producer
    }
}

module.exports = {
    ProducerController: new ProducerController()
}