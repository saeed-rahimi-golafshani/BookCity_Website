const createHttpError = require("http-errors");
const { ContactModel } = require("../../../../Models/Contact.Model");
const { createContactSchema } = require("../../../Validations/Contact.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../Utills/Function")

class ContactController extends Controller{
    async createContact(req, res, next){
        try {
            const requestBody = await createContactSchema.validateAsync(req.body);
            const { phone, email, address, fax } = requestBody;
            const contact = await ContactModel.create({phone, email, address, fax});
            if(!contact) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ارتباط با ما با موفقیت ثبت شد"
                }
            });
        }catch (error) {
            next(error)
        }
    }
    async listOfContact(req, res, next){
        try {
            const contact = await ContactModel.find({})
            if(!contact) throw new createHttpError.NotFound("ارتباط با مایی یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    contact
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateOfContact(req, res, next){
        try {
            const { id } = req.params;
            const contact = await this.checkExistOfContactById(id);
            const data = copyObject(req.body);
            const nullishData = ["", " ", NaN, null, undefined, 0];
            Object.keys(data).forEach(key => {
                if(nullishData.includes(data[key])) delete data[key]
            });
            const updateResault = await ContactModel.updateOne({_id: contact._id}, {$set: data});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
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
    async deleteofcontact(req, res, next){
        try {
            const { id } = req.params;
            const contact = await this.checkExistOfContactById(id);
            const deleteResault = await ContactModel.deleteOne({_id: contact._id});
            if(!deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("حطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "حذف با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistOfContactById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه وارد شده اشتباه است");
        const contact = await ContactModel.findById(id);
        if(!contact) throw createHttpError.NotFound("ارتباط با ما یافت نشد");
        return contact
    }
}

module.exports = {
    ContactController: new ContactController()
}