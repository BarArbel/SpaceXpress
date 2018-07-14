<?php
    include ('db.php');


    if (mysqli_multi_query($connection, $qSetAttrs)) {
        echo "Huge success.<br>";
    }
    else {
        echo "Error: " . $qSetAttrs . "<br>" . mysqli_error($connection);
    }



    mysqli_close($connection);
    /* to do list:
    -Check NULL stuff when a title is given (... which happens later in another form...)

     */

?>