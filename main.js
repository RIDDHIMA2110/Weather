const url="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apikey="4d0c7a733a065b013036d333d54c9dd5";
let btn=document.querySelector("#search-btn");
btn.addEventListener("click",()=>{
    let city= document.querySelector("#city").value;
    console.log(city);
    async function checkWeather(){
        const response= await fetch(url+`${city}&appid=${apikey}`);
        let data=await response.json();
        console.log(data);
    }
    checkWeather();
});
