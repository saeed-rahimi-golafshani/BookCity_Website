const { ProducerController } = require("../../Http/Controller/Admin/Product/Producer.Controller");

const router = require("express").Router();

    router.post("/create", ProducerController.createProducer);
    router.get("/list", ProducerController.listOfProducer)

module.exports = {
    ProducerApiRoutes: router
}