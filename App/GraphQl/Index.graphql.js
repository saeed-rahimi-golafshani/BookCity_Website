const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./Queries/Blog.Resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver
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