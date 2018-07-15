$( document ).ready(function() {
    var json_data = [];
    var user = document.getElementById("user");

        $.ajax({
            type:'POST',
            url:'server/get-user.php',
            dataType: "json",
            data:{user_id:getUserID()},
            success:function(data){
                json_data = data;

                for(var row of data){
                    if(row.user_id == getUserID()){
                        user.getElementsByTagName("h6").innerText = "Welcome, " + row.name;
                        user.getElementsByTagName("img").src = row.profile_url;
                    }
                }
            }
        });
   /* });*/

    function getUserID() {
        var url = window.location.href;
        return (url.split('uid=')[1]);
    }
});