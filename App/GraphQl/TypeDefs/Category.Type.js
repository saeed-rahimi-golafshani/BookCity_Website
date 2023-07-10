const { GraphQLObjectType, GraphQLString } = require("graphql");
const { CategorySidebarType } = require("./CategorySidbar");
const { AnyType } = require("./Public.Type");

const CategoryType = new GraphQLObjectType({
    name: "categoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        category_sidebar: {type: CategorySidebarType},
        children: {type: AnyType}
    }
});

module.exports = {
    CategoryType
}