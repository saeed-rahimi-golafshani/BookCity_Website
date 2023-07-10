const { GraphQLObjectType, GraphQLString } = require("graphql");
const { CategoryNavbarType } = require("./CategoryNavbar.Type");

const CategorySidebarType = new GraphQLObjectType({
    name: "categorySidbarType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        icon: {type: GraphQLString},
        category_navbar: {type: CategoryNavbarType},
        iconUrl: {type: GraphQLString}
    }
});

module.exports = {
    CategorySidebarType
}