const { UserAuthentication } = require("../../Http/Controller/User/Auth.Controller");
const router = require("express").Router();

router.post("/login", UserAuthentication.loginWithOtp);

module.exports = {
    userApiAuthenticationRoutes: router
}