const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver, ListOfBlogById, ListofBlogByCategory } = require("./Queries/Blog.Resolver");
const { ListOfCategoryNavbar, ListOfcategoryNavbarById } = require("./Queries/CategoryNavbar.Resolver");
const { ListOfCategorySidebar, ListOfCategorySidebarById, ListOfcategorySidebarByCatNav } = require("./Queries/CategorySidebar.Resolver");
const { ListOfCategory, ListofCategoryById, ListOfCategoryBySidebar } = require("./Queries/Category.Resolver");
const { ListOfContact } = require("./Queries/Contact.Resolver");
const { ListOfProduct, ListOfProductById, ListOfProductByCategory, ListOfProductBySubcategory } = require("./Queries/Product.Resolver");
const { listOfCategoryAttribute, listOfCategoryAttributeByCategoryId } = require("./Queries/CategoryAttribute.Resolver");
const { ListOfProductCategoryAttribute, ListOfProductCategoryAttributeByProId } = require("./Queries/ProductCategoryAttribute.Resolver");
const { CreateCommentForBlog, CreateCommentForNews, CreateCommentForProduct } = require("./Mutations/Comment.Resolver");
const { LikeBlog, likeNews, likeProduct, LikeCommentOfBlog, LikeCommentOfNews, LikeCommentOfProduct } = require("./Mutations/Likes.Resolver");
const { DislikeOfNews, DislikesOfBlog, DislikesOfProduct, DislikesCommentsOfblog, DislikesCommentsOfNews, DislikesCommentsOfProduct } = require("./Mutations/Dislikes.Resolver");
const { BookmarksOfBlog, BookmarksOfNews, BookmarksOfProduct } = require("./Mutations/Bookmarks.Resolver");
const { QuestionsProduct } = require("./Mutations/Questions.Resolver");
const { createProductToBasket, removeProductFromBasket } = require("./Mutations/Basket.Resolver");
const { getUserBasket, getUserBookmarksProduct, getUserBookmarksBlog, getUserBookmarksNews } = require("./Queries/User_Profile.Resolver");
const { ListOfNews, ListOfNewsById, ListOfNewsByCategory, ListOfCategoryNews, ListOfCategoryNewsById } = require("./Queries/News.Resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        // Blogs
        blogs: BlogResolver,
        listOfBlogById: ListOfBlogById,
        listofBlogByCategory: ListofBlogByCategory, 
        // categor navbar
        listOfCategoryNavbar: ListOfCategoryNavbar,
        listOfcategoryNavbarById: ListOfcategoryNavbarById,
        // category sidebar
        listOfCategorySidebar: ListOfCategorySidebar,
        listOfCategorySidebarById: ListOfCategorySidebarById,
        listOfcategorySidebarByCatNav: ListOfcategorySidebarByCatNav,
        // category
        listOfCategory: ListOfCategory,
        listofCategoryById: ListofCategoryById,
        listOfCategoryBySidebar: ListOfCategoryBySidebar,
        // Contact
        listOfContact: ListOfContact,
        // Product
        listOfProduct: ListOfProduct,
        listOfProductById: ListOfProductById,
        listOfProductByCategory: ListOfProductByCategory,
        listOfProductBySubcategory: ListOfProductBySubcategory,
        //CategoryAttribute
        listOfCategoryAttribute: listOfCategoryAttribute,
        listOfCategoryAttributeByCategoryId: listOfCategoryAttributeByCategoryId,
        // ProductCategoryAttribute
        listOfProductCategoryAttribute: ListOfProductCategoryAttribute,
        listOfProductCategoryAttributeByProId: ListOfProductCategoryAttributeByProId,
        // User_profile 
        getUserBasket,
        getUserBookmarksProduct,
        getUserBookmarksBlog,
        getUserBookmarksNews,
        // News && categoryNews
        listOfNews: ListOfNews,
        listOfNewsById: ListOfNewsById,
        listOfNewsByCategory: ListOfNewsByCategory,
        listOfCategoryNews: ListOfCategoryNews,
        listOfCategoryNewsById: ListOfCategoryNewsById
    }
});
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        // comments
        CreateCommentForBlog,
        CreateCommentForNews,
        CreateCommentForProduct,
        // Likes
        LikeBlog,
        likeNews,
        likeProduct,
        LikeCommentOfBlog,
        LikeCommentOfNews,
        LikeCommentOfProduct,
        // Dislikes 
        DislikesOfBlog, 
        DislikeOfNews,
        DislikesOfProduct,
        DislikesCommentsOfblog,
        DislikesCommentsOfNews,
        DislikesCommentsOfProduct,
        // Bookmarks
        BookmarksOfBlog,
        BookmarksOfNews,
        BookmarksOfProduct,
        // Questions
        QuestionsProduct,
        // basket
        createProductToBasket,
        removeProductFromBasket
    }
});
const GraphQlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    GraphQlSchema
}