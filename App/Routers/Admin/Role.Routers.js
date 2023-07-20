const { RoleController } = require("../../Http/Controller/Admin/Rbac/Role.Controller");
const { stringToArray } = require("../../Http/Middleware/stringToArray");
const router = require("express").Router();

router.post("/create", stringToArray("permissions"), RoleController.createRole);
router.get("/list", RoleController.listOfRole);
router.get("/list/:id", RoleController.listOfRoleById);
router.patch("/update/:id", stringToArray("permissions"), RoleController.updateOfRole);
router.delete("/remove/:id", RoleController.deleteOfRole);

module.exports = {
    RoleApiRoutes: router
}