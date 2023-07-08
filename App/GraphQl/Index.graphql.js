const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver, ListOfBlogById } = require("./Queries/Blog.Resolver");
const { listOfCategoryNavbar } = require("./Queries/CategoryNavbar.Resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        listOfBlogById: ListOfBlogById,
        listOfCategoryNavbar: listOfCategoryNavbar,


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