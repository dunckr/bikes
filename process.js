var Converter=require("csvtojson").core.Converter;
var fs=require("fs");

var csvFileName="./app/mock/strava-stats-for-2013.csv";

var fileStream=fs.createReadStream(csvFileName);
//new converter instance
var csvConverter=new Converter({constructResult:true});

//end_parsed will be emitted once parsing finished
csvConverter.on("end_parsed",function(jsonObj){
    fs.writeFile('./app/mock/strava-stats.json', JSON.stringify(jsonObj), function (err) {
      console.log('It\'s saved!');
    });
});

//read from file
fileStream.pipe(csvConverter);
