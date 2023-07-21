const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { 
    checkExistBlog, 
    checkExistNews, 
    checkExistProduct, 
    checkExistCommentOfBlog, 
    checkExistCommentOfNews, 
    checkExistCommentOfProduct 
} = require("../Utills");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { NewsModel } = require("../../Models/News.Model");
const { ProductModel } = require("../../Models/Products.Model");

const DislikesOfBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const likesOfBlog = await BlogModel.findOne({
            _id: blogId,
            likes: user._id
        });
        const dislikesOfBlog = await BlogModel.findOne({
            _id: blogId,
            dislikes: user._id
        });
        const findQuery = dislikesOfBlog? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await BlogModel.updateOne({_id: blogId}, findQuery);
        let message;
        if(!dislikesOfBlog){
            if(likesOfBlog) await BlogModel.updateOne({_id: blogId}, {$pull: {likes: user._id}});
            message = "نپسندیدن مقاله با موفقیت انجام شد"
        } else {
            message = "نپسندیدن مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const DislikeOfNews = {
    type: ResponseType,
    args: {
        newsId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { newsId } = args;
        await checkExistNews(newsId);
        const likesOfNews = await NewsModel.findOne({
            _id: newsId,
            likes: user._id
        });
        const dislikesNews = await NewsModel.findOne({
            _id: newsId,
            dislikes: user._id
        });
        const findQuery = dislikesNews? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await NewsModel.updateOne({_id: newsId}, findQuery);
        let message;
        if(!dislikesNews){
            if(likesOfNews) await NewsModel.updateOne({_id: newsId}, {$pull: {likes: user._id}});
            message = "نپسندیدن خبر با موفقیت ثبت شد"
        } else {
            message = "نپسندیدن خبر لغو شد"
        } 
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const DislikesOfProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId);
        const likesOfProduct = await ProductModel.findOne({
            _id: productId,
            likes: user._id
        });
        const dislikesOfProduct = await ProductModel.findOne({
            _id: productId,
            dislikes: user._id
        });
        const findQuery = dislikesOfProduct? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}};
        await ProductModel.updateOne({_id: productId}, findQuery);
        let message;
        if(!dislikesOfProduct){
            if(likesOfProduct) await ProductModel.updateOne({_id: productId}, {$pull: {likes: user._id}});
            message = "نپسندیدن محصول با موفقیت ثبت شد"
        } else {
            message = "نپسندیدن محصول لغو شد"
        } 
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const DislikesCommentsOfblog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString},
        commentId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId, commentId } = args;
        await checkExistBlog(blogId);
        await checkExistCommentOfBlog(commentId);
        const likesOfBlog = await BlogModel.findOne({
            _id: blogId,
            "comments._id": commentId,
            "comments.likes": user._id
        });
        const dislikesOfBlog = await BlogModel.findOne({
            _id: blogId,
            "comments._id": commentId,
            "comments.dislikes": user._id
        });
        const findQuery = dislikesOfBlog? {$pull: {"comments.$.dislikes": user._id}} : {$push: {"comments.$.dislikes": user._id}};
        await BlogModel.updateOne({_id: blogId, "comments._id": commentId}, findQuery);
        let message;
        if(!dislikesOfBlog){
            if(likesOfBlog) await BlogModel.updateOne({_id: blogId, "comments._id": commentId}, {$pull: {"comments.$.likes": user._id}});
            message = "نپسندیدن مقاله با موفقیت ثبت شد"
        } else {
            message = "نپسندیدن مقاله لغو شد"
        } 
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const DislikesCommentsOfNews = {
    type: ResponseType,
    args: {
        newsId: {type: GraphQLString},
        commentId: {type: GraphQLString}
    },
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { newsId, commentId } = args;
        await checkExistNews(newsId);
        await checkExistCommentOfNews(commentId);
        const likesOfNews = await NewsModel.findOne({
            _id: newsId,
            "comment._id": commentId,
            "comment.likes": user._id
        });
        const dislikesNews = await NewsModel.findOne({
            _id: newsId,
            "comment._id": commentId,
            "comment.dislikes": user._id
        });
        const findQuery = dislikesNews? {$pull: {"comment.$.dislikes": user._id}} : {$push: {"comment.$.dislikes": user._id}};
        await NewsModel.updateOne({_id: newsId, "comment._id": commentId}, findQuery);
        let message;
        if(!dislikesNews){
            if(likesOfNews) await NewsModel.updateOne({_id: newsId, "comment._id": commentId}, {$pull: {"comment.$.likes": user._id}});
            message = "نپسندیدن خبر با موفقیت ثبت شد"
        } else {
            message = "نپسندیدن خبر لغو شد"
        } 
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const DislikesCommentsOfProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString},
        commentId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId, commentId } = args;
        await checkExistProduct(productId);
        await checkExistCommentOfProduct(commentId);
        const likesOfProduct = await ProductModel.findOne({
            _id: productId,
            "comments._id": commentId,
            "comments.likes": user._id
        });
        const dislikesOfProduct = await ProductModel.findOne({
            _id: productId,
            "comments._id": commentId,
            "comments.dislikes": user._id
        });
        const findQuery = dislikesOfProduct? {$pull: {"comments.$.dislikes": user._id}} : {$push: {"comments.$.dislikes": user._id}};
        await ProductModel.updateOne({_id: productId, "comments._id": commentId}, findQuery);
        let message;
        if(!dislikesOfProduct){
            if(likesOfProduct) await ProductModel.updateOne({_id: productId, "comments._id": commentId}, {$pull: {"comments.$.likes": user._id}});
            message = "نپسندیدن محصول با موفقیت ثبت شد"
        } else {
            message = "نپسندیدن محصول لغو شد"
        } 
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
}

module.exports = {
    DislikesOfBlog,
    DislikeOfNews,
    DislikesOfProduct,
    DislikesCommentsOfblog,
    DislikesCommentsOfNews,
    DislikesCommentsOfProduct
}