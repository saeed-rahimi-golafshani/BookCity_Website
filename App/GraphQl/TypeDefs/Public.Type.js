const { GraphQLObjectType, GraphQLString } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "userType",
    fields: {
        _id: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString}
    }
});

module.exports = {
    UserType
}