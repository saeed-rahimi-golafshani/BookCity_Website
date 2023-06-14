const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { listOfImagesFromRequest, deleteInvalidPropertyObject } = require("../../../../Utills/Function");
const { createBlogSchema } = require("../../../Validations/Blog.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { copyObject } = require("../../../../Utills/Function");
const blogBlackList = {
    COMMENTS: "comments",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKES: "bookmarkes",
    VIEW: "view"
}
Object.freeze(blogBlackList);

class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const requestBody = await createBlogSchema.validateAsync(req.body);
            const {title, short_text, text, tags, category, source } = requestBody;
            await this.checkExistBlogBytitle(title); 
            const images = listOfImagesFromRequest(req.files.images || [], requestBody.fileUploadPath)
            req.body.image_refrence = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const image_refrence = req.body.image_refrence;
            console.log(req.files);
            console.log(req.query);
            const author = req.user._id;
            const blog = await BlogModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                source,
                image_refrence,
                images,
                author
            });
            if(!blog) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "مقاله با موفقیت ثبت شد"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async listOfBlog(req, res, next){
        try {
            const { search } = req.query;
            let blogs;
            if(search){
                blogs = await BlogModel.findOne({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                }).populate([
                    {path: "category"}
                ])
            } else {
                blogs = await BlogModel.find({}).populate([
                    {path: "category", select: {title: 1}},
                    {path: "author", select: {firstname: 1, lastname: 1}}
                ]);
            }
            if(!blogs) throw new createHttpError.NotFound("مقاله ای یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blogs
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listofBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.checkExistBlogById(id);
            const resault = await BlogModel.findOne({_id: blog._id}).populate([
                {path: "category", select: {title: 1}},
                {path: "author", select: {firstname: 1, lastname: 1}}
            ]);
            if(!resault) throw new createHttpError.NotFound("مقاله ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blog: resault
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req, res, next){
        const { id } = req.params;
        const blog = await this.checkExistBlogById(id);
        const databody = copyObject(req.body);
        if(databody.fileUploadPath && databody.filename){
            databody.images = listOfImagesFromRequest(req?.files?.images, databody.fileUploadPath);
            databody.image_refrence = path.join(databody.fileUploadPath, databody.filename).replace(/\\/g, "/");
        }
        let blackFeildList = Object.values(blogBlackList);
        deleteInvalidPropertyObject(databody, blackFeildList);
        const updateResault = await BlogModel.updateOne({_id: blog._id}, {$set: databody});
        if(!updateResault) throw new createHttpError.InternalServerError("خطای سروری");
        return res.status(httpStatus.OK).json({
            statusCode: httpStatus.OK,
            data: {
                message: "به روز رسانی با موفقسیت انجام شد"
            }
        });
    }
    async removeBlogById(req, res, next){
        try {
            const { id } = req.params;
            const blog = await this.checkExistBlogById(id);
            const deleteResault = await BlogModel.deleteOne({_id: blog._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "مقاله با موفقیت حذف شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async checkExistBlogBytitle(title){ 
        const blog = await BlogModel.findOne({title});
        if(blog) throw new createHttpError.NotFound("این مقاله از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return blog
    }
    async checkExistBlogById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است")
        const blog = await BlogModel.findById(id);
        if(!blog) throw new createHttpError.NotFound("مقاله ای یافت نشد");
        return blog
    } 
}

module.exports = {
    BlogController: new BlogController()
}