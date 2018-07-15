$( document ).ready(function() {
    getData();
    selected();
    $('#myModal').modal('show');
});

function getUserID() {
    var url = window.location.href;
    return (url.split('uid=')[1]);
}

function getData () {
    var user_id = getUserID();
    var json_data = [];
    /*$.getJSON("server/get-trips.php", function (data) {*/
    $.getJSON("server/get-trips.php?user_id="+user_id, function (data) {
        json_data = data;
        for (var trip of data) {

            var timeline = document.createElement("section");
            var tripName = document.createElement("h3");
            var lineContainer = document.createElement("section");
            var lineObj = document.createElement("section");

            timeline.className = "tripTimeline";

            tripName.innerText = trip.name;
            timeline.appendChild(tripName);

            lineContainer.className = "lineContainer";
            timeline.appendChild(lineContainer);

            lineObj.className = "line";
            lineContainer.appendChild(lineObj);

            if(trip.planet1){
                var planet1Obj = document.createElement("section");
                var pic1Obj = document.createElement("img");

                lineContainer.appendChild(planet1Obj);
                pic1Obj.src = "images/planet"+trip.pic1;
                planet1Obj.appendChild(pic1Obj);
                planet1Obj.innerHTML += trip.date1;
            }

            if(trip.planet2){
                var planet2Obj = document.createElement("section");
                var pic2Obj = document.createElement("img");

                lineContainer.appendChild(planet2Obj);
                pic2Obj.src = "images/planet"+trip.pic2;
                planet2Obj.appendChild(pic2Obj);
                planet2Obj.innerHTML += trip.date2;
            }

            if(trip.planet3){
                var planet3Obj = document.createElement("section");
                var pic3Obj = document.createElement("img");

                lineContainer.appendChild(planet3Obj);
                pic3Obj.src = "images/planet"+trip.pic3;
                planet3Obj.appendChild(pic3Obj);
                planet3Obj.innerHTML += trip.date3;
            }

            var buttons = $(
                '<section class="buttons">'+
                    '<button class="btn btn-secondary" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-pencil-alt"></i> Edit Trip</button>'+
                    '<button class="btn btn-secondary" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-book"></i> Journal</button>'+
                    '<form class= "deleteTrip" action="server/delete-trip.php" method="get" target="frame5">'+
                        '<iframe name="frame5" hidden></iframe>'+
                        '<button class="delTrip btn btn-secondary" data-toggle="model" data-target="#myModal" type="submit"><i class="fas fa-trash-alt"></i> Delete Trip</button>'+
                        '<input type="hidden" name="del" value="'+trip.trp+'">'+
                    '</form>'+
                    '<button class="btn btn-secondary" data-toggle="modal" data-target="#myModal" type="submit">'+trip.flightstatus+'</button>'+
                '</section>'
            );

            $(timeline).append(buttons);
            $('#trips').append(timeline);

            /*$('#trips').append(trips);*/
        }

    });
    var delOpt = getElementsByClassName('deleteTrip');
    console.log(delOpt.length);
    for (i=0; i< delOpt.length; i++) {
        document.delOpt[i].addEventListener("submit", function () {
            console.log("yo");
            window.open('mytrips.html?uid=' + user_id, '_self');
        });
    }
}


function selected() {
    $('header li:nth-of-type(4)').css("background-color", "#ffffff");
    $('header li:nth-of-type(4) a').css("color", "#000000");
}