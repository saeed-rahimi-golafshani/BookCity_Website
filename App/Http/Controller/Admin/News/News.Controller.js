const createHttpError = require("http-errors");
const { NewsModel } = require("../../../../Models/News.Model");
const { listOfImagesFromRequest, copyObject, deleteInvalidPropertyObject } = require("../../../../Utills/Function");
const { createNewsSchema } = require("../../../Validations/News.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const blackListOfNews = {
    COMMENT: "comment",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    VIEW: "view"
};
Object.freeze(blackListOfNews);

class NewsController extends Controller{
    async createNews(req, res, next){
        try {
            const requestBody = await createNewsSchema.validateAsync(req.body);
            const {title, short_text, text, tags, newscategory, source, time_range} = requestBody;
            await this.checkExistNewsByTitle(title);
            req.body.image_refrence = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const image_refrence = req.body.image_refrence;
            const images = listOfImagesFromRequest(req?.files?.images || [], requestBody.fileUploadPath);
            const news = await NewsModel.create({
                title,
                short_text,
                text,
                tags,
                newscategory,
                source,
                time_range,
                image_refrence,
                images
            });
            if(!news) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "خبر با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfNews(req, res, next){
        try {
            let news;
            const { search } = req.query;
            if(search){
                news = await NewsModel.find({$text: {$search: search}}).populate([
                    {path: "newscategory"}
                ]);
            }else {
                news = await NewsModel.find({}).populate([
                    {path: "newscategory", select: {title: 1}}
                ]);
            }
            if(!news) throw new createHttpError.NotFound("خبری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    news
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async listOfNewsById(req, res, next){
        try {
            const { id } = req.params;
            const news = await this.checkExistNewsById(id);
            const listOfNews = await NewsModel.findOne({_id: news._id});
            if(!listOfNews) throw new createHttpError.NotFound("خبری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    news: listOfNews
                }
            });
            
        } catch (error) {
            next(error)
        }
    }
    async listOfNewsByCategory(req, res, next){
        try {
            const { catId } = req.params;
            const news = await NewsModel.find({category: catId}).populate([
                {path: "newscategory", select: {title: 1}}
            ]);
            if(!news) throw new createHttpError.NotFound("خبری یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    news
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async updateNews(req, res, next){
        try {
            const { id } = req.params;
            const news = await this.checkExistNewsById(id);
            const dataBody = copyObject(req.body);
            if(dataBody.fileUploadPath && dataBody.filename){
                dataBody.images = listOfImagesFromRequest(req?.files?.images, dataBody.fileUploadPath);
                dataBody.image_refrence = path.join(dataBody.fileUploadPath, dataBody.filename).replace(/\\/g, "/");
            };
            let blackList = Object.values(blackListOfNews);
            deleteInvalidPropertyObject(dataBody, blackList);
            const updateResault = await NewsModel.updateOne({_id: news._id}, {$set: dataBody});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            });

        } catch (error) {
            next(error)
        }
    }
    async deleteNews(req, res, next){
        try {
            const { id } = req.params;
            const news = await this.checkExistNewsById(id);
            const deleteResault = await NewsModel.deleteOne({_id: news._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "خبر با موفقیت حدف شد"
                }
            });
        } catch (error) { 
            next(error)
        }
    }
    async checkExistNewsByTitle(title){
        const news = await NewsModel.findOne({title});
        if(news) throw new createHttpError.BadRequest("عنوان خبر از قبل ثبت شده است، لطفا عنوان دیگری انتخاب کنید");
        return news
    }
    async checkExistNewsById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const news = await NewsModel.findById(id);
        if(!news) throw new createHttpError.NotFound("خبر مورد نظر یافت نشد");
        return news;
    }
}

module.exports = {
    NewsController: new NewsController()
}