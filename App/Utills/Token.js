const jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");
const { UserModel } = require("../Models/User.Model");
const { ACCESS_Token_SECRETKEY } = require("./Constants");
const createHttpError = require("http-errors");
const { REFRESH_TOKEN_SECRETKEY } = require("./Constants");
const redisClient = require("./Init.Redis");

function signAccessToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findOne({_id: userId});
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "24h"
        };
        jwt.sign(payload, ACCESS_Token_SECRETKEY, option, (error, token) => {
            if(error) reject(createHttpError.InternalServerError("خطای سروری"));
            resolve(token)
        })
    })
};
function signRefreshToken(userId){
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findOne({_id: userId})
        const payload = {
            mobile: user.mobile
        };
        const option = {
            expiresIn: "1y"
        };
        jwt.sign(payload, REFRESH_TOKEN_SECRETKEY, option, async (err, token) => {
            if(err) reject(createHttpError.InternalServerError("خطای سروری"))
            await redisClient.SETEX(userId, (360*24*60*60), token);
            resolve(token);
        })
    })
}
function verifyRefreshToken(token){
    return new Promise(async (resolve, reject) =>{
        jwt.verify(token, REFRESH_TOKEN_SECRETKEY, async(err, payload) => {
            if(err) reject(createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید"));
            const { mobile } = payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0});
            if(!user) reject(createHttpError.NotFound("حساب کاربری یافت نشد"));
            const refreshToken = await redisClient.get(user?._id || "key_default");
            if(!refreshToken) reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری امکان پذیر نمیباشد، لطفا مجددا تلاش نمایید"));
            if(token === refreshToken) return resolve(mobile)
            reject(createHttpError.Unauthorized("ورود مجدد به حساب کاربری امکان پذیر نمیباشد، لطفا مجددا تلاش نمایید"));
        })
    })
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}