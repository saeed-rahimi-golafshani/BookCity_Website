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
            const productCatAttributes = await productCategoryAttributeModel.aggregate([
                {$match: {}},
                {
                    $lookup: {
                        from: "products",
                        localField: "product",
                        foreignField: "_id",
                        as: "product"
                    }
                }, 
                {
                    $unwind: "$product"
                },
                {
                    $lookup: {
                        from: "category_attributes",
                        localField: "category_attribute",
                        foreignField: "_id",
                        as: "category_attribute"
                    }
                },
                {
                    $unwind: "$category_attribute"
                },
                {
                    $project: {
                        "product.__v": 0,
                        "product.introduction": 0,
                        "product.expert_Check": 0,
                        "product.images": 0,
                        "product.image_refrence": 0,
                        "product.tags": 0,
                        "product.category": 0,
                        "product.main_price": 0,
                        "product.price": 0,
                        "product.discount": 0,
                        "product.count": 0,
                        "product.description": 0,
                        "product.seller": 0,
                        "product.producer": 0,
                        "product.active": 0,
                        "product.likes": 0,
                        "product.dislikes": 0,
                        "product.bookmarks": 0,
                        "product.comments": 0,
                        "product.questions": 0,
                        "product.createdAt": 0,
                        "product.updatedAt": 0,
                        "category_attribute.category": 0,
                        "category_attribute.createdAt": 0,
                        "category_attribute.updatedAt": 0,
                        "category_attribute.__v": 0,
                    }
                }
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