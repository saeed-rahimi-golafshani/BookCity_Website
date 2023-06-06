const createHttpError = require("http-errors");
const { ProductCategoryModel } = require("../../../../Models/ProductCategory.Model");
const { createProductCategorySchema } = require("../../../Validations/ProductCategory.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");

class ProductCategoryController extends Controller{
    async createProductCategory(req, res, next){
        try {
            const requestBody = await createProductCategorySchema.validateAsync(req.body);
            const { title, parent, sub_category } = requestBody;
            await this.checkExistProductCategoryByTitle(title);
            const productCategory = await ProductCategoryModel.create({title, parent, sub_category})
            if(!productCategory) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "دسته بندی محول با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async checkExistProductCategoryByTitle(title){
        const productCategory = await ProductCategoryModel.findOne({title});
        if(productCategory) throw new createHttpError.BadRequest(`${productCategory.title}به عنوان دسته بندی محصول از قبل ثبت شده است`)
        return productCategory

    }
}

module.exports = {
    ProductCategoryController: new ProductCategoryController()
}