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

router.use("/category_sidebar", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), CategorySilebarApiRoutes)
router.use("/category_navbar", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), CategoryNavbarApiRoutes); 
router.use("/category", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), CategoryApiRoutes);
router.use("/subcategory", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), SubcategoryApiRoutes);
router.use("/blog", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), AdminApiBlogRoutes);
router.use("/producer", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), ProducerApiRoutes);
router.use("/product", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), ProductApiRoutes);
router.use("/category_Attribute", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), CategoryAttributeApiRoutes);
router.use("/product_category_attribute", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), ProductCatAttributeApiRoutes);
router.use("/newscategory", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), NewsCategoryApiRoutes);
router.use("/news", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), NewsApiRoutes);
router.use("/contact", checkPermission([PERMISSIONS.ADMIN, PERMISSIONS.SUPERADMIN]), contactApiRoutes);
router.use("/permission", checkPermission([PERMISSIONS.SUPERADMIN]), PermissionApiRoutes);
router.use("/role", checkPermission([PERMISSIONS.SUPERADMIN]), RoleApiRoutes)

module.exports = {
    AdminApiRoutes: router
}