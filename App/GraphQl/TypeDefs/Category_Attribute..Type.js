const { GraphQLObjectType, GraphQLString } = require("graphql");
const { CategoryType } = require("./Category.Type");

const CategoryAttributeType = new GraphQLObjectType({
    name: "categoryAttributeType",
    fields: {
        _id: {type: GraphQLString}, 
        category: {type: CategoryType},
        label: {type: GraphQLString}
    }
});

module.exports = {
    CategoryAttributeType
}