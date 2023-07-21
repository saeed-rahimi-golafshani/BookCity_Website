const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { checkExistBlog, checkExistNews, checkExistProduct, checkExistCommentOfBlog, checkExistCommentOfNews, checkExistCommentOfProduct } = require("../Utills");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { NewsModel } = require("../../Models/News.Model");
const { ProductModel } = require("../../Models/Products.Model");
const ProductsModel = require("../../Models/Products.Model");

const LikeBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        const likeBlog = await BlogModel.findOne({
            _id: blogId,
            likes: user._id
        });
        const disLikeBlog = await BlogModel.findOne({
            _id: blogId,
            dislikes: user._id
        });
        const findQuery = likeBlog? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await BlogModel.updateOne({_id: blogId}, findQuery);
        let message;
        if(!likeBlog){
            if(disLikeBlog) await BlogModel.updateOne({_id: blogId}, {$pull: {disLikeBlog: user._id}})
            message = "پسندیدن مقاله با موفقیت انجام شد"
        } else{
            message = "پسندیدن مقاله لغو شد"
        };
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }

    }
};
const likeNews = {
    type: ResponseType,
    args: {
        newsId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { newsId } = args;
        await checkExistNews(newsId);
        const likesNews = await NewsModel.findOne({
            _id: newsId,
            likes: user._id
        });
        const dislikesNews = await NewsModel.findOne({
            _id: newsId,
            dislikes: user._id
        });
        const findQuery = likesNews? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await NewsModel.updateOne({_id: newsId}, findQuery);
        let message;
        if(!likesNews){
            if(dislikesNews) await NewsModel.updateOne({_id: newsId}, {$pull: {dislikes: user._id}});
            message = "پسندیدن خبر با موفقیت انجام شد"
        } else {
            message = "پسندیدن خبر لغو شد"
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const likeProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId);
        const likesProduct = await ProductModel.findOne({
            _id: productId,
            likes: user._id
        });
        const dislikesProduct = await ProductModel.findOne({
            _id: productId,
            dislikes: user._id
        });
        const findQuery = likesProduct? {$pull: {likes: user._id}} : {$push: {likes: user._id}};
        await ProductModel.updateOne({_id: productId}, findQuery);
        let message;
        if(!likesProduct){
            if(dislikesProduct) await ProductModel.updateOne({_id: productId}, {$pull: {dislikes: user._id}});
            message = "پسندیدن محصول با موفقیت انجام شد"
        } else {
            message = "پسندیدن محصول لغو شد"
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const LikeCommentOfBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString},
        commentId: {type: GraphQLString}
    },
    resolve: async(_, args, context) =>  {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId, commentId } = args;
        await checkExistBlog(blogId);
        await checkExistCommentOfBlog(commentId);
        const likesOfComment = await BlogModel.findOne({
            _id: blogId,
            "comments._id": commentId,
            "comments.likes": user._id
        });
        const dislikesOfComment = await BlogModel.findOne({
            _id: blogId,
            "comments._id": commentId,
            "comments.dislikes": user._id
        });
        const findQuery = likesOfComment? {$pull: {"comments.$.likes": user._id}} : {$push: {"comments.$.likes": user._id}}
        console.log(findQuery);
        await BlogModel.updateOne({_id: blogId, "comments._id": commentId}, findQuery);
        let message;
        if(!likesOfComment){
            if(dislikesOfComment) await BlogModel.updateOne({_id: blogId, "comments._id": commentId}, {$pull: {"comments.$.dislikes": user._id}})
            message = "پسندیدن نظر برای مقاله انجام شد"
        } else {
            message = "پسندیدن نظر برای مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const LikeCommentOfNews = {
    type: ResponseType,
    args: {
        newsId: {type: GraphQLString},
        commentId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { newsId, commentId } = args;
        await checkExistNews(newsId);
        await checkExistCommentOfNews(commentId);
        const likesOfComment = await NewsModel.findOne({
            _id: newsId,
            "comment._id": commentId,
            "comment.likes": user._id
        });
        const dislikesOfComment = await NewsModel.findOne({
            _id: newsId,
            "comment._id": commentId,
            "comment.dislikes": user._id
        });
        const findQuery = likesOfComment? {$pull: {"comment.$.likes": user._id}} : {$push: {"comment.$.likes": user._id}};
        await NewsModel.updateOne({_id: newsId, "comment._id": commentId}, findQuery);
        let message;
        if(!likesOfComment){
            if(dislikesOfComment) await NewsModel.updateOne({_id: newsId, "comment._id": commentId}, {$pull: {"comment.$.dislikes": user._id}});
            message = "پسندیدن نظر برای مقاله انجام شد"
        } else {
            message = "پسندیدن نظر برای مقاله لغو شد"
        }
        return {
            statusCode: httpStatus.OK,
            data: {
                message
            }
        }
    }
};
const LikeCommentOfProduct = {
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
        const likesOfComment = await ProductModel.findOne({
            _id: productId,
            "comments._id": commentId,
            "comments.likes": user._id
        });
        const dislikesOfComment = await ProductModel.findOne({
            _id: productId,
            "comments._id": commentId,
            "comments.dislikes": user._id
        });
        const findQuery = likesOfComment? {$pull: {"comments.$.likes": user._id}} : {$push: {"comments.$.likes": user._id}};
        await ProductModel.updateOne({_id: productId, "comments._id": commentId}, findQuery);
        let message;
        if(!likesOfComment){
            if(dislikesOfComment) await ProductsModel.updateOne({_id: productId, "comments._id": commentId}, {$pull: {"comments.$.dislikes": user._id}});
            message = "پسندیدن نظر برای محصول انجام شد"
        } else {
            message = "پسندیدن نظر برای محصول لغو شد"
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
    LikeBlog,
    likeNews,
    likeProduct,
    LikeCommentOfBlog,
    LikeCommentOfNews,
    LikeCommentOfProduct
}