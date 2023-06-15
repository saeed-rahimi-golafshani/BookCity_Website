const { ProductCatAttributeController } = require("../../Http/Controller/Admin/Product/ProductCatAttribute.Controller");

const router = require("express").Router();

    router.post("/create", ProductCatAttributeController.createProductCatAttribute);
    router.get("/list", ProductCatAttributeController.listOfProductCatAttribute);

module.exports = {
    ProductCatAttributeApiRoutes: router
}