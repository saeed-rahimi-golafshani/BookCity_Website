const Controller = require("../Controller");
const { loginWithOtpSchema, checkLoginSchema } = require("../../Validations/AuthSchema");
const { randomNumberFiveDigitsGenerator } = require("../../../Utills/Function");
const { UserModel } = require("../../../Models/User.Model");
const { ROLES } = require("../../../Utills/Constants");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { smsClient } = require("../../../Utills/Sms.Panel");
const { signAccessToken } = require("../../../Utills/Token");

class UserAuthentication extends Controller{
    async loginWithOtp(req, res, next){
        try {
            const requestBody = await loginWithOtpSchema.validateAsync(req.body);
            const { mobile } = requestBody;
            const code = randomNumberFiveDigitsGenerator();
            const resault = await this.saveUser(mobile, code);
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            // await smsClient(mobile, code)
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: `کد تایید برای شماره ${mobile} ارسال شد`,
                    code // باید حذف گردد
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile, code){
        let otp = {
            code,
            expiresIn: (new Date().getTime() + (process.env.OTP_EXPIRESIN))
        };
        const resault = await this.checkExistUser(mobile);
        if(resault){
            return await this.updateUser(mobile, {otp})
        }else {
            return !!(await UserModel.create({
                mobile,
                otp,
                roles: ROLES.BUYER
            }))
        }
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user
    }
    async updateUser(mobile, dataObj= {}){
        const nullishData = ["", " ", null, 0, NaN, undefined];
        Object.keys(dataObj).forEach(key => {
            if(nullishData.includes(dataObj[key])) delete dataObj[key]
        });
        const updateUser = await UserModel.updateOne({mobile}, {$set: dataObj})
        return !!updateUser.modifiedCount
    }
    async checkLogin(req, res, next){
        try {
            const requestBody = await checkLoginSchema.validateAsync(req.body);
            const { code, mobile } = requestBody;
            const user = await UserModel.findOne({mobile});
            if(!user) throw new createHttpError.NotFound("کاربر مورد نظر یافت نشد");
            if(user.otp.code != code) throw new createHttpError.Unauthorized("کد تایید ارسال شده صحیح نمی باشد");
            let now = Date.now()
            if(+user.otp.expiresIn < now ) throw new createHttpError.Unauthorized("کد تایید منقضی شده است");
            const accessToken = await signAccessToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken
                }
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserAuthentication: new UserAuthentication()
}