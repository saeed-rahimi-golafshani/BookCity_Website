const { GraphQLString } = require("graphql");
const { ResponseType } = require("../TypeDefs/Public.Type");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { checkExistBlog, checkExistProduct, checkExistNews } = require("../Utills");
const { BlogModel } = require("../../Models/Blog.Model");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { NewsModel } = require("../../Models/News.Model");
const { ProductModel } = require("../../Models/Products.Model");

const BookmarksOfBlog = {
    type: ResponseType,
    args: {
        blogId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { blogId } = args;
        await checkExistBlog(blogId);
        let bookmarksBlog = await BlogModel.findOne({
            _id: blogId,
            bookmarks: user._id
        }) ;
        const findQuery = bookmarksBlog? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await BlogModel.updateOne({_id: blogId}, findQuery);
        let message;
        if(!bookmarksBlog){
            message = "مقاله به لیست علاقه مند های شما اضافه شد"
        }else {
            message = "مقاله از لیست علاقه مندی های شما حذقف شد"
        }     
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const BookmarksOfNews = {
    type: ResponseType,
    args: {
        newsId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { newsId } = args;
        await checkExistNews(newsId);
        let bookmarksNews = await NewsModel.findOne({
            _id: newsId,
            bookmarks: user._id
        });
        const findQuery = bookmarksNews? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await NewsModel.updateOne({_id: newsId}, findQuery);
        let message;
        if(!bookmarksNews){
            message = "خبر به لیست علاقه مند های شما اضافه شد"
        }else {
            message = "خبر از لیست علاقه مندی های شما حذقف شد"
        }     
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
};
const BookmarksOfProduct = {
    type: ResponseType,
    args: {
        productId: {type: GraphQLString}
    },
    resolve: async(_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const { productId } = args;
        await checkExistProduct(productId);
        let bookmarksProduct = await ProductModel.findOne({
            _id: productId,
            bookmarks: user._id
        });
        const findQuery = bookmarksProduct? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}};
        await ProductModel.updateOne({_id: productId}, findQuery);
        let message; 
        if(!bookmarksProduct){
               message = "محصول به لیست علاقه مند های شما اضافه شد"
        }else {
            message = "محصول از لیست علاقه مندی های شما حذقف شد"
        }     
        return {
            statusCode: httpStatus.CREATED,
            data: {
                message
            }
        }
    }
}

module.exports = {
    BookmarksOfBlog,
    BookmarksOfNews,
    BookmarksOfProduct
}