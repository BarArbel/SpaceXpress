<?php
    include ('db.php');

    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];

    if (!empty($_GET['dayID1'])) {
        $day_val = $_GET['dayID1'];
        $attr_val = $_GET['attrNum1'];
        $prev_attr_val = $_GET['attrID1'];
        $qUpdateDay = "UPDATE tbl_205_day
                            SET attr1_id = $prev_attr_val                            
                            WHERE day_id = $day_val AND trip_id = $trip_id;";
    }

    for ($x = 2; $x <= 5; $x++) {
        if (!empty($_GET['dayID' . $x])) {
            $day_val = $_GET['dayID' . $x];
            $attr_val = $_GET['attrNum' . $x];
            $prev_attr_val = $_GET['attrID' . $x];
            $qUpdateDay .= "UPDATE tbl_205_day
                            SET attr" . $attr_val ."_id = $prev_attr_val                            
                            WHERE day_id = $day_val AND trip_id = $trip_id;";
        }
    }
    if (mysqli_multi_query($connection, $qUpdateDay)) {
        echo "Huge success.<br>";
    }
    else {
        echo "Error: " . $x . "<br>" . mysqli_error($connection);
    }



    mysqli_close($connection);
    /* to do list:
    -Check NULL stuff when a title is given (... which happens later in another form...)

     */

?>