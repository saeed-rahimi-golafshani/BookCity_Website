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
const ListofBlogByCategory = {
    type: new GraphQLList(BlogType),
    args: {
        categoryId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { categoryId } = args;
        const blog = await BlogModel.find({category: categoryId}).populate([
            {path: "category"}
        ]);
        return blog
    }
}

module.exports = {
    BlogResolver,
    ListOfBlogById,
    ListofBlogByCategory
}