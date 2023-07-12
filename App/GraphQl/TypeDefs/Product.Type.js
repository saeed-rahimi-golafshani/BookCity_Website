const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CategoryType } = require("./Category.Type");
const { SubCategoryType } = require("./Subcategory.Type");
const { ProducerType, UserType } = require("./Public.Type");
const { CommentType } = require("./Comment.Type");
const { QuestionType } = require("./Question.Type");

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        en_title: {type: GraphQLString},
        introduction: {type: GraphQLString},
        expert_Check: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imagesUrl: {type: new GraphQLList(GraphQLString)},
        image_refrence: {type: GraphQLString},
        image_refrenceUrl: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: CategoryType},
        subcategory: {type: SubCategoryType},
        main_price: {type: GraphQLInt},
        price: {type: GraphQLInt},
        discount: {type: GraphQLInt},
        count: {type: GraphQLInt},
        description: {type: GraphQLString},
        seller: {type: GraphQLString},
        producer: {type: ProducerType},
        active: {type: GraphQLString},
        comments: {type: new GraphQLList(CommentType)},
        questions: {type: new GraphQLList(QuestionType)},
        likes: {type: new GraphQLList(UserType)},
        dislikes: {type: new GraphQLList(UserType)},
        bookmarks: {type: new GraphQLList(UserType)}
    }
});

module.exports = {
    ProductType
}