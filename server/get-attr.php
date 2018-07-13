<?php
	include ('db.php');
/*$qGetAttr = "SELECT * FROM tbl_205_attraction WHERE planet='' ORDER BY rating DESC";*/
	$qGetAttr = "SELECT * FROM tbl_205_attraction ORDER BY rating DESC";
	$result = mysqli_query($connection, $qGetAttr);
	if (!$result)
	{
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





