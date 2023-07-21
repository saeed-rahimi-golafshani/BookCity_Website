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
        listOfProductCategoryAttributeByProId: ListOfProductCategoryAttributeByProId
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
        LikeCommentOfProduct
    }
});
const GraphQlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

module.exports = {
    GraphQlSchema
}