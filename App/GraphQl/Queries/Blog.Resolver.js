const { GraphQLList, GraphQLString } = require("graphql");
const { BlogType } = require("../TypeDefs/Blog.Type");
const { BlogModel } = require("../../Models/Blog.Model")

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async () => {
        const listOfblog = await BlogModel.find({}).populate([
            {path: "author"}
        ])
        return listOfblog
    } 
}
const ListOfBlogById = {
    type: new GraphQLList(BlogType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { id } = args;
        const resault = await BlogModel.find({_id: id}).populate([
            {path: "author"},
            {path: "category"}
        ])
        return resault
    }
}
const listofBlogByCategory = {
    
}

module.exports = {
    BlogResolver,
    ListOfBlogById
}