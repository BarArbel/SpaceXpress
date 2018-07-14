$( document ).ready(function() {
    var json_data = [];
    var user = document.getElementById("user");

    $.getJSON("server/get-user.php", function (data) {
        json_data = data;

        for(row of data){
            if(row.user_id == getUserID()){
                user.getElementsByTagName("h6").innerText = "Welcome, " + row.name;
                user.getElementsByTagName("img").src = row.profile_url;
            }
        }
    });

    function getUserID() {
        var url = window.location.href;
        return (url.split('uid=')[1]);
    }
});