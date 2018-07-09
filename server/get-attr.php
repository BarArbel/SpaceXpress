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

/*	include('db.php');
	
	$query1 = "SELECT * FROM tbl_test order by title desc";
	$result = mysqli_query($connection, $query1);
	if(!$result) {
		die("DB query failed.");
	}
	
	if(isset($_POST['ttl'])) {
		$ttle = mysqli_real_escape_string($connection, $_POST['ttl']);
		$txt = mysqli_real_escape_string($connection, $_POST['desc']);
		
		$query2 = "insert into tbl_test(title,txt) values ('$ttle','$txt')";
		$result = mysqli_query($connection, $query2);
		
		$query2 = "SELECT * FROM tbl_test order by title desc";
		$result = mysqli_query($connection, $query2);
	}
	
	echo "<ul>";
	while($row = mysqli_fetch_assoc($result)) {
		echo "<li><h2>" . $row["title"] . "</h2><h3>" . $row["txt"] . "</h3></li>";
	}
	echo "</ul>";*/
	
	mysqli_free_result($result);
	
	mysqli_close($connection);
?>





