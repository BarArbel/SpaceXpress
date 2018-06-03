function stage1() {
    var destinationCounter = 1;
    var tripForm1 = document.getElementById("tripForm1");
    var addForm1 = document.getElementById("addForm1");

    function createForm1Input() {
        var planetNameInput = document.createElement("input");
        var startDateInput = document.createElement("input");
        var endDateInput = document.createElement("input");
        planetNameInput.type = "text";
        planetNameInput.name = "planet" + destinationCounter;
        planetNameInput.placeholder = "Planet Name";
        planetNameInput.id = "planet" + destinationCounter;
        startDateInput.type = "date";
        startDateInput.name = "start" + destinationCounter;
        startDateInput.id = "start" + destinationCounter;
        endDateInput.type = "date";
        endDateInput.name = "end" + destinationCounter;
        endDateInput.id = "end" + destinationCounter;
        tripForm1.insertBefore(document.createElement("br"), addForm1);
        tripForm1.insertBefore(planetNameInput, addForm1);
        tripForm1.insertBefore(startDateInput, addForm1);
        tripForm1.insertBefore(endDateInput, addForm1);
        destinationCounter++;
    }

    addForm1.addEventListener("click", function() {createForm1Input();});
    createForm1Input();
}

function stage2() {
    var json_data = [];
    var attractionCounter = 0;
    var attractions = document.getElementById("attractions");
    var searchAttr = document.getElementById("attractionSearch");
    var alienFilter = document.getElementById("alienFilter");
    var gravityFilter = document.getElementById("gravityFilter");
    var timeFilter = document.getElementById("timeFilter");
    var aiFilter = document.getElementById("aiFilter");
    var elementsFilter = document.getElementById("elementsFilter");

    $.getJSON("data/MOCK_DATA.json", function (data) {
        console.log(data);
        json_data = data;
        for (var row of data) {
            var attraction = document.createElement("article");
            var attName = document.createElement("h6");
            attraction.className = "form-check-article";
            attraction.id = row.planet + "_" + row.name;
            attName.innerHTML = row.name;
            attraction.appendChild(attName);
            for (var i=1; i<=row.rating; i++){
                var attStar = document.createElement("i");
                attStar.className = "fas fa-star";
                attStar.style.color = "#ffffff";
                attraction.appendChild(attStar);
            }
            if (row.alien){
                var attAlien = document.createElement("i");
                attAlien.className = "fab fa-reddit-alien";
                attAlien.style.color = "#ffffff";
                attraction.appendChild(attAlien);
            }
            if (row.gravity){
                var attGravity = document.createElement("i");
                attGravity.className = "fab fa-grav";
                attGravity.style.color = "#ffffff";
                attraction.appendChild(attGravity);
            }
            if (row.timeflow){
                var attTime = document.createElement("i");
                attTime.className = "fas fa-clock";
                attTime.style.color = "#ffffff";
                attraction.appendChild(attTime);
            }
            if (row.ai){
                var attAi = document.createElement("i");
                attAi.className = "fas fa-robot";
                attAi.style.color = "#ffffff";
                attraction.appendChild(attAi);
            }
            if (row.elements){
                var attElements = document.createElement("i");
                attElements.className = "fab fa-ethereum";
                attElements.style.color = "#ffffff";
                attraction.appendChild(attElements);
            }
            attractions.appendChild(attraction);
            attractionCounter++;
        }
    });

    searchAttr.onkeyup = function attractionsByName() {
        var filter = searchAttr.value.toUpperCase();
        for(var i=0; i<attractionCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(attraction.getElementsByTagName("h6")[0].innerHTML.toUpperCase().indexOf(filter) > -1){
                    attraction.style.display = "";
                }
                else {
                    attraction.style.display = "none";
                }
            }
        }
    }
}

function stage3() {

}

$(document).ready(function (){
    var continue1 = document.getElementById("contTrip1");
    var continue2 = document.getElementById("contTrip2");
    continue1.addEventListener("click", function(){stage2();});
    continue2.addEventListener("click", function(){stage3();});

    stage1();
});