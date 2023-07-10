const { GraphQLList } = require("graphql");
const { ContactType } = require("../TypeDefs/Contact.Type");
const { ContactModel } = require("../../Models/Contact.Model");

const ListOfContact = {
    type: new GraphQLList(ContactType),
    resolve: async() => {
        return await ContactModel.find({});
    }
}

module.exports = {
    ListOfContact
}