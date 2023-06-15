const { CategoryAttributeController } = require("../../Http/Controller/Admin/Product/CategoryAttribute.Controller");

const router = require("express").Router();

    router.post("/create", CategoryAttributeController.createCategoryAttribute);
    router.get("/list", CategoryAttributeController.listOfCategoryAttribute);
    router.get("/list/:id", CategoryAttributeController.listOfCategoryAttributeById);
    router.patch("/update/:id", CategoryAttributeController.updateCategoryAttribute);
module.exports = {
    CategoryAttributeApiRoutes: router
}