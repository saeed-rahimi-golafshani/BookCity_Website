const Controller = require("../../Controller");

class NewsCategoryController extends Controller{
    async createNewsCategory(req, res, next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    NewsCategoryController: new NewsCategoryController()
}