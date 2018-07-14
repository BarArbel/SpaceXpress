<?php
    include('db.php');

    $qGetUser = "SELECT * FROM tbl_205_user";
    $result = mysqli_query($connection, $qGetUser);

    if (!$result) {
        echo "Error: " . $qGetUser . "<br>" . mysqli_error($connection);
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