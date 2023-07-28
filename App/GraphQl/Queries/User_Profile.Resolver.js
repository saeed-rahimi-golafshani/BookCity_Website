const { GraphQLList } = require("graphql");
const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { AnyType } = require("../TypeDefs/Public.Type");
const { getBasketOfUser } = require("../Utills");
const { ProductType } = require("../TypeDefs/Product.Type");
const { ProductModel } = require("../../Models/Products.Model");
const { BlogType } = require("../TypeDefs/Blog.Type");
const { BlogModel } = require("../../Models/Blog.Model");

const getUserBasket = {
    type: AnyType,
    resolve: async(_, args, context)=> {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const userDetail = await getBasketOfUser(user._id);
        return userDetail
    }
};
const getUserBookmarksProduct = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const product = await ProductModel.find({bookmarks: user._id}).populate([
            {path: "category"},
            {path: "subcategory"},
            {path: "producer"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"},
            {path: "comments.user"},
            {path: "questions.user"},
            {path: "questions.answers.user"},
        ])
        return product
    }
};
const getUserBookmarksBlog = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const blog = await BlogModel.find({bookmarks: user._id}).populate([
            {path: "author"},
            {path: "category"},
            {path: "comments.user"},
            {path: "likes"},
            {path: "dislikes"},
            {path: "bookmarks"}
        ]);
        return blog
    }
};
const getUserBookmarksNews = {
}

module.exports = {
    getUserBasket,
    getUserBookmarksProduct,
    getUserBookmarksBlog
}