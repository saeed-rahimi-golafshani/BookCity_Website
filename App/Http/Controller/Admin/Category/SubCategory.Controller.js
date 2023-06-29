const createHttpError = require("http-errors");
const { SubCategoryModel } = require("../../../../Models/SubCateghory.Model");
const { createSubCategorySchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById, copyObject, deleteFileInPath } = require("../../../../Utills/Function");

class SubCategoryController extends Controller{
    async createSubcategory(req, res, next){
        try {
            const requestBody = await createSubCategorySchema.validateAsync(req.body);
            const { title, category } = requestBody;
            req.body.image = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const image = req.body.image;
            const resault = await SubCategoryModel.create({title, category, image});
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "زیر مجموعه با موفقیت ثبت شد"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async listOfSubcategory(req, res, next){
        try {
            const subCategory = await SubCategoryModel.find({}).populate([
                {path: "category"}
            ]);
            if(!subCategory) throw new createHttpError.NotFound("زیر مجموعه ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    subCategory
                }
            });
        } catch (error) {
            next(error)            
        }
    }
    async listOfSubcategoryById(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, SubCategoryModel);
            const subcategory = await SubCategoryModel.findOne({_id: checkId._id}).populate([
                {path: "category"}
            ]);
            if(!subcategory) throw new createHttpError.NotFound("زیر مجموعه ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    subcategory
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateOfSubCategroy(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, SubCategoryModel);
            const dataBody = copyObject(req.body);
            if(dataBody.file){
                dataBody.image = path.join(dataBody.fileUploadPath, dataBody.filename).replace(/\\/g, "/");
                deleteFileInPath(checkId.image);
            }
            const nullishdata = ["", " ", 0, null, NaN, undefined];
            Object.keys(dataBody).forEach(key => {
                if(nullishdata.includes(dataBody[key])) delete dataBody[key]
            });
            const updateResault = await SubCategoryModel.updateOne({_id: checkId._id}, {$set: dataBody});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "زیر مجموعه با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            deleteFileInPath(req.body.image);
            next(error)
        }
    }
    async deleteSubcategory(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, SubCategoryModel);
            const deleteResault = await SubCategoryModel.deleteOne({_id: checkId._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "زیرمجموعه با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SubCategoryController: new SubCategoryController()
}