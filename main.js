import { url, apikey } from "./utils.js";
let btn=document.querySelector("#search-btn");
const ui ={
    extraContent: document.querySelector(".extra-content"),
    image: document.querySelector(".card img"),
    temp: document.querySelector(".card h1"),
    citytag: document.querySelector(".card h3"),
    humidity: document.querySelector(".humidity h4"),
    wind: document.querySelector(".wind-speed h4"),
    error: document.querySelector(".error")
};
console.log(ui);
const printData= (data) =>{
    ui.extraContent.style.display="flex";
    const icon=data.weather[0].icon;
    ui.image.src=`https://openweathermap.org/img/wn/${icon}@2x.png`;
    ui.image.title=data.weather[0].description;
    ui.temp.innerHTML=data.main.temp.toFixed(0)+"°C";
    ui.citytag.innerHTML=data.name;
    ui.humidity.innerHTML=data.main.humidity + "%";
    ui.wind.innerHTML=(data.wind.speed*3.6).toFixed(0)+" km/h";
}
const resetUI=()=>{
    ui.extraContent.style.display="none";
    ui.image.src="";
    ui.image.title="";
    ui.temp.innerHTML="";
    ui.citytag.innerHTML="";
    ui.humidity.innerHTML="";
    ui.wind.innerHTML="";
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
        resetUI();
        ui.error.style.display="block";
        ui.error.innerHTML=(e.message || "Network or API issue") + " !!";
    }
}
document.querySelector("#city").addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        btn.click();
    }
});
btn.addEventListener("click",async()=>{
    btn.disabled=true;
    let city= document.querySelector("#city").value;
    if(city.trim()===""){
        resetUI();
        ui.error.style.display="block";
        ui.error.innerHTML="Enter Valid City Name!!";
        btn.disabled=false;
        return;
    }
    ui.error.style.display="none";  
    ui.error.innerHTML="";
    await checkWeather(city);
    btn.disabled=false;
    
});
