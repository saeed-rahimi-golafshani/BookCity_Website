const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql")
const { UserType } = require("./Public.Type")

const QuestionType = new GraphQLObjectType({
    user: {type: UserType},
    title: {type: GraphQLString},
    comment: {type: GraphQLString},
    show: {type: new GraphQLBoolean},
    openToComment: {type: new GraphQLBoolean},
    likes: {type: UserType},
    dislikes: {type: UserType},

})
