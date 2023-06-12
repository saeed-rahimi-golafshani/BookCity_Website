const { ProducerController } = require("../../Http/Controller/Admin/Product/Producer.Controller");

const router = require("express").Router();

    router.post("/create", ProducerController.createProducer);
    router.get("/list", ProducerController.listOfProducer);
    router.get("/list/:id", ProducerController.listOfProducerById);
    router.patch("/update/:id", ProducerController.updateProducer);
    router.delete("/delete/:id", ProducerController.deleteProducer);

module.exports = {
    ProducerApiRoutes: router
}