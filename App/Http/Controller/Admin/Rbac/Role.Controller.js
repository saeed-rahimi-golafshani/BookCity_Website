const { default: mongoose } = require("mongoose");
const { createRoleSchema } = require("../../../Validations/Role.Schema");
const Controller = require("../../Controller");
const { RoleModel } = require("../../../../Models/Role.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { deleteInvalidPropertyObject, copyObject } = require("../../../../Utills/Function");

class RoleController extends Controller{
    async createRole(req, res, next){
        try {
            const requestBody = await createRoleSchema.validateAsync(req.body);
            const { title, permissions, description } = requestBody;
            await this.checkExistRoleWithTitle(title);
            const role = await RoleModel.create({title, permissions, description});
            if(!role) throw new createHttpError.InternalServerError("نقش کاربری ثبت نشد");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "نقش کاربری با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    };
    async listOfRole(req, res, next){
        try {
            const roles = await RoleModel.find({}).populate([
                {path: "permissions"}
            ]);
            if(!roles) throw new createHttpError.NotFound("نقش کاربری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    roles
                }
            });   
        } catch (error) {
            next(error)
        }
    };
    async listOfRoleById(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.checkExistRoleByIdAndTitle(id);
            const listOfResault = await RoleModel.findOne({_id: role._id}).populate([
                {path: "permissions"}
            ]);
            if(!listOfResault) throw new createHttpError.NotFound("نقش کاربری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    listOfResault
                }
            });

        } catch (error) {
            next(error)
        }
    };
    async updateOfRole(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.checkExistRoleByIdAndTitle(id);
            const requestData = copyObject(req.body);
            deleteInvalidPropertyObject(requestData);
            const updateResault = await RoleModel.updateOne({_id: role._id}, {$set: requestData});
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
    };
    async deleteOfRole(req, res, next){
        try {
            const { id } = req.params;
            const role = await this.checkExistRoleByIdAndTitle(id);
            const deleteResault = await RoleModel.deleteOne({_id: role._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "نقش کاربری با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistRoleWithTitle(title){
        const role = await RoleModel.findOne({title});
        if(role) throw new createHttpError.BadRequest("این نقش یا رول از قبل وجود دارد")
    }
    async checkExistRoleByIdAndTitle(feild){
        let findQuery = mongoose.isValidObjectId(feild)? {_id: feild}:{title: feild};
        const role = await RoleModel.findOne(findQuery);
        if(!role) throw new createHttpError.NotFound("نقش مورد نظر یافت نشد");
        return role
    }
};

module.exports = {
    RoleController: new RoleController()
}