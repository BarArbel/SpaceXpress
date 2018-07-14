<?php
    include('db.php');

    function getUserID() {
        var url = window.location.href;
        return (url.split('uid=')[1]);
    }

    $qGetUser = "SELECT user_id FROM tbl_205_trip WHERE user_id = getUserID()";
    $userId = mysqli_fetch_array(mysqli_query($connection, $qGetUser))
?>