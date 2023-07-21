import express from "express"
import bodyparser from "body-parser"
import axios from "axios"
import  'dotenv/config'

const app=express();
const port =process.env.PORT||8000

// const appid=process.env.apikey


app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))


app.get("/", async (req, res) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=${apikey}`);
      const result =response.data;
      const temp=result.main.temp;
      const description=result.weather[0].description;
      const iconvalue=result.weather[0].icon;
      const iconurl="https://openweathermap.org/img/wn/"+iconvalue+"@2x.png";
      
      res.render("index.ejs",{
        temperature:temp,
        weatherdata:description,
        
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });

  
app.post("/weather", async (req, res) => {
    try {
      const cityname=req.body.cityname
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${appid}`);
      const result =response.data;
      const temp=result.main.temp;
      const description=result.weather[0].description;
      const iconvalue=result.weather[0].icon;
      const iconurl="https://openweathermap.org/img/wn/"+iconvalue+"@2x.png";
    
      
      res.render("index.ejs",{
        temperature:temp,
        weatherdata:description,
       
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });
  



app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})



