const { GraphQLList, GraphQLString } = require("graphql");
const { NewsType } = require("../TypeDefs/News.Type");
const { NewsModel } = require("../../Models/News.Model");
const { checkExistNews, checkExistNewsByCategoryId, checkExistNewsCategoryById } = require("../Utills");
const { NewsCategoryType } = require("../TypeDefs/News_Category.Type");
const { NewsCategoryModel } = require("../../Models/NewsCategory.Model");

const ListOfNews = {
    type: new GraphQLList(NewsType),
    resolve: async() => {
        const news = await NewsModel.find({}).populate([
            {path: "newscategory"}
        ]);
        return news
    }
};
const ListOfNewsById = {
    type: new GraphQLList(NewsType),
    args: {
        newsId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { newsId } = args;
        await checkExistNews(newsId);
        const news = await NewsModel.find({_id: newsId}).populate([
            {path: "newscategory"}
        ]);
        return news
    }
};
const ListOfNewsByCategory = {
    type: new GraphQLList(NewsType),
    args: {
        categoryId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { categoryId } = args;
        await checkExistNewsByCategoryId(categoryId);
        const news = await NewsModel.find({newscategory: categoryId}).populate([
            {path: "newscategory"}
        ]);
        return news
    }
};
const ListOfCategoryNews = {
    type: new GraphQLList(NewsCategoryType),
    resolve: async() => {
        const categoryOfNews = await NewsCategoryModel.find({}).populate([
            {path: "category_navbar"}
        ]);
        return categoryOfNews;
    }
};
const ListOfCategoryNewsById = {
    type: new GraphQLList(NewsCategoryType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { id } = args;
        await checkExistNewsCategoryById(id);
        const newsCategory = await NewsCategoryModel.find({_id: id}).populate([
            {path: "category_navbar"}
        ]);
        return newsCategory        
    }
}

module.exports = {
    ListOfNews,
    ListOfNewsById,
    ListOfNewsByCategory,
    ListOfCategoryNews,
    ListOfCategoryNewsById
}