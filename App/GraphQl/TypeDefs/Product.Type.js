const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { CategoryType } = require("./Category.Type");
const { SubCategoryType } = require("./Subcategory.Type");
const { ProducerType } = require("./Public.Type");
const { CommentType } = require("./Comment.Type");

const ProductType = new GraphQLObjectType({
    name: "productType",
    fields: {
        title: {type: GraphQLString},
        en_title: {type: GraphQLString},
        introduction: {tye: GraphQLString},
        expert_Check: {type: GraphQLString},
        images: {type: new GraphQLList(GraphQLString)},
        imagesUrl: {type: new GraphQLList(GraphQLString)},
        image_refrence: {type: GraphQLString},
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
        comments: {type: CommentType},
        
    }
})