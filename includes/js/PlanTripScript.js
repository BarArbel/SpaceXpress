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
    var recommendedCounter = 0;
    var selected = 0;
    var recommended = document.getElementById("recommended");
    var attractions = document.getElementById("attractions");
    var searchAttr = document.getElementById("attractionSearch");
    var alienFilter = document.getElementById("alienFilter");
    var gravityFilter = document.getElementById("gravityFilter");
    var timeFilter = document.getElementById("timeFilter");
    var aiFilter = document.getElementById("aiFilter");
    var elementsFilter = document.getElementById("elementsFilter");
    var rownum = 0;
    var n =50;  /*scroll check*/
    alienFilter.toggleState = false;
    gravityFilter.toggleState = false;
    timeFilter.toggleState = false;
    aiFilter.toggleState = false;
    elementsFilter.toggleState = false;

    $.getJSON("data/attractions.json", function (data) {
        json_data = data;
        for (var row of data) {
            if (row.id<=9){
                rownum = row.id;
                addAttr();
            }
        }
    });

    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if ((document.body.scrollTop > n || document.documentElement.scrollTop > n)&& (rownum< json_data.length-1)){
            n+=50;
            for (var i=0; i<3; i++)
            {
                addAttr();
                rownum++;
            }
        }
    }

    function addAttr () {
        var row= json_data[rownum];
        var formCheck = document.createElement("section");
        var inputCheck = document.createElement("input");
        var labelCheck = document.createElement("label");
        var attraction = document.createElement("article");
        var attInfo = document.createElement("a");
        var attInfoIcon = document.createElement("i");
        var attName = document.createElement("h6");
        var attSelectContainer = document.createElement("section");
        var attSelectFull = document.createElement("section");
        var attSelectEmpty = document.createElement("section");
        var attSelectIcon = document.createElement("i");

        attractionCounter++;
        attraction.className = "form-check-article";
        attraction.id = row.planet + "_" + row.name;
        attraction.name =row.name;
        attraction.planet =row.planet;
        attraction.rating =row.rating;
        attraction.alien =row.alien;
        attraction.gravity =row.gravity;
        attraction.timeflow =row.timeflow;
        attraction.ai =row.ai;
        attraction.elements =row.elements;

        formCheck.className = "form-check form-check-inline";

        inputCheck.className = "form-check-input";
        inputCheck.type = "checkbox";
        inputCheck.id = "attraction" + attractionCounter;
        inputCheck.value = attraction.id;

        labelCheck.className = "form-check-label";
        labelCheck.htmlFor = inputCheck.id;

        attInfoIcon.className = "fas fa-info-circle";
        attInfo.appendChild(attInfoIcon);
        attInfo.className = "info";
        attInfo.href = "#";
        attraction.appendChild(attInfo);
        attName.innerHTML = row.name;
        attraction.appendChild(attName);
        attSelectIcon.className = "fas fa-check-circle";
        attSelectIcon.style.display = "none";
        attSelectEmpty.appendChild(attSelectIcon);
        attSelectEmpty.className = "emptySelect";
        attSelectEmpty.style.display = "none";
        attSelectContainer.appendChild(attSelectEmpty);
        attSelectFull.className = "fullSelect";
        attSelectFull.style.display = "none";
        attSelectContainer.appendChild(attSelectFull);
        attSelectContainer.className = "select";
        attraction.appendChild(attSelectContainer);
        for (var i=1; i<=row.rating; i++){
            var attStar = document.createElement("i");
            attStar.className = "fas fa-star";
            attraction.appendChild(attStar);
        }
        if (row.alien){
            var attAlien = document.createElement("i");
            attAlien.className = "fab fa-reddit-alien";
            attraction.appendChild(attAlien);
        }
        if (row.gravity){
            var attGravity = document.createElement("i");
            attGravity.className = "fab fa-grav";
            attraction.appendChild(attGravity);
        }
        if (row.timeflow){
            var attTime = document.createElement("i");
            attTime.className = "fas fa-clock";
            attraction.appendChild(attTime);
        }
        if (row.ai){
            var attAi = document.createElement("i");
            attAi.className = "fas fa-robot";
            attraction.appendChild(attAi);
        }
        if (row.elements){
            var attElements = document.createElement("i");
            attElements.className = "fab fa-ethereum";
            attraction.appendChild(attElements);
        }

        labelCheck.appendChild(attraction);
        formCheck.appendChild(inputCheck);
        formCheck.appendChild(labelCheck);
        if(recommendedCounter < 3 && row.gravity){
            recommended.appendChild(formCheck);
            recommendedCounter++;
        }
        else {
            attractions.appendChild(formCheck);
        }

        attraction.addEventListener("mouseover", showCheck);
        attraction.addEventListener("mouseout", hideCheck);
        attraction.addEventListener("click", selectCheck);
    }

    function showCheck(){
        var inputId = this.parentNode.htmlFor;
        if(!document.getElementById(inputId).checked){
            if(selected == 0){
                this.getElementsByClassName("emptySelect")[0].style.display = "";
            }
            this.getElementsByClassName("fas fa-check-circle")[0].style.display = "";
        }
    }

    function hideCheck(){
        if(this.getElementsByClassName("fas fa-check-circle")[0].style.display != "none"){
            if(selected == 0){
                this.getElementsByClassName("emptySelect")[0].style.display = "none";
            }
            this.getElementsByClassName("fas fa-check-circle")[0].style.display = "none";
        }
    }

    function reorderSelected(num){
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attractions.getElementsByTagName("input")[i].checked){
                var oldNum = attraction.getElementsByClassName("fullSelect")[0];
                if(Number(oldNum.innerHTML) > num){
                    oldNum.innerHTML = "" + (Number(oldNum.innerHTML) - 1);
                }
            }
            if(i < recommendedCounter){
                var attractionRec = recommended.getElementsByTagName("article")[i];
                if(recommended.getElementsByTagName("input")[i].checked){
                    var oldNumRec = attractionRec.getElementsByClassName("fullSelect")[0];
                    if(Number(oldNumRec.innerHTML) > num){
                        oldNumRec.innerHTML = "" + (Number(oldNumRec.innerHTML) - 1);
                    }
                }
            }
        }
    }

    function showEmpty(){
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            attractions.getElementsByClassName("emptySelect")[i].style.display = "";
            if(i < recommendedCounter){
                recommended.getElementsByClassName("emptySelect")[i].style.display = "";
            }
        }
        document.getElementById("selectedAttractions").style.display = "";
    }

    function hideEmpty(){
        for (var i = 0; i < attractionCounter - recommendedCounter; i++){
            attractions.getElementsByClassName("emptySelect")[i].style.display = "none";
            if(i < recommendedCounter){
                recommended.getElementsByClassName("emptySelect")[i].style.display = "none";
            }
        }
        document.getElementById("selectedAttractions").style.display = "none";
    }

    function selectCheck(){
        var inputId = this.parentNode.htmlFor;
        var checkedObj = this.getElementsByClassName("select")[0];
        var empty = checkedObj.getElementsByClassName("emptySelect")[0];
        var full = checkedObj.getElementsByClassName("fullSelect")[0];
        var selectedAttr = document.getElementById("selectedNumber");

        if(!document.getElementById(inputId).checked){
            if(selected == 0){
                showEmpty();
            }
           selected++;
           empty.style.display = "none";
           full.style.display = "";
           full.innerText = "" + selected;
        }
        else{
            selected--;
            full.style.display = "none";
            empty.style.display = "";
            reorderSelected(Number(full.innerText));
            if(selected == 0){
                hideEmpty();
            }
        }
        selectedAttr.innerText = "" + selected;
    }

    searchAttr.onkeyup = function attractionsByName() {
        var filter = searchAttr.value.toUpperCase();
        for(var i=0; i<attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(attraction.name.toUpperCase().indexOf(filter) > -1){
                    attraction.style.display = "";
                }
                else {
                    attraction.style.display = "none";
                }
            }
        }
    };

    function attractionsFilterOn(filter) {
        for(var i=0; i<attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(!attraction[filter] && attraction.style.display != "none"){
                    attraction.style.display = "none";
                }
            }
        }
    }

    function attractionsFilterOff(){
        for(var i=0; i<attractionCounter - recommendedCounter; i++){
            var attraction = attractions.getElementsByTagName("article")[i];
            if(attraction){
                if(attraction.style.display == "none"){
                    if(alienFilter.toggleState && !attraction.alien){}
                    else if(gravityFilter.toggleState && !attraction.gravity){}
                    else if(timeFilter.toggleState && !attraction.timeflow){}
                    else if(aiFilter.toggleState && !attraction.ai){}
                    else if(elementsFilter.toggleState && !attraction.elements){}
                    else{
                        attraction.style.display = "";
                    }
                }
            }
        }
    }

    function attractionsFilterState(filter){
        switch (filter){
            case "alien":
                if(!alienFilter.toggleState){
                    alienFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    alienFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "gravity":
                if(!gravityFilter.toggleState){
                    gravityFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    gravityFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "timeflow":
                if(!timeFilter.toggleState){
                    timeFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    timeFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "ai":
                if(!aiFilter.toggleState){
                    aiFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    aiFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
            case "elements":
                if(!elementsFilter.toggleState){
                    elementsFilter.toggleState = true;
                    attractionsFilterOn(filter);
                }
                else{
                    elementsFilter.toggleState = false;
                    attractionsFilterOff();
                }
                break;
        }
    }

    alienFilter.addEventListener("click", function(){attractionsFilterState("alien");});
    gravityFilter.addEventListener("click", function(){attractionsFilterState("gravity");});
    timeFilter.addEventListener("click", function(){attractionsFilterState("timeflow");});
    aiFilter.addEventListener("click", function(){attractionsFilterState("ai");});
    elementsFilter.addEventListener("click", function(){attractionsFilterState("elements");});

    document.getElementById("selectedAttractions").style.display = "none";
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