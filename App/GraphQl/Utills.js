const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { BlogModel } = require("../Models/Blog.Model");
const { NewsModel } = require("../Models/News.Model");
const { ProductModel } = require("../Models/Products.Model")

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
async function checkExistProduct(proId){
    if(!mongoose.isValidObjectId(proId)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
    const product = await ProductModel.findById(proId);
    if(!product) throw new createHttpError.NotFound("محصول مورد نظر یافت نشد");
    return product;
};

module.exports = {
    parseLiteral,
    toObject,
    checkExistBlog,
    checkExistNews,
    checkExistProduct
}
