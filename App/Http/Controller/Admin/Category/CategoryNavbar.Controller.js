const createHttpError = require("http-errors");
const { CategoryNavbarModel } = require("../../../../Models/Category_Navbar.model");
const { createCategoryNavbarSchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes")

class CategoryNavbarController extends Controller{
    async createCategoryNavbar(req, res, next){
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
    }
}

module.exports = {
    CategoryNavbarController: new CategoryNavbarController()
}