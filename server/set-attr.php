<?php
    include ('db.php');

    $get_max_attr = "SELECT MAX(attr_id) AS max_attr FROM tbl_205_attraction";
    $num_of_attr = mysqli_fetch_array(mysqli_query($connection, $get_max_attr))["max_attr"];
    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];

    $get_1stDate_planet = "SELECT arrival_date FROM tbl_205_destination WHERE trip_id = $trip_id LIMIT 1";
    $nth_date = mysqli_fetch_array(mysqli_query($connection, $get_1stDate_planet))["arrival_date"];

    $nth_attr = 1; //there can be just 5 attractions for each day

    for ($x = 1; $x <= $num_of_attr; $x++) {
        if (!empty($_GET['attraction' . $x])) {
            $attr_val = explode('_', $_GET['attraction' . $x])[1];
            $get_attr_id = "SELECT attr_id FROM tbl_205_attraction WHERE name LIKE '%$attr_val%'";
            $attr_id = mysqli_fetch_array(mysqli_query($connection, $get_attr_id))["attr_id"];
            if ($nth_attr ==1) {
                $qSetAttrs = "INSERT INTO tbl_205_day (trip_id, trip_date, attr1_id) VALUES ($trip_id,$nth_date,$attr_id); ";
            }
            else {
                $attr_tbl_name = 'attr' . $nth_attr . '_id';
                $qSetAttrs .= "UPDATE tbl_205_day SET " . $attr_tbl_name . " = '$attr_id' WHERE trip_id = '$trip_id';";
            }

            $nth_attr++;
        }
    }

    if (mysqli_multi_query($connection, $qSetAttrs)) {
        echo "Huge success.<br>";
    }
    else {
        echo "Error: " . $qSetAttrs . "<br>" . mysqli_error($connection);
    }



    mysqli_close($connection);
    /* to do list:
    -Check if Day already has a random date, if yes- gotta ++ the date value we play with
    V Change date collumn name to trip_date
     */

?>