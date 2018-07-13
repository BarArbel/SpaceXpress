<?php
    include ('db.php');

    $get_max_attr = "SELECT MAX(attr_id) AS max_attr FROM tbl_205_attraction";
    $num_of_attr = mysqli_fetch_array(mysqli_query($connection, $get_max_attr))["max_attr"];

    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];

    $get_first_date = "SELECT arrival_date FROM tbl_205_destination WHERE trip_id = $trip_id LIMIT 1";
    $nth_date = mysqli_fetch_array(mysqli_query($connection, $get_first_date))["arrival_date"];
    /*$nth_attr = 1;*/

    for ($x = 1; $x <= $num_of_attr; $x++) {
        if (!empty($_GET['attraction' . $x])) {
            $attr_val = $_GET['attraction' . $x];
            
            if ($x ==1) {
                $qSetAttrs = "INSERT INTO tbl_205_day (trip_id, date, attr1_id) VALUES ($trip_id,$nth_date,$attr_val); ";
            }
            else {
                $qSetAttrs .= "UPDATE ";
            }

            /*$nth_attr++;*/
        }
    }
    /* to do list:

     */


    /*i deleted from the trip tbl the day_id and the dest_id lol */
?>