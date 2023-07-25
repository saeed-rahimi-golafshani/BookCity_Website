const { verifyAccessTokenInGraphQL } = require("../../Http/Middleware/verifyAccessToken");
const { UserModel } = require("../../Models/User.Model");
const { AnyType } = require("../TypeDefs/Public.Type");
const { getBasketOfUser } = require("../Utills");

const getUserBasket = {
    type: AnyType,
    resolve: async(_, args, context)=> {
        const { req } = context;
        const user = await verifyAccessTokenInGraphQL(req);
        const userDetail = await getBasketOfUser(user._id);
        return userDetail
    }
}

module.exports = {
    getUserBasket
}