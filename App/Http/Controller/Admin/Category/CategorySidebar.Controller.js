const { createCategorySidebarSchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CategorySidebarModel } = require("../../../../Models/Category_SideBar.Model");
const createHttpError = require("http-errors");
const { checkExistOfModelById, copyObject, deleteFileInPath } = require("../../../../Utills/Function");

class CategorySidebarController extends Controller{
    async createCategorySidebar(req, res, next){
       try {
        const requestBody = await createCategorySidebarSchema.validateAsync(req.body);
        const { title, category_navbar } = requestBody;
        req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
        const icon = req.body.icon;
        const resault = await CategorySidebarModel.create({title, category_navbar, icon});
        if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
        return res.status(httpStatus.CREATED).json({
            statusCode: httpStatus.CREATED,
            data: {
                message: "عنوان منو با موفقیت ثبت شد"
            }
        });
       } catch (error) {
            deleteFileInPath(req?.body?.icon)
            next(error)
       }
    }
    async listOfCategorySidbar(req, res, next){
        try {
            const categorySidbars = await CategorySidebarModel.find({}, {createdAt: 0, updatedAt: 0, __v: 0}).populate([
                {path: "category_navbar", select: {title: 1}}
            ]);
            if(!categorySidbars) throw new createHttpError.NotFound("منویی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categorySidbars
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfCategoryById(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, CategorySidebarModel);
            const categorySidebar = await CategorySidebarModel.findOne({_id: checkId._id}, {createdAt: 0, updatedAt: 0, __v: 0}).populate([
                {path: "category_navbar", select: {title: 1}}
            ]);
            if(!categorySidebar) throw new createHttpError.NotFound("منویی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categorySidebar
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateOfCategorySidbar(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, CategorySidebarModel);
            const dataBody = copyObject(req.body);
            if(dataBody.file){
                dataBody.icon = path.join(dataBody.fileUploadPath, dataBody.filename).replace(/\\/g, "/");
                deleteFileInPath(checkId.icon);
            }
            const nullishData = ["", " ", 0, NaN, null, undefined];
            Object.keys(dataBody).forEach(key => {
                if(nullishData.includes(dataBody[key])) delete dataBody[key]
           });
           const updateResault = await CategorySidebarModel.updateOne({_id: checkId._id}, {$set: dataBody});
           if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
           return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                message: "منو با موفقیت به روز رسانی شد"
            }
           });
        } catch (error) {
            next(error)
        }
    }
    async deleteCategorySidbar(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, CategorySidebarModel);
            const deleteResault = await CategorySidebarModel.deleteOne({_id: checkId._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "منو با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CategorySidebarController: new CategorySidebarController()
}