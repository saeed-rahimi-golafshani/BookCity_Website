
function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000)
};
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
};

module.exports = {
    randomNumberFiveDigitsGenerator,
    copyObject
}