const express = require("express"); 
const https = require("https"); 
const bodyParser = require("body-parser"); 
const fs = require('fs');
const ejs = require('ejs');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/Public"))
app.set('view engine','ejs');


app.get("/", (req,res)=>{ 
    res.render("home");
});


app.post("/",(req,res)=>{
    let city = req.body.city;
    let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiKey = "e47c940df194cc9a4e6bed5f1169ffc1";
    let units = "metric";
    const url = endpoint+"q="+city+"&appid="+apiKey+"&units="+units;

    https.get(url,(respond)=>{
        respond.on('data',(data)=>{
          let weatherData = JSON.parse(data);
          console.log(weatherData);

          let temp = weatherData.main.temp;
          let feelsLike = weatherData.main.feels_like;
          let humidity = weatherData.main.humidity;
          let cityName = weatherData.name;
          let description = weatherData.weather[0].description;
          let icon = weatherData.weather[0].icon;
          let countryName = weatherData.sys.country;
          const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

          // res.write("The weather in "+cityName+" is "+ temp+ " &deg; Celcius.")
          
          res.render("result",{
            icon:imageURL,
            city:cityName,
            temp:temp,
            humidity:humidity,
            description:description,
            countryName:countryName,
            feelsLike:feelsLike
          });
      
        })
      })
});


app.listen(3000, () =>{
    console.log("Server is currently running on port 3000.")
});

