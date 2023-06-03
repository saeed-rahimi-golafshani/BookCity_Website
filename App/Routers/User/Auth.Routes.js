const { UserAuthentication } = require("../../Http/Controller/User/Auth.Controller");
const { verifyAccessToken } = require("../../Http/Middleware/verifyAccessToken");
const router = require("express").Router();

router.post("/login", UserAuthentication.loginWithOtp);
router.post("/check-login", UserAuthentication.checkLogin)

module.exports = {
    userApiAuthenticationRoutes: router
}