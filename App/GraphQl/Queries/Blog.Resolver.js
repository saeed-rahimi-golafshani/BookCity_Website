const { GraphQLList } = require("graphql");
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

module.exports = {
    BlogResolver
}