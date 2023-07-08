const { GraphQLList } = require("graphql");
const { CategoryNavbarType } = require("../TypeDefs/CategoryNavbar.Type");
const { CategoryNavbarModel } = require("../../Models/Category_Navbar.Model");

const listOfCategoryNavbar = {
    type: new GraphQLList(CategoryNavbarType),
    resolve: async() => {
        return await CategoryNavbarModel.find({});
    }
}

module.exports = {
    listOfCategoryNavbar
}