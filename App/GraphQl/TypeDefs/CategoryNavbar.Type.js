const { GraphQLObjectType, GraphQLString } = require("graphql");

const CategoryNavbarType = new GraphQLObjectType({
    name: "categoryNavbarType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        icon: {type: GraphQLString},
        iconUrl: {type: GraphQLString}
    }
});

module.exports = {
    CategoryNavbarType
}