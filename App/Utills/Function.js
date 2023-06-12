const path = require("path");

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
}
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
}
function discountOfPrice(main_price, discount){
    const price = main_price - ((main_price * discount) / 100);
    return price
}


module.exports = {
    randomNumberFiveDigitsGenerator,
    copyObject,
    listOfImagesFromRequest,
    deleteInvalidPropertyObject,
    discountOfPrice
}