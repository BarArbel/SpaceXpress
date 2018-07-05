<?php
    include ('db.php');
    $planet_name1 = $_GET["planet1"];
    $planet_name2 = $_GET["planet2"];
    $planet_name3 = $_GET["planet3"];

    $strt1 = $_GET["start1"];
    $strt2 = $_GET["start2"];
    $strt3 = $_GET["start3"];

    $end1 = $_GET["end1"];
    $end2 = $_GET["end2"];
    $end3 = $_GET["end3"];

    $qSetDest1 = "INSERT INTO tbl_205_destination (dest_id, user_id, trip_id, planet_name, arrival_date, depart_date, picture_url) VALUES (,,,planet1,start1,end1,pic)";
    echo $planet_name;
?>