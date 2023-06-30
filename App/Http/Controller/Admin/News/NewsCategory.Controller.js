const createHttpError = require("http-errors");
const { NewsCategoryModel } = require("../../../../Models/NewsCategory.Model");
const { createNewsCategorySchema } = require("../../../Validations/News.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { checkExistOfModelById, copyObject } = require("../../../../Utills/Function");

class NewsCategoryController extends Controller{
  async createNewsCategory(req, res, next){
    try {
      const requestBody = await createNewsCategorySchema.validateAsync(req.body);
      const { title, category_navbar } = requestBody;
      const resault = await NewsCategoryModel.create({title, category_navbar})
      if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.CREATED).json({
        statusCode: httpStatus.CREATED,
        data: {
          message: "دسته بندی خبر با موفقیت ثبت شد"
        }
      });      
    } catch (error) {
      next(error)
    }
  };
  async listOfNewsCategory(req, res, next){
    try {
      const newsCategories = await NewsCategoryModel.find({}, {createdAt: 0, updatedAt: 0, __v: 0}).populate([
        {path: "category_navbar", select: {title: 1}}
      ]).sort({_id: -1});
      if(!newsCategories) throw new createHttpError.NotFound("دسته بندی خبری یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          newsCategories
        }
      })
    } catch (error) {
      next(error)
    }
  }
  async listOfNewsCategoryById(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, NewsCategoryModel);
      const newsCategory = await NewsCategoryModel.findOne({_id: checkId._id}, {createdAt: 0, updatedAt: 0, __v: 0}).populate([
        {path: "category_navbar", select: {title: 1}}
      ]);
      if(!newsCategory) throw new createHttpError.NotFound("دسته بندی خبری یافت نشد");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          newsCategory
        }
      });
    } catch (error) {
      next(error)
    }
  }
  async updateNewsCategory(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, NewsCategoryModel);
      const dataBody = copyObject(req.body);
      const nullishdata = ["", " ", 0, NaN, null, undefined];
      Object.keys(dataBody).forEach(key => {
        if(nullishdata.includes(dataBody[key])) delete dataBody[key]
      });
      const updateresault = await NewsCategoryModel.updateOne({_id: checkId._id}, {$set: dataBody});
      if(updateresault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "دسته بندی خبری با موفقیت به روز رسانی شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
  async deleteNewsCategory(req, res, next){
    try {
      const { id } = req.params;
      const checkId = await checkExistOfModelById(id, NewsCategoryModel);
      const deleteResault = await NewsCategoryModel.deleteOne({_id: checkId._id});
      if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
      return res.status(httpStatus.OK).json({
        statusCode: httpStatus.OK,
        data: {
          message: "دسته بندی خبری با موفقیت حذف شد"
        }
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  NewsCategoryController: new NewsCategoryController()
}