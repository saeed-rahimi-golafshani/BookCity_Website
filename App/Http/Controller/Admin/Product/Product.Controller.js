const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../Models/Products.Model");
const { createProductSchema } = require("../../../Validations/Product.Schema");
const Controller = require("../../Controller");
const { listOfImagesFromRequest, discountOfPrice } = require("../../../../Utills/Function");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");

class ProductController extends Controller{
    async createProduct(req, res, next){
        try {
            const requestBody = await createProductSchema.validateAsync(req.body);
            const {title, introduction, expert_Check, tags, category, seller, description, producer, main_price, discount, count} = requestBody;
            await this.checkExistProductByTitle(title);
            
            const images = listOfImagesFromRequest(req?.files?.images || [], req.body.fileUploadPath);
            const image_refrence = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g,"/");
            const price = discountOfPrice(main_price, discount);
            const product = await ProductModel.create({
                title,
                introduction,
                expert_Check,
                tags,
                category,
                seller,
                description,
                producer,
                main_price,
                price,
                discount,
                count,
                images,
                image_refrence
            });
            if(!product) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "محصول با موفقیت ثبت گردید"
                }
            })            
        } catch (error) {
            next(error)
        }
    }
    async listOfProduct(req, res, next){
        try {
            let products;
            const { search } = req.query;
            if(search){
                products = await ProductModel.find({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                }).populate([
                    {path: "category", select: {title: 1}},
                    {path: "producer", select: {title: 1, description: 1}}
                ])
            }else{
                products = await ProductModel.find({}).populate([
                    {path: "category", select: {title: 1}},
                    {path: "producer", select: {title: 1, description: 1}}
                ])
            }
            if(!products) throw new createHttpError.NotFound("محصولی یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    products
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async listOfProductById(req, res, next){
        try {
            const { id } = req.params;
            await this.checkExistProductById(id);
            const resault = await ProductModel.findOne({_id: id}).populate([
                {path: "category", select: {title: 1}},
                {path: "producer", select: {title: 1, description: 1}}
            ]);
            if(!resault) throw new createHttpError.NotFound("محصولی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    product: resault
                }
            }) 
        } catch (error) {
            next(error)
        }
    }
    async checkExistProductByTitle(title){
        const product = await ProductModel.findOne({title});
        if(product) throw new createHttpError.BadRequest("این محصول از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return product
    }
    async checkExistProductById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر یافت نشد");
        const product = await ProductModel.findById(id);
        if(!product) throw new createHttpError.NotFound("محصولی یافت نشد");
        return product;
    }
}

module.exports = {
    ProductController: new ProductController()
}
