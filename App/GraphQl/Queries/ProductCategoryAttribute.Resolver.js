const { GraphQLList, GraphQLString } = require("graphql");
const { ProductCategoryAttributeType } = require("../TypeDefs/ProductCategoryAttribute.Type");
const { productCategoryAttributeModel } = require("../../Models/Product_Category_Attribute.Model");

const ListOfProductCategoryAttribute = {
    type: new GraphQLList(ProductCategoryAttributeType),
    resolve: async() => {
        return await productCategoryAttributeModel.find({}).populate([
            {path: "product"},
            {path: "category_attribute"}
        ]);
    }
};
const ListOfProductCategoryAttributeByProId = {
    type: new GraphQLList(ProductCategoryAttributeType),
    args: {
        proId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { proId } = args;
        const productCategoryAttribute = await productCategoryAttributeModel.find({product: proId}).populate([
            {path: "product"},
            {path: "category_attribute"}
        ]);
        return productCategoryAttribute
    }
};


module.exports = {
    ListOfProductCategoryAttribute,
    ListOfProductCategoryAttributeByProId
}