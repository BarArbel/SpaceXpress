<?php
    include ('db.php');
    //It takes time for the DB to update
    sleep(2);
    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];

    $qGetNumAttrInDay = "SELECT trip_id, IF(attr5_id IS NULL, IF(attr4_id IS NULL ,IF(attr3_id IS NULL, IF(attr2_id IS NULL, 1, 2), 3), 4), 5) AS num_attr 
    FROM tbl_205_day
    WHERE trip_id = $trip_id";
    $numOfAttrInDay =mysqli_fetch_array(mysqli_query($connection, $qGetNumAttrInDay))["num_attr"];

    $qGetSumm = "
    SELECT day_id, trip_date, IF(attr1_id, 1, 0) AS place, attr1_id AS attr, 1 AS 
    day , name, planet, location AS address, alien, gravity, timeflow, ai, elements
    FROM
        (SELECT * FROM tbl_205_day
           LEFT JOIN tbl_205_attraction ON tbl_205_day.attr1_id = tbl_205_attraction.attr_id
         UNION
         SELECT * FROM tbl_205_day
           RIGHT JOIN tbl_205_attraction ON tbl_205_day.attr1_id = tbl_205_attraction.attr_id) day_attr1
    WHERE trip_id = $trip_id ";

    for ($x = 2; $x <= $numOfAttrInDay; $x++) {
        $qGetSumm .= "
        UNION
    
        SELECT day_id, trip_date, IF(attr". $x . "_id, ". $x . ", 0) AS place, attr". $x . "_id AS attr, 1 AS day , name, planet, location AS address, alien, gravity, timeflow, ai, elements
        FROM
            (SELECT * FROM tbl_205_day
               LEFT JOIN tbl_205_attraction ON tbl_205_day.attr". $x . "_id = tbl_205_attraction.attr_id
             UNION
             SELECT * FROM tbl_205_day
               RIGHT JOIN tbl_205_attraction ON tbl_205_day.attr". $x . "_id = tbl_205_attraction.attr_id) day_attr". $x . "
        WHERE trip_id = " . $trip_id;
    }


    $result = mysqli_query($connection, $qGetSumm );
    if (!$result)
    {
        echo "Error: " . $qGetSumm  . "<br>" . mysqli_error($connection);
        die("db query failed");
    }

    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    mysqli_free_result($result);

    mysqli_close($connection);

?>