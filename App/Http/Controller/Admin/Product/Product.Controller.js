const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../Models/Products.Model");
const { createProductSchema } = require("../../../Validations/Product.Schema");
const Controller = require("../../Controller");
const { listOfImagesFromRequest } = require("../../../../Utills/Function");
const path = require("path");

class ProductController extends Controller{
    async createProduct(req, res, next){
        try {
            const requestBody = await createProductSchema.validateAsync(req.body);
            const {title, introduction, expert_Check, tags, category, main_price, price, discount, count} = requestBody;
            const product = await this.checkExistProductByTitle(title);
            const images = listOfImagesFromRequest(req.files.images || [], requestBody.fileUploadpath);
            const image_refrence = path.join(requestBody.fileUploadpath, requestBody.filename).replace(/\\/g,"/");
            

            
        } catch (error) {
            next(error)
        }
    }
    async checkExistProductByTitle(title){
        const product = await ProductModel.findOne({title});
        if(product) throw new createHttpError.BadRequest("این محصول از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب کنید");
        return product
    }
}

module.exports = {
    ProductController: new ProductController()
}
