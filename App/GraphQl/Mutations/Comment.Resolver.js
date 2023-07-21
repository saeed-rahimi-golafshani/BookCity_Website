const { GraphQLString, GraphQLList } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { checkExistBlog, checkExistNews, checkExistProduct } = require("../Utills");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { NewsModel } = require("../../Models/News.Model");
const { ProductModel } = require("../../Models/Products.Model");

const CreateCommentForBlog = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        blogId: {type: GraphQLString},
        title: {type: GraphQLString},
        negative_points: {type: new GraphQLList(GraphQLString)},
        positive_points: {type: new GraphQLList(GraphQLString)}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { title, negative_points, positive_points, comment, blogId } = args;
        if(!mongoose.isValidObjectId(blogId)) throw new createHttpError.BadRequest("شناسه مقاله ارسال شده صحیح نمیباشد");
        await checkExistBlog(blogId);
        await BlogModel.updateOne({_id: blogId}, {
            $push: {comments: {
                user: user._id,
                title,
                negative_points,
                positive_points,
                comment,
                show: false
            }}
        });
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت نظر شما ثبت خواهد شد"
            }
        }
    }
};
const CreateCommentForNews = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        newsId: {type: GraphQLString}, 
        title: {type: GraphQLString},
        negative_points: {type: new GraphQLList(GraphQLString)},
        positive_points: {type: new GraphQLList(GraphQLString)}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const {comment, newsId, title, negative_points, positive_points} = args;
        if(!mongoose.isValidObjectId(newsId)) throw new createHttpError.BadRequest("ساختار شناسه خبر مورد نظر اشتباه است");
        await checkExistNews(newsId);
        await NewsModel.updateOne({_id: newsId}, {
            $push: {comment: {
                user: user._id,
                title,
                comment,
                negative_points,
                positive_points,
                show: false
            }}
        });
        return{ 
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت نظر شما ثبت خواهد شد"
            }
        }
    }
};
const CreateCommentForProduct = {
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        productId: {type: GraphQLString},
        title: {type: GraphQLString},
        negative_points: {type: new GraphQLList(GraphQLString)},
        positive_points: {type: new GraphQLList(GraphQLString)}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { comment, productId, title, negative_points, positive_points } = args;
        if(!mongoose.isValidObjectId(productId)) throw new createHttpError.BadRequest("ساختار شناسه محصول اشتباه است");
        await checkExistProduct(productId);
        await ProductModel.updateOne({_id: productId}, {
            $push: {comments: {
                user: user._id,
                comment,
                title,
                show: false,
                positive_points,
                negative_points
            }}
        });
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message: "ثبت نظر با موفقیت انجام شد، بعد از تایید مدیر سایت نظر شما ثبت خواهد شد"
            }
        }
    }
}

module.exports = {
    CreateCommentForBlog,
    CreateCommentForNews,
    CreateCommentForProduct
}