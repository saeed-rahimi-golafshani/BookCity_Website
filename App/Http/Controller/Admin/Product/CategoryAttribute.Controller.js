const createHttpError = require("http-errors");
const { CategoryAttributeModel } = require("../../../../Models/Category_Attribute.model");
const { createCategoryAttributeSchema } = require("../../../Validations/CategoryAttribute.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../Utills/Function")

class CategoryAttributeController extends Controller{
    async createCategoryAttribute(req, res, next){
        try {
            const requestBody = await createCategoryAttributeSchema.validateAsync(req.body);
            const { category, label } = requestBody;
            await this.checkExistCategoryAttributeByTitle(label);
            const categoryAttribute = await CategoryAttributeModel.create({category, label});
            if(!categoryAttribute) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "ویژگی دسته بندی محصول با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfCategoryAttribute(req, res, next){
        try {
            const categoryAttributeis = await CategoryAttributeModel.find({}).populate([
                {path: "category"}
            ]);
            if(!categoryAttributeis) throw new createHttpError.NotFound("ویژگی محصولی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categoryAttributeis
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfCategoryAttributeById(req, res, next){
        try {
            const { id } = req.params;
            const categoryAttribute = await this.checkExistCategoryAttributeById(id);
            const resault = await CategoryAttributeModel.findOne({_id: categoryAttribute._id});
            if(!resault) throw new createHttpError.NotFound("عنوان مشخصات محصول یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categoryAttribute: resault
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateCategoryAttribute(req, res, next){
        try {
            const { id } = req.params;
            const categoryAttribute = await this.checkExistCategoryAttributeById(id);
            const dataBody = copyObject(req.body);
            const nullishData = ["", " ", 0, null, NaN, undefined];
            Object.keys(dataBody).forEach(key => {
                if(nullishData.includes(dataBody[key])) delete dataBody[key];
            });
            const updateResault = await CategoryAttributeModel.updateOne({_id: categoryAttribute._id}, {$set: dataBody});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "عنوان مشخصات محصول با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategoryAttributeByTitle(label){
        const categoryAttri = await CategoryAttributeModel.findOne({label});
        if(categoryAttri) throw new createHttpError.BadRequest("عنوان ویژگی محصول از قبل ثبت شده است");
        return categoryAttri
    }
    async checkExistCategoryAttributeById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر یافت نشد");
        const categoryAttribute = await CategoryAttributeModel.findById(id);
        if(!categoryAttribute) throw new createHttpError.NotFound("عنوان مشخصاتی یافت نشد");
        return categoryAttribute
    }}

module.exports = {
    CategoryAttributeController: new CategoryAttributeController()
}