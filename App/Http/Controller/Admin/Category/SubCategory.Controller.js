const createHttpError = require("http-errors");
const { SubCategoryModel } = require("../../../../Models/SubCategory.Model");
const { createSubCategorySchema } = require("../../../Validations/SubCategory.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../Utills/Function");

class SubCategoryController extends Controller{
    async createSubCategory(req, res, next){
        try {
            const requestBody = await createSubCategorySchema.validateAsync(req.body);
            const { title, parent } = requestBody;
            await this.checkExistSubCategoryWithTitle(title);
            const subcategory = await SubCategoryModel.create({title, parent});
            if(!subcategory) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "زیر مجموعه با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async listOfSubCategory(req, res, next){
        try {
            const subCategories = await SubCategoryModel.find({parent: undefined}, {children: 0})            
            if(!subCategories) throw new createHttpError.NotFound("زیر مجموعه ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    subCategories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfAllSubCategory(req, res, next){
        try {
            const subCategory = await SubCategoryModel.find({});
            if(!subCategory) throw new createHttpError.NotFound("زیر مجموعه ای یافت نشد")
            return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                subCategory
                }   
            })
        } catch (error) {
            next(error)
        }
    }
    async removeSubCategory(req, res, next){
        try {
            const { id } = req.params;
            const subCategory = await this.checkExistSubCategoryWithId(id);
            const deleteResault = await SubCategoryModel.deleteOne({$or:[
                {_id: subCategory._id},
                {parent: subCategory._id}
            ]});
            if(deleteResault.deletedCount == 0 ) throw new createHttpError.InternalServerError("خطای سروری")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "زیر مجموعه با موفقیت حذف گردید"
                }
            });         
        } catch (error) {
            next(error)
        }
    }
    async editSubCategory(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistSubCategoryWithId(id);
            const data = copyObject(req.body);
            let nullishdata = ["", " ", NaN, null, undefined, 0];
            Object.keys(data).forEach(key => {
                if(nullishdata.includes(data[key])) delete data[key];
            });
            const updateRresault = await SubCategoryModel.updateOne({_id: id}, {$set: data});
            if(updateRresault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "زیر مجموعه با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistSubCategoryWithTitle(title){
        const subcategory = await SubCategoryModel.findOne({title});
        if(subcategory) throw new createHttpError.BadRequest("عنوان زیر مجموعه از قبل ثبت شده است");
        return subcategory
    }
    async checkExistSubCategoryWithId(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه وارد شده اشتباه است");
        const subCategory = await SubCategoryModel.findById(id);
        if(!subCategory) throw createHttpError.NotFound("زیر مجموعه ای یافت نشد");
        return subCategory
    }
}

module.exports = {
    SubCategoryController: new SubCategoryController()
}