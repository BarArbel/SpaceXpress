$( document ).ready(function() {
    getData();
    selected();
    $('#myModal').modal('show');
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
                    '<section class="line"></section>'+
                    '<section><img src="'+trip.pic1+'">'+trip.date1+'</section>'+
                    '<section><img src="'+trip.pic2+'">'+trip.date2+'</section>'+
                    '<section><img src="'+trip.pic3+'">'+trip.date3+'</section>'+

                '</section>'+
                 '<section class="buttons">'+
                    '<button class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-pencil-alt"></i> Edit Trip</button>'+
                    '<button class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit"><i class="fas fa-book"></i> Journal</button>'+
                    '<button class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit">'+trip.flightstatus+'</button>'+
                 '</section>'+
            '</section>'

        );

            $('#trips').append(trips);
        }

    });
}

function selected() {
    $('header li:nth-of-type(4)').css("background-color", "#ffffff");
    $('header li:nth-of-type(4) a').css("color", "#000000");
}