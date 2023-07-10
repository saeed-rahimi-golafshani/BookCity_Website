const { GraphQLObjectType, GraphQLString, GraphQLScalarType } = require("graphql");
const { toObject, parseLiteral } = require("../Utills");

const UserType = new GraphQLObjectType({
    name: "userType",
    fields: {
        _id: {type: GraphQLString},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString}
    }
});
const AnyType = new GraphQLScalarType({
    name: "AnyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral
});

module.exports = {
    UserType,
    AnyType
}