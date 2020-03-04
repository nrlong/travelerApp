//build weather information

const key= "198e7cd123c38028748d31ffb347ffa7";
// const weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ search +"&appid=" + keyWeather;

$(".btn").click(function () {
    let search = $(this).prev().val()
    const weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ search +"&appid=" + key;

$.ajax({
    url: weatherQueryURL,
    method: "GET"
})
.then(function(responseWeather){

    console.log(responseWeather);
});
});

//build local events information
const localQueryURL = "https://www.triposo.com/api/20190906/location.json?id=Denver&account=U9R2XMW3&token=" + key;

$.ajax({
    url: localQueryURL,
    method: "GET"
})
.then(function(responseLocal){

    console.log(responseLocal);
})