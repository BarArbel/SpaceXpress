function stage3() {
    var json_data = [];
    var form3 = document.getElementById("tripForm3");

    $.getJSON("../../data/summary.json", function (data) {
        json_data = data;
        var prevDay = 0;
        for (var row of data) {
            if(row.day > prevDay){
                var day = document.createElement("section");
                var dayTitle = document.createElement("h5");

                dayTitle.className = "mb-0";
                dayTitle.innerText = "Day " + row.day + ": " + row.date;

                day.appendChild(dayTitle);
                form3.appendChild(day);

                prevDay = row.day;
            }

            var dateSplit = (row.date).split(".");
            var container = document.createElement("section");
            var attraction = document.createElement("article");
            var textInput = document.createElement("input");
            var numberInput = document.createElement("input");
            var dateInput = document.createElement("input");
            var attInfo = document.createElement("a");
            var attInfoIcon = document.createElement("i");
            var attName = document.createElement("h6");
            var attSelect = document.createElement("section");
            var attAddress = document.createElement("h4");

            container.className = "ddContainer";

            attraction.id = row.name + "_" + row.planet + "_summary";
            attraction.draggable = true;

            textInput.type = "text";
            textInput.name = "attraction_text" + row.id;
            textInput.value = row.name + "_" + row.planet;
            attraction.appendChild(textInput);

            numberInput.type = "number";
            numberInput.name = "attraction_number" + row.id;
            numberInput.value = row.place;
            attraction.appendChild(numberInput);

            dateInput.type = "date";
            dateInput.name = "attraction_date" + row.id;
            dateInput.value = dateSplit[2] + "-" + dateSplit[1] + "-" + dateSplit[0];
            attraction.appendChild(dateInput);

            attInfoIcon.className = "fas fa-info-circle";
            attInfo.appendChild(attInfoIcon);
            attInfo.className = "info";
            attInfo.href = "#";
            attraction.appendChild(attInfo);

            attName.innerHTML = row.name;
            attraction.appendChild(attName);

            attSelect.className = "fullSelect";
            attSelect.innerText = row.place;
            attraction.appendChild(attSelect);

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

            attAddress.innerText = row.address;
            attraction.appendChild(attAddress);

            container.appendChild(attraction);
            form3.getElementsByClassName("mb-0")[row.day - 1].parentElement.appendChild(container);

            attraction.addEventListener("dragstart", function(){drag(event);});
            container.addEventListener("drop", function(){drop(event);});
            container.addEventListener("dragover", function(){allowDrop(event);});
        }
    });

    function drag(event){
        event.dataTransfer.setData("src", event.target.id);
        showBorders(event.target.id);
    }

    function drop(event){
        event.preventDefault();

        var src = document.getElementById(event.dataTransfer.getData("src"));
        var srcParent = src.parentNode;
        var tgt = event.currentTarget.firstElementChild;
        var srcPlace = src.getElementsByTagName("input")[1].value;
        var srcDate = src.getElementsByTagName("input")[2].value;
        var tgtPlace = tgt.getElementsByTagName("input")[1].value;
        var tgtDate = tgt.getElementsByTagName("input")[2].value;

        event.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);

        src.getElementsByTagName("input")[1].value = tgtPlace;
        src.getElementsByTagName("input")[2].value = tgtDate;
        src.getElementsByClassName("fullSelect")[0].innerText = tgtPlace;
        tgt.getElementsByTagName("input")[1].value = srcPlace;
        tgt.getElementsByTagName("input")[2].value = srcDate;
        tgt.getElementsByClassName("fullSelect")[0].innerText = srcPlace;

        hideBorders();
    }

    function allowDrop(event){
        event.preventDefault();
    }

    function showBorders(dragged){
        var containers = form3.getElementsByClassName("ddContainer");
        for(var container of containers){
            if(container.getElementsByTagName("article")[0].id == dragged){
                container.style.border = "3pt solid #2196f3";
            }
            else{
                container.style.border = "3pt dotted #2196f3";
            }
        }
    }

    function hideBorders(){
        var containers = form3.getElementsByClassName("ddContainer");
        for(var container of containers){
            container.style.border = "";
        }
    }

    document.getElementById('save').addEventListener("submit", function(){console.log("yo"); window.open('mytrips.html', '_self');});
}


$(document).ready(function (){
    stage3();
});