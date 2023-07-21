const { checkPermission } = require("../../Http/Middleware/Permission.guard");
const { PERMISSIONS } = require("../../Utills/Constants");
const { AdminApiBlogRoutes } = require("./Blog.Routes");
const { CategoryApiRoutes } = require("./Category.Routes");
const { CategoryAttributeApiRoutes } = require("./CategoryAttribute.Routes");
const { CategoryNavbarApiRoutes } = require("./CategoryNavbar.Routes");
const { CategorySilebarApiRoutes } = require("./CategorySidebar.Routes");
const { contactApiRoutes } = require("./Contact.Routes");
const { NewsApiRoutes } = require("./News.Routes");
const { NewsCategoryApiRoutes } = require("./NewsCategory.Routes");
const { PermissionApiRoutes } = require("./Permission.Routes");
const { ProducerApiRoutes } = require("./Producer.Routes");
const { ProductApiRoutes } = require("./Product.Routes");
const { ProductCatAttributeApiRoutes } = require("./ProductCatAttribute.Routes");
const { RoleApiRoutes } = require("./Role.Routers");
const { SubcategoryApiRoutes } = require("./SubCategory.Routes");
const router = require("express").Router();

router.use("/category_sidebar", checkPermission([PERMISSIONS.ADMIN]), CategorySilebarApiRoutes)
router.use("/category_navbar", checkPermission([PERMISSIONS.ADMIN]), CategoryNavbarApiRoutes); 
router.use("/category", checkPermission([PERMISSIONS.ADMIN]), CategoryApiRoutes);
router.use("/subcategory", checkPermission([PERMISSIONS.ADMIN]), SubcategoryApiRoutes);
router.use("/blog", checkPermission([PERMISSIONS.ADMIN]), AdminApiBlogRoutes);
router.use("/producer", checkPermission([PERMISSIONS.ADMIN]), ProducerApiRoutes);
router.use("/product", checkPermission([PERMISSIONS.ADMIN]), ProductApiRoutes);
router.use("/category_Attribute", checkPermission([PERMISSIONS.ADMIN]), CategoryAttributeApiRoutes);
router.use("/product_category_attribute", checkPermission([PERMISSIONS.ADMIN]), ProductCatAttributeApiRoutes);
router.use("/newscategory", checkPermission([PERMISSIONS.ADMIN]), NewsCategoryApiRoutes);
router.use("/news", checkPermission([PERMISSIONS.ADMIN]), NewsApiRoutes);
router.use("/contact", checkPermission([PERMISSIONS.ADMIN]), contactApiRoutes);
router.use("/permission", checkPermission([PERMISSIONS.ADMIN]), PermissionApiRoutes);
router.use("/role", checkPermission([PERMISSIONS.ADMIN]), RoleApiRoutes)

module.exports = {
    AdminApiRoutes: router
}