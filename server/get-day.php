<?php
include ('db.php');


/*$qGetPlanet =  "SELECT planet_name
						FROM tbl_205_destination plnt 
						INNER JOIN
						(SELECT MAX(trip_id) as max_val
						FROM tbl_205_destination) mxvl ON plnt.trip_id = mxvl.max_val LIMIT 1";*/


/*$qGetSumm = "SELECT * FROM tbl_205_attraction WHERE planet = '$planetName' ORDER BY rating DESC";*/
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

/* to do list:
-JSON that has
"name":"Mann","planet":"HD 219134 b","day":3,"date":"05.04.2118","address":"5467.23;2003.04;5801.67;0.00021","place":1,"alien":false,"gravity":false,"timeflow":false,"ai":false,"elements":true
 need to join day table and attraction table via
*/
?>