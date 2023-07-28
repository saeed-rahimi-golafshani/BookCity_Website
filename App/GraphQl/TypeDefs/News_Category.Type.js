const { GraphQLObjectType, GraphQLString } = require("graphql");
const { CategoryNavbarType } = require("./CategoryNavbar.Type");

const NewsCategoryType = new GraphQLObjectType({
    name: "newsCategoryType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        category_navbar: {type: CategoryNavbarType}
    }
});

module.exports = {
    NewsCategoryType
}