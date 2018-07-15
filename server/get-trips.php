<?php
    include('db.php');

    function setQuery($x, $user_id) {
        $q = "SELECT *
                FROM
                (SELECT uid, trp, planet1, pic1, date1, planet2, pic2, date2, planet3, pic3, date3
                FROM
                (SELECT *
                FROM
                (SELECT user_id AS uid, trip_id AS trp, planet_name AS planet1, picture_url AS pic1, arrival_date AS date1
                FROM
                (SELECT user_id, trip_id, planet_name, picture_url, arrival_date
                FROM tbl_205_destination
                WHERE trip_id =$x AND user_id = $user_id
                ORDER BY dest_id) planets
                LIMIT 0,1) plnt1 left outer join
                
                (SELECT user_id, trip_id, planet_name AS planet2, picture_url AS pic2, arrival_date AS date2
                FROM
                (SELECT user_id, trip_id, planet_name, picture_url, arrival_date
                FROM tbl_205_destination
                WHERE trip_id =$x AND user_id = $user_id
                ORDER BY dest_id) planets
                LIMIT 1,1) plnt2 ON plnt1.trp= plnt2.trip_id) plnt12 left outer join
                
                (SELECT user_id, trip_id, planet_name AS planet3, picture_url AS pic3, arrival_date AS date3
                FROM
                (SELECT user_id, trip_id, planet_name, picture_url, arrival_date
                FROM tbl_205_destination
                WHERE trip_id =$x AND user_id = $user_id
                ORDER BY dest_id) planets
                LIMIT 2,1) plnt3 ON plnt12.trp= plnt3.trip_id) plnts left outer join
                
                (SELECT trip_id, title AS name, flightstatus
                FROM tbl_205_trip
                WHERE trip_id = $x AND user_id = $user_id
                ) trps ON plnts.trp= trps.trip_id";
        return $q;
    }

    /*$user_id =1;*/
    if(!empty($_GET['user_id'])) {
        $user_id =$_GET['user_id'];
    }


    $get_latest_trip = "SELECT MAX(trip_id) AS max_trip FROM tbl_205_trip WHERE user_id = $user_id";
    $trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];

    $get_oldest_trip = "SELECT MIN(trip_id) AS min_trip FROM tbl_205_trip WHERE user_id = $user_id";
    $min_trip = mysqli_fetch_array(mysqli_query($connection, $get_oldest_trip))["min_trip"];

    $qGetTrip = setQuery($trip_id, $user_id);

        $rows = array();
        for ($i = $trip_id; $i>= $min_trip; $i--) {

            $qCheckifAvailable = "SELECT IFNULL(trip_id, -1) AS trp FROM tbl_205_trip WHERE user_id = $user_id AND trip_id = $i";
            $available = mysqli_fetch_array(mysqli_query($connection, $qCheckifAvailable))['trp'];

            if ($i == $trip_id || $available != -1) {
                $qGetTrip = setQuery($i, $user_id);
                $result = mysqli_query($connection, $qGetTrip);
                if (!$result) {
                    echo "Error: " . $qGetTrip . "<br>" . mysqli_error($connection);
                    die("db query failed");
                }

                while ($r = mysqli_fetch_assoc($result)) {
                    $rows[] = $r;
                }
            }
        }
        echo json_encode($rows);

        mysqli_free_result($result);

        mysqli_close($connection);

        /* to do list:

         */


?>