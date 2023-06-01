const express = require("express");
const morgan = require("morgan");
const path = require("path");
const http = require("http");
const { default: mongoose } = require("mongoose");
const { AllRoutes } = require("./Routers/Router");
const createHttpError = require("http-errors");

module.exports = class Application {
    #app = express();
    #PORT;
    #DB_URL;
    constructor(PORT, DB_URL){
        this.#PORT = PORT;
        this.#DB_URL = DB_URL;
        this.configApplication();
        this.connectedToMongoDb();
        this.createRoutes();
        this.errorHandller();
        this.createServer();
    }
    configApplication() {
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}));
        //Loging 
        if(process.env.NODE_ENV=== "development"){
            this.#app.use(morgan("dev"));
        }
        // File Static 
        this.#app.use(express.static(path.join(__dirname, "..", "Public")));
    }
    connectedToMongoDb() {
        mongoose.set('strictQuery', 'false')
        mongoose.connect(this.#DB_URL, (error) => {
            if(!error) return console.log("Application is connected to mongoDb...");
            return console.log("Application is not connected to mongoDb...");
        })
    }
    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server running in ${process.env.NODE_ENV} mode on prot ${process.env.BASEURL}:${this.#PORT}`);
        })
    }
    createRoutes() {
        this.#app.use(AllRoutes)
    }
    errorHandller() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound("آدرس صفحه مورد نظر یافت نشد"));
        });
        this.#app.use((error, req, res, next) => {
            const serverError = createHttpError.InternalServerError;
            const statusCode = error?.status || serverError.status;
            const message = error?.message || serverError.message;
            return res.status(statusCode).send({
                error: {
                    statusCode,
                    message
                }
            })
        })
    }
}