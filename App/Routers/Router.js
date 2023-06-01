const HomeController = require("../Http/Controller/Api/Home.Controller");
const { IndexApi } = require("./Api/Home.Routes");
const router = require("express").Router();

router.use("/", IndexApi);

module.exports = {
    AllRoutes: router
}