const createHttpError = require("http-errors");
const { PermissionModel } = require("../../../../Models/Permission.Model");
const { createPermissionSchema } = require("../../../Validations/Permission.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById, copyObject, deleteInvalidPropertyObject } = require("../../../../Utills/Function");
const { default: mongoose } = require("mongoose");

class PerminssionControlelr extends Controller{
    async createPermission(req, res, next){
        try {
            const requestBody = await createPermissionSchema.validateAsync(req.body);
            const { name, description } = requestBody;
            await this.checkExistPermissionName(name);
            const permission = await PermissionModel.create({name, description});
            if(!permission) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "سطح دسترسی با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfPermission(req, res, next){
       try {
        const permissions = await PermissionModel.find({});
        if(!permissions) throw new createHttpError.NotFound("سطح دسترسی یافت نشد");
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                permissions
            }
        })
       } catch (error) {
        next(error)
       }
    };
    async updatePermission(req, res, next){
        try {
            const { id } = req.params;
            const permission = await this.checkExistOfPermissionById(id)
            const requestData = copyObject(req.body);
            deleteInvalidPropertyObject(requestData);
            const updateResault = await PermissionModel.updateOne({_id: permission._id}, {$set: requestData});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "سطح دسترسی با موفقیت به روز رسانی شد"
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async removePermission(req, res, next){
        try {
            const { id } = req.params;
            const permission = await this.checkExistOfPermissionById(id);
            const deleteResault = await PermissionModel.deleteOne({_id: permission._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "سطح دسترسی با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async checkExistPermissionName(name){
        const permission = await PermissionModel.findOne({name});
        if(permission) throw new createHttpError.NotFound("این سطح دسترسی از قبل ثبت شده است");
    };
    async checkExistOfPermissionById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر یافت نشد");
        const permission = await PermissionModel.findById(id);
        if(!permission) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
        return permission
    }

}

module.exports = {
    PerminssionControlelr: new PerminssionControlelr()
}