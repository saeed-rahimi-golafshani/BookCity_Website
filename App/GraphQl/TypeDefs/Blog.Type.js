const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType } = require("./Public.Type");
const { CommentType } = require("./Comment.Type");
const { CategoryNavbarType } = require("./CategoryNavbar.Type");

const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: {
        _id: {type: GraphQLString},
        author: {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image_refrence: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imageURL: {type: new GraphQLList(GraphQLString)},
        imagerefrenceurl: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: new GraphQLList(CategoryNavbarType)},
        source: {type: new GraphQLList(GraphQLString)},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        bookmarks: {type: new GraphQLList(UserType)},
        view: {type: new GraphQLList(UserType)}
    }
});

module.exports = {
    BlogType
}