<?php
    include('db.php');




    if(!empty($_POST['user_id'])) {
        $user_id =$_POST['user_id'];
    }

    $rows = array();
    while($r = mysqli_fetch_assoc($result)) {
        $rows[] = $r;
    }
    echo json_encode($rows);

    mysqli_free_result($result);

    mysqli_close($connection);

    /* to do list:

     */


?>