$(document).ready(function () {

  //keypress-enter
  
    $(".btn").keypress(function(event) { 
	
        if (event.keyCode === 13) { 
            event.preventDefault();
            $(".btn").click(); 
        } 
    });

    //build weather information

    const key = "198e7cd123c38028748d31ffb347ffa7";

    $(".searchBtn").click(function () {
        let search = $(".form-control").val()

        const weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + key;
        $.ajax({
                url: weatherQueryURL,
                method: "GET"
        })
            .then(function (responseWeather) {


                console.log(responseWeather);
            });             

        //build local events information
        const localKey = "9zmr4wz97r5l4jenh85ap1enclfnccwf"
        const localQueryURL = "https://www.triposo.com/api/20190906/location.json?id=" + search + "&account=U9R2XMW3&token=" + localKey;

        $.ajax({
                url: localQueryURL,
                method: "GET"
            })
            .then(function (responseLocal) {

                let responseInfo = responseLocal.results[0];

                let cityName = responseInfo.id;
                let cityParent = responseInfo.parent_id;
                let cityCountry = responseInfo.country_id;
                let citySnip = responseInfo.snippet;

                console.log(citySnip);
                console.log(cityCountry);
                console.log(cityParent)
                console.log(cityName);

                console.log(responseLocal);
            })

    });

})