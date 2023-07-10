const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryType } = require("../TypeDefs/Category.Type");
const { CategoryModel } = require("../../Models/Category.Model")

const ListOfCategory = {
    type: new GraphQLList(CategoryType),
    resolve: async() => {
        return await CategoryModel.find({});
    }
};
const ListofCategoryById = {
    type: new GraphQLList(CategoryType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { id } = args;
        const category = await CategoryModel.find({_id: id})
        return category
    }
};
const ListOfCategoryBySidebar = {
    type: new GraphQLList(CategoryType),
    args: {
        catSidebar: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { catSidebar } = args;
        const resault = await CategoryModel.find({category_sidebar: catSidebar});
        return resault
    }
}

module.exports = {
    ListOfCategory,
    ListofCategoryById,
    ListOfCategoryBySidebar
}