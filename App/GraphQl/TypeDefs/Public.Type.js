const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "userType",
    fields: {
        _id: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString}
    }
});
const CategoryNavbarType = new GraphQLObjectType({
    name: "CategoryNavbarType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        icon: {type: GraphQLString}
    }
});

module.exports = {
    UserType,
    CategoryNavbarType
}