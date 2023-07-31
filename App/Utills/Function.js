const { realpath } = require("fs");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const path = require("path");
const moment = require("moment-jalali")

function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000)
};
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
};
function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/")));
    } else {
        return []
    }
};
function deleteInvalidPropertyObject(data = {}, balckList = []){
    const nullishData = ["", " ", 0, NaN, null, undefined];
    Object.keys(data).forEach(key => {
        if(balckList.includes(key)) delete data[key];
        if(nullishData.includes(data[key])) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key];
    })
    return data
};
function discountOfPrice(main_price, discount){
    const price = main_price - ((main_price * discount) / 100);
    return price
};
async function checkExistOfModelById(id, modelSchema){
    if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر یافت نشد");
    const model = await modelSchema.findById(id);
    if(!model) throw new createHttpError.NotFound("گزینه مورد نظر یافت نشد");
    return model
};
function deleteFileInPath(fileAddress){ 
    if(fileAddress){
     const pathFile = path.join(__dirname, "..", "..", "Public", fileAddress);
     if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
};
function invoiceNumberGenerator(){ // سازنده شماره فاکتور
    return moment().format("jYYYYjMMjDDHHmmssSS") + String(process.hrtime()[1]).padStart(9, 0)
}

module.exports = {
    randomNumberFiveDigitsGenerator,
    copyObject,
    listOfImagesFromRequest,
    deleteInvalidPropertyObject,
    discountOfPrice,
    checkExistOfModelById,
    deleteFileInPath,
    invoiceNumberGenerator
}