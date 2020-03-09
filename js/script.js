$(document).ready(function () {
  //keypress-enter
  
    $("#keypress").keypress(function(event) { 
	
        if (event.keyCode === 13) { 
            event.preventDefault();
           $(".searchBtn").click();
        } 
    });
    
    //search function

    $(".searchBtn").click(function(event){
        event.preventDefault();
        let search = $(".form-control").val()
        let searchFirstChar = search.slice(0,1);
        let firstCharCap = searchFirstChar.toUpperCase();
        let searchRest = search.slice(1, search.length);
        $("#events").empty();


        searchFinal = firstCharCap + searchRest;
        localSearch();
        poi();

    })  
            
        function localSearch () {   


        //build local events information
        const localKey = "9zmr4wz97r5l4jenh85ap1enclfnccwf"
        const localQueryURL = "https://www.triposo.com/api/20190906/location.json?id=" + searchFinal + "&account=U9R2XMW3&token=" + localKey;

        $.ajax({
                url: localQueryURL,
                method: "GET"
            })
            .then(function (responseLocal) {

                let responseInfo = responseLocal.results[0];

                let cityName = responseInfo.name;
                let cityParent = responseInfo.parent_id;
                let cityCountry = responseInfo.country_id;
                let citySnip = responseInfo.snippet;

                lat = responseInfo.coordinates.latitude;
                lon = responseInfo.coordinates.longitude;

                console.log(lon, lat);

                //city information build
                let currentCity = $("#currentCity");
                let card = $("<div>").attr("class","card");
                let cardBody = $("<div>").attr("class","card-body").attr("id","localAttractions");
                let cardTitle = $("<h5>").attr("class","card-title cityCard").text(cityName);
                let cardSub = $("<h6>").attr("class","card-subtitle mb-2 text-muted cityCardSub").text(cityCountry);
                let cardDescription = $("<p>").attr("class","card-text cityCardText").text(citySnip);
                let link1 = $("<a>").attr("href", responseInfo.attribution[0].url).text(responseInfo.attribution[0].source_id);
                
                currentCity.prepend(card);
                card.append(cardBody);
                cardBody.append(cardTitle, cardSub, cardDescription, link1);
                

                console.log(citySnip);
                console.log(cityCountry);
                console.log(cityParent)
                console.log(cityName);

                console.log(responseLocal);

                localHighlights();
            })
            //local highlights (nightlife).  requires long and lat.  resason for embeded function.
            function localHighlights(){
                const localKey = "9zmr4wz97r5l4jenh85ap1enclfnccwf"
                const localHighlightsURL = "https://www.triposo.com/api/20190906/local_highlights.json?latitude=" + lat + "&longitude="+ lon +"&account=U9R2XMW3&token=" + localKey;
    
                $.ajax({
                    url: localHighlightsURL,
                    method: "GET"
                })
                .then(function(responseLocalHighlights){
                    console.log(responseLocalHighlights.results[0])

                    for (let i=0; i < 8; i++){

                    let poiResponse = responseLocalHighlights.results[0];

                    let poiHouse = $("<div>").attr("class","card").attr("style", "width: 18rem;");
                    let poiBody = $("<div>").attr("class","card-body").attr("id", "pointsOfInterest");
                    poiHouse.append(poiBody);

                    let poiTitle = $("<h5>").attr("class","card-title poiCard");
                    poiTitle.text(poiResponse.pois[i].name);

                    let poiSub = $("<h6>").attr("class", "card-subtitle mb-2 text-muted poiCardSub");
                    poiSub.text(poiResponse.pois[i].location_id);

                    let poiText = $("<p>").attr("class", "card-text poiCardText");
                    poiText.text(poiResponse.pois[i].snippet);

                    let poiImage = $("<img>").attr("src", poiResponse.pois[i].images[0].sizes.thumbnail.url);

                    // let poiMapLink = $("<a>").attr("href", poiResponse.pois[0].attribution[1].url);
                    // poiMapLink.text("Street Map");
                    // poiBody.append(poiMapLink);

                    // let poiWiki = $("<a>").attr("href", poiResponse.pois[0].attribution[2].url);
                    // poiWiki.text("      Info");
                    // poiBody.append(poiWiki);

                    poiBody.append(poiTitle, poiSub,poiImage, poiText);

                    let poiDrop = $("#events");
                    poiDrop.append(poiHouse);
                    
                    // let attraction = $(".eventCard");
                    // attraction.text(responseLocal.pois[0].name);
                    
                    // let location = $(".eventCardSub")
                    // location.text(responseLocal.pois[0].location_id);

                    // let description = $(".eventCardText");
                    // description.text(responseLocal.pois[0].snippet);

                    // let ticketLink = $(".eventLink");
                    // ticketLink.attr("href", responseLocal.pois[0].attribution[1].url).text("Open Street Map");

                    // let infoLink = $(".infoLink");
                    // infoLink.attr("href", responseLocal.pois[0].attribution[2].url).text(responseLocalHighlights.results[0].pois[0].attribution[2].source_id);
                    }
                })
            }

        } 
        //create points of interest call 
        function poi(){
            const localKey = "9zmr4wz97r5l4jenh85ap1enclfnccwf"
            const poiURL = "https://www.triposo.com/api/20190906/article.json?location_ids=" + searchFinal + "&account=U9R2XMW3&token=" + localKey;

            $.ajax({
                url: poiURL,
                method: "GET"
            })
            .then(function(responseArticle){
                console.log(responseArticle);
                
            })

        }

      
}   )