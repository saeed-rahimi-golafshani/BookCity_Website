const { GraphQLObjectType, GraphQLString, GraphQLScalarType, GraphQLBoolean } = require("graphql");
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
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    }
});
const AnswerType = new GraphQLObjectType({
    name: "answerType",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        opentocomment: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString}
    }
});
const ResponseType = new GraphQLObjectType({
    name: "ResponseType",
    fields: {
        statusCode: {type: GraphQLString},
        data: {type: AnyType}
    }
});

module.exports = {
    UserType,
    AnyType,
    ProducerType,
    AnswerType,
    ResponseType
}