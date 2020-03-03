const keyWeather = "198e7cd123c38028748d31ffb347ffa7";
const weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=denver&appid=" + keyWeather;



$.ajax({
    url: weatherQueryURL,
    method: "GET"
})
.then(function(responseWeather){

    console.log(responseWeather);
});

const keyLocalEvents = "9zmr4wz97r5l4jenh85ap1enclfnccwf";
const localQueryURL = "https://www.triposo.com/api/20190906/location.json?id=Denver&account=U9R2XMW3&token=" + keyLocalEvents;

$.ajax({
    url: localQueryURL,
    method: "GET"
})
.then(function(responseLocal){

    console.log(responseLocal);
})