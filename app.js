const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const https = require("https"); //Native node module (already available in standard node library) so no need to install it using npm


app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){
  var cityName = req.body.cityName;
  const apiKey = "2139c7423ebb39a59edd460ebce9138b";
  const city = cityName;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;
  https.get(url,function(response){
    response.on("data",function (data) {
      const weatherData = JSON.parse(data);
      res.write("<p>The current temperature in " + cityName + " is " + weatherData.main.temp + " degrees Celsius");
      res.write("<h1>There will be " + weatherData.weather[0].description + "</h1>");
      var imageUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
      res.write("<img src=" + imageUrl+ ">");
      res.send();
    })
  })

})

//process.env.PORT: a port is assignned by heroku on the go
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running at port 3000");
})
