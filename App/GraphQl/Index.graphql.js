const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver, ListOfBlogById, ListofBlogByCategory } = require("./Queries/Blog.Resolver");
const { ListOfCategoryNavbar, ListOfcategoryNavbarById } = require("./Queries/CategoryNavbar.Resolver");
const { ListOfCategorySidebar, ListOfCategorySidebarById, ListOfcategorySidebarByCatNav } = require("./Queries/CategorySidebar.Resolver");
const { ListOfCategory, ListofCategoryById, ListOfCategoryBySidebar } = require("./Queries/Category.Resolver");
const { ListOfContact } = require("./Queries/Contact.Resolver");

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
    }
});
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {

    }
});
const GraphQlSchema = new GraphQLSchema({
    query: RootQuery,
    // mutation: RootMutation
});

module.exports = {
    GraphQlSchema
}