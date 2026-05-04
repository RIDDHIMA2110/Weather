import { url, apikey } from "./utils.js";
let btn=document.querySelector("#search-btn");
const printData= (data) =>{
    let extraContent=document.querySelector(".extra-content");
    extraContent.style.display="flex";
    let image=document.querySelector(".card img");
    const icon=data.weather[0].icon;
    image.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
    image.title=data.weather[0].description;
    let temp=document.querySelector(".card h1");
    temp.innerHTML=data.main.temp.toFixed(0)+"°C";
    let citytag=document.querySelector(".card h3");
    citytag.innerHTML=data.name;
    let humidity=document.querySelector(".humidity h4");
    humidity.innerHTML=data.main.humidity + "%";
    let wind=document.querySelector(".wind-speed h4");
    wind.innerHTML=(data.wind.speed*3.6).toFixed(0)+" km/h";
}
async function checkWeather(city){
    try{
        const response= await fetch(url+`${city}&appid=${apikey}`);
        let data=await response.json();
        if(data.cod !== 200){
            throw new Error(data.message);
        }
        printData(data);
    }
    catch(e){
       document.querySelector(".error").innerHTML=e.message || "Network or API issue";
    }
}
document.querySelector("#city").addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        btn.click();
    }
});
btn.addEventListener("click",()=>{
    btn.disabled=true;
    let city= document.querySelector("#city").value;
    if(city.trim()==""){
        document.querySelector(".error").innerHTML="Enter Valid City Name";
    }
    else{
        checkWeather(city);
    }
    btn.disabled=false;
});
