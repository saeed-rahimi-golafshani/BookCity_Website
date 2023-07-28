const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { NewsCategoryType } = require("./News_Category.Type");
const { CommentType } = require("./Comment.Type");
const { UserType } = require("./Public.Type");

const NewsType = new GraphQLObjectType({
    name: "newsType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image_refrence: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        tags: {type: new GraphQLList(GraphQLString)},
        newscategory: {type: new GraphQLList(NewsCategoryType)},
        source: {type: new GraphQLList(GraphQLString)},
        time_range: {type: GraphQLString},
        comment: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        bookmarks: {type: new GraphQLList(UserType)},
        view: {type: new GraphQLList(UserType)}
    }
});

module.exports = {
    NewsType
}