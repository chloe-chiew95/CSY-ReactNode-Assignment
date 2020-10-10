var express = require('express');
var router = express.Router();
const csvtojson = require('csvtojson');
const csvFilePath = (__dirname + '/../data.csv');

/* GET restaurant listing. */
router.get('/', function(req, res, next) {
    console.log("Loading data...");
    csvtojson()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        res.send(jsonObj);
    })
  console.log("Data loaded!");
});

module.exports = router;
