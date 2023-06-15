const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { CategoryApiRoutes } = require("./Category.Routes");
const { CategoryAttributeApiRoutes } = require("./CategoryAttribute.Routes");
const { ProducerApiRoutes } = require("./Producer.Routes");
const { ProductApiRoutes } = require("./Product.Routes");
const { ProductCatAttributeApiRoutes } = require("./ProductCatAttribute.Routes");
const router = require("express").Router();

router.use("/category", CategoryApiRoutes);
router.use("/blog", AdminApiBlogRoutes);
router.use("/producer", ProducerApiRoutes);
router.use("/product", ProductApiRoutes);
router.use("/category_Attribute", CategoryAttributeApiRoutes);
router.use("/product_category_attribute", ProductCatAttributeApiRoutes);

module.exports = {
    AdminApiRoutes: router
}