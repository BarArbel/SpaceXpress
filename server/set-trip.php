<?php
    include ('db.php');

    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];

    if(!empty($_GET['groupName'])) {
        $title = $_GET['groupName'];
        $qUpdateTrip = "UPDATE tbl_205_trip SET title = '$title' WHERE trip_id = $trip_id;";
    }

    for($x = 1; $x <= 3; $x++) {
        if (!empty($_GET['guest' . $x])) {
            $guest = $_GET['guest' . $x];
            $qUpdateTrip .= "UPDATE tbl_205_trip SET guest" . $x . "_id = $guest WHERE trip_id = $trip_id;";
        }
    }

    if (mysqli_multi_query($connection, $qUpdateTrip)) {
        echo "Huge success.<br>";
    }
    else {
        echo "Error: " . $x . "<br>" . mysqli_error($connection);
    }

    mysqli_close($connection);
?>