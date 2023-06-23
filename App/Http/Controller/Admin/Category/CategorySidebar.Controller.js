const { createCategorySidebarSchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { CategorySidebarModel } = require("../../../../Models/Category_SideBar.Model");
const createHttpError = require("http-errors");

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
            next(error)
       }
    }
}

module.exports = {
    CategorySidebarController: new CategorySidebarController()
}