const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../TypeDefs/Product.Type");
const { ProductModel } = require("../../Models/Products.Model");

const ListOfProduct = {
    type: new GraphQLList(ProductType),
    resolve: async() => {
        return await ProductModel.find({}).populate([
            {path: "category"},
            {path: "subcategory"},
            {path: "producer"}
        ])
    }
};
const ListOfProductById = {
    type: new GraphQLList(ProductType),
    args: {
        id: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { id } = args;
        const product = await ProductModel.find({_id: id}).populate([
            {path: "category"},
            {path: "subcategory"},
            {path: "producer"}
            
        ]);
        return product
    }
};
const ListOfProductByCategory = {
    type: new GraphQLList(ProductType),
    args: {
        categoryId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { categoryId } = args;
        const product = await ProductModel.find({category: categoryId}).populate([
            {path: "category"},
            {path: "subcategory"},
            {path: "producer"}
            
        ]);
        return product;
    }
};
const ListOfProductBySubcategory = {
    type: new GraphQLList(ProductType),
    args: {
        subcategoryId: {type: GraphQLString}
    },
    resolve: async(_, args) => {
        const { subcategoryId } = args;
        const product = await ProductModel.find({subcategory: subcategoryId}).populate([
            {path: "category"},
            {path: "subcategory"},
            {path: "producer"}
            
        ]);
        return product
    }
}

module.exports = {
    ListOfProduct,
    ListOfProductById,
    ListOfProductByCategory,
    ListOfProductBySubcategory
}