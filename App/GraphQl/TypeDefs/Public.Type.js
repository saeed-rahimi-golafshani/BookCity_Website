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
const ProducerType = new GraphQLObjectType({
    name: "producerType",
    fields: {
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    }
})

module.exports = {
    UserType,
    AnyType,
    ProducerType
}