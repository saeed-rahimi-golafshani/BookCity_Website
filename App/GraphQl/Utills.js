const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { BlogModel } = require("../Models/Blog.Model");
const { NewsModel } = require("../Models/News.Model");
const { ProductModel } = require("../Models/Products.Model");
const { UserModel } = require("../Models/User.Model");
const { NewsCategoryModel } = require("../Models/NewsCategory.Model");

function parseObject(valueNode) {
    const value = Object.create(null);
    valueNode.fields.forEach(field => {
        value[field.name.value] = parseValueNode(field.value)
    })
    return value
};
function parseValueNode(valueNode) {
    switch (valueNode.kind) {
        case Kind.STRING:
        case Kind.BOOLEAN:
            return valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT:
            return parseObject(valueNode.value)
        case Kind.LIST:
            return valueNode.values.map(parseValueNode)
        default:
            return null;
    }
};
function parseLiteral(valueNode){
    switch(valueNode.kind) {
        case Kind.STRING:
            return valueNode.value.charAt(0) === '{'? JSON.parse(valueNode.value): valueNode.value
        case Kind.INT:
        case Kind.FLOAT:
            return Number(valueNode.value)
        case Kind.OBJECT: 
                
    }
};
function toObject(value){
    if(typeof value === 'object'){
        return value
    }
    if(typeof value === "string" && value.charAt(0) === "{"){
        return JSON.parse(value)
    }
    return null
};
async function checkExistBlog(blogid){
    if(!mongoose.isValidObjectId(blogid)) throw new createHttpError.BadRequest("ساختار شناسه وارد شده اشتباه است");
    const blog = await BlogModel.findById(blogid);
    if(!blog) throw new createHttpError.NotFound("مقاله ای یافت نشد");
    return blog;
};
async function checkExistNews(newsid){
    if(!mongoose.isValidObjectId(newsid)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const news = await NewsModel.findById(newsid);
    if(!news) throw new createHttpError.NotFound("خبر مورد نظر یافت نشد");
    return news
};
async function checkExistNewsByCategoryId(catId){
    if(!mongoose.isValidObjectId(catId)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const news = await NewsModel.find({newscategory: catId})
    if(!news) throw new createHttpError.NotFound("خبر مورد نظر یافت نشد");
    return news
};
async function checkExistNewsCategoryById(Id){
    if(!mongoose.isValidObjectId(Id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const newsCategory = await NewsCategoryModel.findById(id);
    if(!newsCategory) throw new createHttpError.NotFound("دسته بندی اخبار مورد نظر یافت نشد");
    return newsCategory
};
async function checkExistProduct(proId){
    if(!mongoose.isValidObjectId(proId)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const product = await ProductModel.findById(proId);
    if(!product) throw new createHttpError.NotFound("محصول مورد نظر یافت نشد");
    return product;
};
async function checkExistCommentOfBlog(commentId){
    if(!mongoose.isValidObjectId(commentId)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const comment = await BlogModel.findOne({"comments._id": commentId});
    if(!comment) throw new createHttpError.NotFound("در این مقاله کامنتی یافت نشد");
    return comment
};
async function checkExistCommentOfNews(commentId){
    if(!mongoose.isValidObjectId(commentId)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const comment = await NewsModel.findOne({"comment._id": commentId});
    if(!comment) throw new createHttpError.NotFound("در این خبر کامنتی یافت نشد");
    return comment
};
async function checkExistCommentOfProduct(commentId){
    if(!mongoose.isValidObjectId(commentId)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const comment = await ProductModel.findOne({"comment._id": commentId});
    if(!comment) throw new createHttpError.NotFound("در این محصول کامنتی یافت نشد");
    return comment
}
async function getBasketOfUser(userId){
    const userDetail = await UserModel.aggregate([
        {
            $match: {_id: userId}
        },
        {
            $project: {basket:1}
        },
        {
            $lookup: {
                from: "products",
                localField: "basket.products.productId",
                foreignField: "_id",
                as: "productDetail"
            }
        },
        {
            $addFields: {
                "productDetail": {
                    $function: {
                        body: function(productDetail, products) {
                            return productDetail.map(function(product){
                                const count = products.find(item => item.productId.valueOf() == product._id.valueOf()).count;
                                return {
                                    ...product,
                                    basketCount: count,
                                    totalPrice: count * product.price,
                                    benfit: (product.main_price * product.discount) / 100
                                }
                            })
                        },
                        args: ["$productDetail", "$basket.products"],
                        lang: "js"
                    }
                }
            }
        },
        {
            $project: {basket: 0}
        }
    ]);
    return userDetail
}

module.exports = {
    parseLiteral,
    toObject,
    checkExistBlog,
    checkExistNews,
    checkExistNewsByCategoryId,
    checkExistProduct,
    checkExistCommentOfBlog,
    checkExistCommentOfNews,
    checkExistCommentOfProduct,
    getBasketOfUser,
    checkExistNewsCategoryById
}
