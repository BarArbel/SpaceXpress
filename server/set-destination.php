<?php
    include ('db.php');

    //getting the pic of the planet according to the name
    function picNum($planet) {
        $ascii = ord(strtolower(($planet[0])));
        return abs(($ascii-96))%10;
    }

    function fixDateFormat ($date) {
        return date_format(new DateTime($date),"Y-m-d");
    }

    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"]+1;

    $user_id = $_GET["uid"];

    $planet_name1 = $_GET["planet1"];
    $pic1 = picNum($planet_name1) . ".png";
    /*$pic1 = "images/planet" . picNum($planet_name1) . ".png";*/

    if (!empty($_GET['planet2'])) {
        $planet_name2 = $_GET["planet2"];
        $pic2 = picNum($planet_name2) . ".png";
        /*$pic2 = "images/planet" . picNum($planet_name2) . ".png";*/
    }

    if (!empty($_GET['planet3'])) {
        $planet_name3 = $_GET["planet3"];
        $pic3 = picNum($planet_name3) . ".png";
        /*$pic3 = "images/planet" . picNum($planet_name3) . ".png";*/
    }

    $strt1 = fixDateFormat($_GET["start1"]);
    if (!empty($_GET['start2'])) $strt2 = fixDateFormat($_GET["start2"]);
    if (!empty($_GET['start3'])) $strt3 = fixDateFormat($_GET["start3"]);

    $end1 = fixDateFormat($_GET["end1"]);
    if (!empty($_GET['end2'])) $end2 = fixDateFormat($_GET["end2"]);
    if (!empty($_GET['end3'])) $end3 = fixDateFormat($_GET["end3"]);

    $qSetDest = "INSERT INTO tbl_205_destination (user_id, trip_id, planet_name, arrival_date, depart_date, picture_url) VALUES ($user_id,$trip_id,'$planet_name1','$strt1','$end1','$pic1'); ";

    if (!empty($_GET['planet2'])) {
        $qSetDest .= "INSERT INTO tbl_205_destination (user_id, trip_id, planet_name, arrival_date, depart_date, picture_url) VALUES ($user_id,$trip_id,'$planet_name2','$strt2','$end2','$pic2'); ";
    }

    if (!empty($_GET['planet3'])) {
        $planet_name3 = $_GET["planet3"];
        $qSetDest .= "INSERT INTO tbl_205_destination (user_id, trip_id, planet_name, arrival_date, depart_date, picture_url) VALUES (4,$trip_id,'$planet_name3','$strt3','$end3','$pic3'); ";
    }

    //create a new trip too
    $qSetDest .= "INSERT INTO tbl_205_trip (trip_id, user_id) VALUES ($trip_id, $user_id); ";
    if (mysqli_multi_query($connection, $qSetDest)) {
        echo "Huge success.<br>";
    }
    else {
        echo "Error: " . $qSetDest . "<br>" . mysqli_error($connection);
    }



mysqli_close($connection);



/* to do list:
V check if dest2 and 3 are available and add them as well.
V create a new trip that will co-respond to the destination we're creating
v create 4 more pics to use randomly? i guess? depending on a digit
-change user id to be dynamic (get it from the form automatically)
v change the pic to be dynamic, something about mod
-Fix the dates, they are 0000-00-00 for some reason
-die */


/*i deleted from the trip tbl the day_id and the dest_id lol */
?>

