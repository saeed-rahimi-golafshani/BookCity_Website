const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { checkExistProduct } = require("../Utills");
const { UserModel } = require("../../Models/User.Model");
const { copyObject } = require("../../Utills/Function");
const { StatusCodes: httpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");

const createProductToBasket = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId} = args;
        await checkExistProduct(productId);
        const product = await findProductInBasket(user._id, productId);
        if(product){
            await UserModel.updateOne(
                {
                _id: user._id,
                "basket.products.productId": productId
                },
                {
                    $inc: {
                        "basket.products.$.count": 1
                    }
                }
            )
        } else {
            await UserModel.updateOne(
                {
                    _id: user._id
                }, 
                {
                    $push: {
                        "basket.products": {
                            productId,
                            count: 1
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "محصول به سبد خرید اضافه شد"
            }
        }
        
    }
};
const removeProductFromBasket = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId} = args;
        await checkExistProduct(productId);
        const product = await findProductInBasket(user._id, productId);
        if(!product) throw new createHttpError.NotFound("محصول مورد نظر در سبد خرید یافت نشد")
        if(product.count > 1){
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productId": productId
                },
                {
                    $inc: {
                        "basket.products.$.count": -1
                    }
                }
            );
        }else {
            await UserModel.updateOne(
                {
                    _id: user._id,
                    "basket.products.productId": productId
                },
                {
                    $pull: {
                        "basket.products": {
                            productId
                        }
                    }
                }
            )
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message: "محصول از سبد خرید حذف گردید"
            }
        }
    }
};
async function findProductInBasket(userId, productId){
    const basketProduct = await UserModel.findOne({_id: userId, "basket.products.productId": productId}, {"basket.products.$": 1});
    const product = copyObject(basketProduct);
    return product?.basket?.products?.[0]
};

module.exports = {
    createProductToBasket,
    removeProductFromBasket
}