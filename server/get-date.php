<?php
include ('db.php');

$get_latest_trip = "SELECT MAX(trip_id) max_trip FROM tbl_205_destination";
$trip_id = mysqli_fetch_array(mysqli_query($connection, $get_latest_trip))["max_trip"];


$qGetDate = "SELECT arrival_date FROM tbl_205_destination WHERE trip_id = $trip_id";

$result = mysqli_query($connection, $qGetDate );
if (!$result)
{
    echo "Error: " . $qGetDate  . "<br>" . mysqli_error($connection);
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