var check=document.getElementsByClassName('option');
var sear = document.getElementsByClassName('searbtn');
var deats = document.getElementsByClassName('flightDeats');
var inp = document.getElementsByTagName('input');

function initIndex () {

    for (var i=0; i<check.length; i++) {
        check[i].addEventListener("click",changeForm);
    }
    addFlight();
    document.addEventListener('click', function(){ document.documentElement.scrollTop = 0;});
    getData();
}

/* ---------------flight related--------------- */

function changeForm () {
    var rad = whichChecked();
    switch (rad)
    {
        case 0:
            reset();
            document.getElementsByTagName('input')[7].disabled = false;
            break;
        case 1:
            reset();
            document.getElementsByTagName('input')[7].disabled = true;
            break;
        case 2:
            if (inp.length <= 9){
                document.getElementsByTagName('input')[7].disabled = false;
                addFlight();
                addPlusMinus();
            }
            break;
    }

}

function addPlusMinus () {
    var plus = document.createElement("i");
    var minus = document.createElement("i");
    plus.classList.add("fas");
    minus.classList.add("fas");
    plus.classList.add("fa-plus");
    minus.classList.add("fa-minus");
    $(minus).insertAfter(sear);
    $(plus).insertAfter(sear);
    plus.addEventListener("click", addFlight);
    minus.addEventListener("click", removeFlight);
}

function whichChecked () {
    for (var i=0; i<check.length; i++) {
        if (check[i].checked) {
            return i;
        }
    }
}

function addFlight () {
    if (inp.length <25) {
        var from = document.createElement("input");
        var to = document.createElement("input");
        var dep = document.createElement("input");
        var ret = document.createElement("input");
        var pass = document.createElement("input");

        from.type = 'text';
        to.type = 'text';
        dep.type = 'date';
        ret.type = 'date';
        pass.type = 'number';

        from.name = 'from';
        to.name = 'to';
        dep.name = 'depart';
        ret.name = 'return';
        pass.name = 'pass';

        from.placeholder = ' From';
        to.placeholder = ' To';
        dep.placeholder = ' Depart';
        ret.placeholder = ' Return';
        pass.placeholder = ' Passengers';

        $(from).insertBefore(sear);
        $(to).insertBefore(sear);
        $(dep).insertBefore(sear);
        $(ret).insertBefore(sear);
        $(pass).insertBefore(sear);
    }
}

function removeFlight () {
    for (var i=0; i<5; i++)
    {
        if (inp.length != 9)
          $(inp[inp.length-1]).remove();
    }
}

function reset () {
    while (inp.length != 9)
        removeFlight ();
    $(".flightDeats .fa-plus").remove();
    $(".flightDeats .fa-minus").remove();
}


/* ---------------journey related--------------- */


function getData () {
    var json_data = [];
    $.getJSON("data/journeys.json", function (data) {
        console.log(data);
        json_data = data;
        for (var journeys of data) {
            var journey = $(
                '<a href="#"> <img src="' + journeys.profile + '"></a>' +
                '<h3>'+ journeys.title + journeys.user + '</h3>' +
                '<ul>'+
                    '<li>' +
                        '<span class="fa fa-star "></span>'+
                        '<span class="fa fa-star "></span>'+
                        '<span class="fa fa-star "></span>'+
                        '<span class="fa fa-star "></span>'+
                        '<span class="fa fa-star "></span>'+
                    '</li> '+

                    '<li>' +
                        journeys.review + ' | '+
                    ' Reviews</li>'+

                    '<li>Planets: ' +
                        journeys.planets + ' | '+
                    '</li>'+

                    '<li>' +
                        journeys.tags+
                    '</li>'+
                '</ul>'+

                '<section>'+
                    '<h4>Featured Post</h4>'+

                    '<br><h4>'+ journeys.ptitle +'</h4>'+
                    '<p>'+journeys.parag+'<br><a href="#">Read more...</a></p>'+

                '</section>'+

                '<section>'+
                    '<h4>Featured Attractions</h4>'+
                    '<a href="#">'+journeys.t1+'<img src="'+ journeys.p1 +'"> </a>'+

                    '<a href="#">'+journeys.t2+'<img src="'+ journeys.p2 +'"> </a>'+
                 '</section>'
            )
            console.log('where is my data');
            $('#journeys').append(journey)
        }
    });

}


/*
[{"id":1,
    "profile":"../../images/tro4.png",
    "title":"My first space journey / ",
    "user":"deadKenny123",
    "rating":5,
    "review":" 3,565,300,431 ",
    "planets":" TRL0-10  ",
    "tags":" Food, Science, Alien, Cultures...",
    "ptitle":"How to prepare for Hinlonk",
    "parag":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus..."
    "t1":"Opan Gund",
    "t2":"WardcM4rrv",
    "p1":"../../images/colorful_beach_nebula-wide.jpg",
    "p2":"../../images/free-sci-fi-wallpaper_010014836_283.jpg"},
*/

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementsByClassName("back2top")[0].style.visibility = "visible";
    } else {
        document.getElementsByClassName("back2top")[0].style.visibility = "hidden";
    }
}

