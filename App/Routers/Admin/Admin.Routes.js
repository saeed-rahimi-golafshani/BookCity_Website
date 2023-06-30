const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { CategoryApiRoutes } = require("./Category.Routes");
const { CategoryAttributeApiRoutes } = require("./CategoryAttribute.Routes");
const { CategoryNavbarApiRoutes } = require("./CategoryNavbar.Routes");
const { CategorySilebarApiRoutes } = require("./CategorySidebar.Routes");
const { contactApiRoutes } = require("./Contact.Routes");
const { NewsApiRoutes } = require("./News.Routes");
const { NewsCategoryApiRoutes } = require("./NewsCategory.Routes");
const { ProducerApiRoutes } = require("./Producer.Routes");
const { ProductApiRoutes } = require("./Product.Routes");
const { ProductCatAttributeApiRoutes } = require("./ProductCatAttribute.Routes");
const { SubcategoryApiRoutes } = require("./SubCategory.Routes");
const router = require("express").Router();

router.use("/category_sidebar", CategorySilebarApiRoutes)
router.use("/category_navbar", CategoryNavbarApiRoutes); 
router.use("/category", CategoryApiRoutes);
router.use("/subcategory", SubcategoryApiRoutes);
router.use("/blog", AdminApiBlogRoutes);
router.use("/producer", ProducerApiRoutes);
router.use("/product", ProductApiRoutes);
router.use("/category_Attribute", CategoryAttributeApiRoutes);
router.use("/product_category_attribute", ProductCatAttributeApiRoutes);
router.use("/newscategory", NewsCategoryApiRoutes);
router.use("/news", NewsApiRoutes);
router.use("/contact", contactApiRoutes);

module.exports = {
    AdminApiRoutes: router
}