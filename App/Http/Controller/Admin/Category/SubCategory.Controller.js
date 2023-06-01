const Controller = require("../../Controller");

class SubCategoryController extends Controller{
    async createSubCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SubCategoryController: new SubCategoryController()
}