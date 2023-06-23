const { ContactController } = require("../../Http/Controller/Admin/Contact/Contact.Controller");

const router = require("express").Router();

    router.post("/create", ContactController.createContact);
    router.get("/list", ContactController.listOfContact);
    router.patch("/update/:id", ContactController.updateOfContact);
    router.delete("/delete/:id", ContactController.deleteofcontact);

module.exports = {
    contactApiRoutes: router
}