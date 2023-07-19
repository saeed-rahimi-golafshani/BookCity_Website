const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryAttributeType } = require("../TypeDefs/Category_Attribute..Type");
const { CategoryAttributeModel } = require("../../Models/Category_Attribute.model")

const listOfCategoryAttribute = {
    type: new GraphQLList(CategoryAttributeType),
    resolve: async() => {
        return await CategoryAttributeModel.find({}).populate([
        {path: "category"}
        ]);
    }
};
const listOfCategoryAttributeByCategoryId = {
    type: new GraphQLList(CategoryAttributeType),
    args: {
        catId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { catId } = args;
        const categoryAttribute = await CategoryAttributeModel.find({category: catId});
        return categoryAttribute
    }
}

module.exports = {
    listOfCategoryAttribute,
    listOfCategoryAttributeByCategoryId
}