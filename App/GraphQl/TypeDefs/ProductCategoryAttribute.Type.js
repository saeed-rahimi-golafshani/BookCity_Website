const { GraphQLObjectType, GraphQLString } = require("graphql");
const { ProductType } = require("./Product.Type");
const { CategoryAttributeType } = require("./Category_Attribute..Type");

const ProductCategoryAttributeType = new GraphQLObjectType({
    name: "productCategoryAttributeType",
    fields: {
        _id: {type: GraphQLString},
        product: {type: ProductType},
        category_attribute: {type: CategoryAttributeType},
        value: {type: GraphQLString}
    }
});

module.exports = {
    ProductCategoryAttributeType
}