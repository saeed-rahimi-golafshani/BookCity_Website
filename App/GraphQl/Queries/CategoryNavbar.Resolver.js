const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryNavbarType } = require("../TypeDefs/CategoryNavbar.Type");
const { CategoryNavbarModel } = require("../../Models/Category_Navbar.Model");

const ListOfCategoryNavbar = {
    type: new GraphQLList(CategoryNavbarType),
    resolve: async() => {
        return await CategoryNavbarModel.find({});
    }
};
const ListOfcategoryNavbarById = {
    type: new GraphQLList(CategoryNavbarType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { id } = args;
        const CategoryNavbar = await CategoryNavbarModel.find({_id: id});
        return CategoryNavbar;
    }
}

module.exports = {
    ListOfCategoryNavbar,
    ListOfcategoryNavbarById
}