<?php
	include ('db.php');
	//It takes time for the DB to update
	sleep(1);

	$qGetPlanet =  "SELECT planet_name
						FROM tbl_205_destination plnt 
						INNER JOIN
						(SELECT MAX(trip_id) as max_val
						FROM tbl_205_destination) mxvl ON plnt.trip_id = mxvl.max_val LIMIT 1";

	$planetName = mysqli_fetch_array(mysqli_query($connection, $qGetPlanet))["planet_name"];
	$qGetAttr = "SELECT * FROM tbl_205_attraction WHERE planet = '$planetName' ORDER BY rating DESC";
	$result = mysqli_query($connection, $qGetAttr);
	if (!$result)
	{
		echo "Error: " . $qGetAttr . "<br>" . mysqli_error($connection);
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



