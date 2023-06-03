const jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");
const { UserModel } = require("../Models/User.Model");
const { ACCESS_Token_SECRETKEY } = require("./Constants");
const createHttpError = require("http-errors");

function signAccessToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findOne({_id: userId});
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "1d"
        };
        jwt.sign(payload, ACCESS_Token_SECRETKEY, option, (error, token) => {
            if(error) reject(createHttpError.InternalServerError("خطای سروری"));
            resolve(token)
        })
    })
};

module.exports = {
    signAccessToken
}