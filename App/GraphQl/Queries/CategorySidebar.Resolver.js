const { GraphQLList, GraphQLString } = require("graphql");
const { CategorySidebarType } = require("../TypeDefs/CategorySidbar");
const { CategorySidebarModel } = require("../../Models/Category_SideBar.Model")

const ListOfCategorySidebar = {
    type: new GraphQLList(CategorySidebarType),
    resolve: async() =>{
        return await CategorySidebarModel.find({});
    }
};
const ListOfCategorySidebarById = {
    type: new GraphQLList(CategorySidebarType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_,args) => {
        const { id } = args;
        const categorySidebar = await CategorySidebarModel.find({_id: id});
        return categorySidebar
    }
};
const ListOfcategorySidebarByCatNav = {
    type: new GraphQLList(CategorySidebarType),
    args: {
        catenav: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { catenav } = args;
        const categorySidebar = await CategorySidebarModel.find({category_navbar: catenav});
        return categorySidebar 
    } 
};

module.exports = {
    ListOfCategorySidebar,
    ListOfCategorySidebarById,
    ListOfcategorySidebarByCatNav
}