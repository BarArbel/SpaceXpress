$( document ).ready(function() {
    getData();

});

function getData () {
    var json_data = [];
    $.getJSON("data/trips.json", function (data) {
        console.log(data);
        json_data = data;
        for (var trip of data) {
            var trips = $(
            '<section class="tripTimeline">' +
                '<h3>'+trip.name+'</h3>' +
                '<section>' +
                    '<section class="line"></section>' +
                    '<section><img src="">'+trip.date1+'</section>'+
                    '<section><img src="">'+trip.date2+'</section>'+
                    '<section><img src="">'+trip.date3+'</section>'+
                '</section>'+
                 '<section>'+
                    '<button class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-pencil-alt"></i> Edit Trip</button>'+
                    '<button class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-book"></i> Journal</button>'+
                    '<button class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-pencil-alt"></i>'+trip.flightstatus+'</button>'+
                 '</section>'+
            '</section>'

        );
            $('#trips').append(trips);
        }

    });
}

function planetFunzone (){
    var planets = document.getElementsByTagName(img);

}