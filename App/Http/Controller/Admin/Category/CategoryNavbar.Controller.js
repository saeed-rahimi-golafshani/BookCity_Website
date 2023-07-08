const createHttpError = require("http-errors");
const { CategoryNavbarModel } = require("../../../../Models/Category_Navbar.Model");
const { createCategoryNavbarSchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById, copyObject, deleteFileInPath } = require("../../../../Utills/Function");

class CategoryNavbarController extends Controller{
    async createCategoryNavbar(req, res, next){
        try {
            const requestBody = await createCategoryNavbarSchema.validateAsync(req.body);
            const { title } = requestBody;
            req.body.icon = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const icon = req.body.icon;
            const resault = await CategoryNavbarModel.create({title, icon});
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: " عنوان منو با موفقیت ثبت شد"
                }
        });
        } catch (error) {
            deleteFileInPath(req?.body?.icon);
            next(error)
        }
    }
    async listOfCategoryNavbar(req, res, next){
        try {
            const categoryNavbar = await CategoryNavbarModel.find({});
            if(!categoryNavbar) throw new createHttpError.NotFound("منویی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categoryNavbar
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfCategoryNavbarById(req, res, next){
        try {
            const { id } = req.params;
            const categoryNavbar = await checkExistOfModelById(id, CategoryNavbarModel);
            const resault = await CategoryNavbarModel.findOne({_id: categoryNavbar._id});
            if(!resault) throw new createHttpError.NotFound("منویی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categoryNavbar: resault
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateCategoryNavbar(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, CategoryNavbarModel);
            const databody = copyObject(req.body);
            if(databody.fileUploadPath && databody.filename){
                databody.icon = path.join(databody.fileUploadPath, databody.filename).replace(/\\/g, "/");
                // deleteFileInPath(checkId.icon)
            }
            const nullishData = ["", " ", null, NaN, undefined, 0];
            Object.keys(databody).forEach(key => {
                if(nullishData.includes(databody[key])) delete databody[key]
            });
            const updateResault = await CategoryNavbarModel.updateOne({_id: checkId._id}, {$set: databody});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "منو با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            deleteFileInPath(req?.body?.icon);
            next(error)
        }
    }
    async deleteCategoryNavbar(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await checkExistOfModelById(id, CategoryNavbarModel);
            const deleteResault = await CategoryNavbarModel.deleteOne({_id: checkId._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "منوی مورد نظر با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    CategoryNavbarController: new CategoryNavbarController()
}