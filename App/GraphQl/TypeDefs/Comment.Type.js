const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInputObjectType } = require("graphql");
const { UserType } = require("./Public.Type");

const CommentType = new GraphQLObjectType({
    name: "Commenttype",
    fields: {
        _id: {type: GraphQLString},
        user: {type: UserType},
        title: {type: GraphQLString},
        negative_points: {type: new GraphQLList(GraphQLString)},
        positive_points: {type: new GraphQLList(GraphQLString)},
        comment: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        likes: {type: UserType},
        dislikes: {type: UserType},
        createdAt: {type: GraphQLString},
        score: {type: GraphQLString}
    }
});

module.exports = {
    CommentType
}