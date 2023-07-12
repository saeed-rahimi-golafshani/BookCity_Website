const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql")
const { UserType, AnswerType } = require("./Public.Type")

const QuestionType = new GraphQLObjectType({
   name: "questionType",
   fields: {
    _id: {type: GraphQLString},
    user: {type: UserType},
    title: {type: GraphQLString},
    comment: {type: GraphQLString},
    show: {type: GraphQLBoolean},
    openToComment: {type: GraphQLBoolean},
    likes: {type: UserType},
    dislikes: {type: UserType},
    answers: {type: new GraphQLList(AnswerType)},
    createdAt: {type: GraphQLString}
   }
});

module.exports = {
    QuestionType
}
