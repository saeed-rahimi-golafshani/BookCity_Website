const { IndexApi } = require("./Api/Home.Routes");
const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
const router = require("express").Router();

router.use("/", IndexApi);
router.use("/users", userApiAuthenticationRoutes)

module.exports = {
    AllRoutes: router
}