<?php
    include('db.php');

    $query1 = "SELECT * FROM tbl_205_attraction order by rating desc";
    $result = mysqli_query($connection, $query1);
    $myArray = array();
    if(!$result) {
        die("DB query failed.");
    }

    while ( $row = $res->fetch_object()) { $myArray[ ] = $row; }
    echo json_encode($myArray);
}

$result->close();
?>