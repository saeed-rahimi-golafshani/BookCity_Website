const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { checkExistProduct } = require("../Utills");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../Utills/Function");
const createHttpError = require("http-errors");
const { ProductModel } = require("../../Models/Products.Model");
const { StatusCodes: httpStatus } = require("http-status-codes")

const QuestionsProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString},
        title: {type: GraphQLString},
        comment: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId, title, comment, parent } = args;
        await checkExistProduct(productId);
        if(parent && mongoose.isValidObjectId(parent)){
            
            const questionDocument = await getComment(ProductModel, parent);
            console.log(parent);
            if(questionDocument && !questionDocument?.openToComment) throw new createHttpError.BadRequest("ثبت پاسخ مجاز نیست");
            const createAnswerResault = await ProductModel.updateOne({
                "questions._id": parent} ,{
                    $push: {
                        "questions.$.answers":{
                            comment,
                            user: user._id,
                            show: false,
                            openToComment: false
                        }
                    }
                });
                if(createAnswerResault.modifiedCount == 0) {
                    throw new createHttpError.BadRequest("ثبت پاسخ انجام نشد")
                }
                return {
                    statusCode: httpStatus.CREATED,
                    data : {
                        message: "پاسخ شما با موفقیت ثبت شد"
                    }
                }
        } else {
            await ProductModel.updateOne({_id: productId}, {
                $push : {questions : {
                    title,
                    comment, 
                    user: user._id, 
                    show : false,
                    openToComment : true
                }}
            })
        }

        return {
                statusCode: httpStatus.CREATED,
                data : {
                    message: "ثبت سوال با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد"
                }
        }
    }
};

async function getComment(model, id){
    const findQuestion = await model.findOne({"questions._id": id});
    const question = copyObject(findQuestion);
    if(!question?.questions?.[0]) throw new createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
    return question?.questions?.[0]
};

module.exports = {
    QuestionsProduct
}