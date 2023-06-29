const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../../Models/Category.Model");
const { createCategorySchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../Utills/Function");

class CategoryController extends Controller{
    async createCategory(req, res, next){
        try {
            const requestBody = await createCategorySchema.validateAsync(req.body);
            const { title, parent, category_sidebar } = requestBody;
            await this.checkExistCategoryWithTitle(title);
            const category = await CategoryModel.create({title, parent, category_sidebar});
            if(!category) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: " دسته بندی با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async listOfCategory(req, res, next){
        try {
            const categories = await CategoryModel.find({parent: undefined}, {createdAt: 0, updatedAt: 0, __v: 0}).populate([
                {path: "category_sidebar", select: {title: 1}},
            ])            
            if(!categories) throw new createHttpError.NotFound("دسته بندی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfCategoryById(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistCategoryWithId(id);
            const category = await CategoryModel.findOne({_id: id}, {parent: 0, updatedAt: 0, createdAt: 0, __v: 0})
            if(!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfAllCategory(req, res, next){
        try {
            let category;
            const search = req?.query?.search || "";
            if(search) {
                category = await CategoryModel.findOne({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                });
            } else {
                category = await CategoryModel.find({});
            }
            if(!category) throw new createHttpError.NotFound(" دسته بندی یافت نشد")
            return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                category
                }   
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req, res, next){
        try {
            const { id } = req.params;
            const category = await this.checkExistCategoryWithId(id);
            const deleteResault = await CategoryModel.deleteOne({$or:[
                {_id: category._id},
                {parent: category._id}
            ]});
            if(deleteResault.deletedCount == 0 ) throw new createHttpError.InternalServerError("خطای سروری")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دسته بندی با موفقیت حذف گردید"
                }
            });         
        } catch (error) {
            next(error)
        }
    }
    async editCategory(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistCategoryWithId(id);
            const data = copyObject(req.body);
            let nullishdata = ["", " ", NaN, null, undefined, 0];
            Object.keys(data).forEach(key => {
                if(nullishdata.includes(data[key])) delete data[key];
            });
            const updateRresault = await CategoryModel.updateOne({_id: id}, {$set: data});
            if(updateRresault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: " دسته بندی با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategoryWithTitle(title){
        const category = await CategoryModel.findOne({title});
        if(category) throw new createHttpError.BadRequest("عنوان دسته بندی از قبل ثبت شده است");
        return category
    }
    async checkExistCategoryWithId(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("ساختار شناسه وارد شده اشتباه است");
        const category = await CategoryModel.findById(id);
        if(!category) throw createHttpError.NotFound("دسته بندی یافت نشد");
        return category
    }
}

module.exports = {
    CategoryController: new CategoryController()
}