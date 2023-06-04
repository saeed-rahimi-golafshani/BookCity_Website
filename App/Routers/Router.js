const redisCkient = require("../Utills/Init.Redis");
const { AdminApiRoutes } = require("./Admin/Admin.Routes");
const { IndexApi } = require("./Api/Home.Routes");
const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
const router = require("express").Router();
(async () =>{
    await redisCkient.set("key", "value");
    const value = redisCkient.get("key");
    console.log(value);
})();

router.use("/", IndexApi);
router.use("/users", userApiAuthenticationRoutes);
router.use("/admin", AdminApiRoutes)

module.exports = {
    AllRoutes: router
}