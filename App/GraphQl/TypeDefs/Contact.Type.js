const { GraphQLObjectType, GraphQLString } = require("graphql");

const ContactType = new GraphQLObjectType({
    name: "contactype",
    fields: {
        _id: {type: GraphQLString},
        phone: {type: GraphQLString},
        email: {type: GraphQLString},
        address: {type: GraphQLString},
        fax: {type: GraphQLString}

    }
});

module.exports = {
    ContactType
}