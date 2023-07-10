const { GraphQLObjectType, GraphQLString } = require("graphql");
const { CategoryType } = require("./Category.Type");

const SubCategoryType = new GraphQLObjectType({
    name: "subcategoryType",
    fields: {
        title: {type: GraphQLString}
        category: {type: CategoryType},
        image: {type: GraphQLString},
        imageUrl: {type: GraphQLString}
    }
});

module.exports = {
    SubCategoryType
}