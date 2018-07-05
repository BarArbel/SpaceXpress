<?php
    include ('db.php');
    $get_latest_dest = "SELECT MAX(dest_id) AS max_dest FROM tbl_205_destination";
    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";

    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"]+1;
    echo $trip_id;
    $dest_id1 = mysqli_fetch_array(mysqli_query($connection, $get_latest_dest))["max_dest"]+1;

    $dest_id2 = $dest_id1+1;
    $dest_id3 = $dest_id2+1;

    $planet_name1 = $_GET["planet1"];
    $planet_name2 = $_GET["planet2"];
    $planet_name3 = $_GET["planet3"];

    $strt1 = $_GET["start1"];
    $strt2 = $_GET["start2"];
    $strt3 = $_GET["start3"];

    $end1 = $_GET["end1"];
    $end2 = $_GET["end2"];
    $end3 = $_GET["end3"];

$qSetDest = "INSERT INTO tbl_205_destination (dest_id, user_id, trip_id, planet_name, arrival_date, depart_date, picture_url) VALUES ($dest_id1,4,$trip_id,'$planet_name1',$strt1,$end1,'pic')";


if (mysqli_query($connection, $qSetDest)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $qSetDest . "<br>" . mysqli_error($connection);
}
mysqli_close($connection);

?>
/* to do list:
-check if dest2 and 3 are available and add them as well.
-create a new trip that will co-respond to the destination we're creating
-create 4 more pics to use randomly? i guess? depending on a digit
-die */
