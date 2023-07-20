const { PerminssionControlelr } = require("../../Http/Controller/Admin/Rbac/Permission.Controller");
const router = require("express").Router();

router.post("/create", PerminssionControlelr.createPermission);
router.get("/list", PerminssionControlelr.listOfPermission);
router.patch("/update/:id", PerminssionControlelr.updatePermission)
router.delete("/remove/:id", PerminssionControlelr.removePermission);

module.exports = {
    PermissionApiRoutes: router
}