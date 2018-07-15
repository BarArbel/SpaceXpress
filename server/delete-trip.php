<?php
include('db.php');

if(!empty($_GET['del'])) {
    $trip_to_delete =$_GET['del'];
}

$qDelete = "DELETE from tbl_205_trip where trip_id =$trip_to_delete; 
            DELETE from tbl_205_day where trip_id =$trip_to_delete;
            DELETE from tbl_205_destination where trip_id =$trip_to_delete;  ";

if (mysqli_multi_query($connection, $qDelete)) {
    echo "Huge success.<br>";
}
else {
    echo "Error: " . $qDelete . "<br>" . mysqli_error($connection);
}

mysqli_close($connection);


?>