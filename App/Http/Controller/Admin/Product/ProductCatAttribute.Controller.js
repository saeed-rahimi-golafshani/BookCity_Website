const { createProductCatAttributeSchema } = require("../../../Validations/ProductCatAttribute.Schema");
const Controller = require("../../Controller");
const { productCategoryAttributeModel } = require("../../../../Models/Product_Category_Attribute.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { ProductModel } = require("../../../../Models/Products.Model")

class ProductCatAttributeController extends Controller{
    async createProductCatAttribute(req, res, next){
        try {
            const requestBody = await createProductCatAttributeSchema.validateAsync(req.body);
            const { category_attribute, product, value } = requestBody;
            const createResault = await productCategoryAttributeModel.create({category_attribute, product, value});
            if(!createResault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "مشخصات محصول با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfProductCatAttribute(req, res, next){
        try {
            const productCatAttributes = await productCategoryAttributeModel.find({}).populate([
                {path: "product", select: {title: 1}},
                {path: "category_attribute", select: {label: 1}}
            ]);
            if(!productCatAttributes) throw new createHttpError.NotFound("مشخصات محصولی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    productCatAttributes
                }
            });
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    ProductCatAttributeController: new ProductCatAttributeController()
}