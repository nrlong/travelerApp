$(document).ready(function () {

  //keypress-enter
  
    $("#keypress").keypress(function(event) { 
	
        if (event.keyCode === 13) { 
            event.preventDefault();
           $(".searchBtn").click();
        } 
    });
    
    //build weather information

    const key = "198e7cd123c38028748d31ffb347ffa7";

    $(".searchBtn").click(function () {
        let search = $(".form-control").val()
        let searchFirstChar = search.slice(0,1);
        let firstCharCap = searchFirstChar.toUpperCase();
        let searchRest = search.slice(1, search.length);
        
        let searchFinal = firstCharCap + searchRest


        const weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchFinal + "&appid=" + key;
        $.ajax({
                url: weatherQueryURL,
                method: "GET"
        })
            .then(function (responseWeather) {

                let tempF = (response.main.temp - 273.15) * 1.80 + 32;

                getCurrentConditions(responseWeather);
            console.log(responseWeather)
        });
        
        function getCurrentConditions (responseWeather) {
            // get the temperature and convert to fahrenheit 
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            tempF = Math.floor(tempF);
        
            $('#currentCity').empty();
        
            // get and set the content 
            const card = $("<div>").addClass("card");
            const cardBody = $("<div>").addClass("card-body");
            const city = $("<h4>").addClass("card-title").text(response.name);
            const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
            const temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
            const humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
            const wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
            const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        
            // add to page
            city.append(cityDate, image);
            cardBody.append(city, temperature, humidity, wind);
            card.append(cardBody);
            $("#currentCity").append(card);

           console.log(getCurrentConditions(responseWeather));
          }
            
            


        //build local events information
        const localKey = "9zmr4wz97r5l4jenh85ap1enclfnccwf"
        const localQueryURL = "https://www.triposo.com/api/20190906/location.json?id=" + searchFinal + "&account=U9R2XMW3&token=" + localKey;

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