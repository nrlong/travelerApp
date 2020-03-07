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

                
                let currentCity = $("#currentCity");
                let card = $("<div>").attr("class","card");
                let cardBody = $("<div>").attr("class","card-body").attr("id","localAttractions");
                let cardTitle = $("<h5>").attr("class","card-title eventCard").text(cityName);
                let cardSub = $("<h6>").attr("class","card-subtitle mb-2 text-muted eventCardSub").text(cityParent);
                let cardDescription = $("<p>").attr("class","card-text eventCardText").text(citySnip);
                let link1 = $("<a>").attr("href", responseInfo.attribution[0].url).text(responseInfo.attribution[0].source_id);
                
                currentCity.append(card);
                card.append(cardBody);
                cardBody.append(cardTitle, cardSub, cardDescription, link1);
                

                console.log(citySnip);
                console.log(cityCountry);
                console.log(cityParent)
                console.log(cityName);

                console.log(responseLocal);
            })

    });

})