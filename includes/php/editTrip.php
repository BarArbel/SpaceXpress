<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>SpaceXpress- Edit Trip</title>
        <link href="https://fonts.googleapis.com/css?family=Biryani" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
        <link rel="stylesheet" href="../css/style.css">
    </head>
    <body>
        <div id="wrapper">
            <header>
                <a id="logo" href="../../index.html"></a>
                <h1>SpaceXpress- The Sky is not the Limit.</h1>
                <form class="search" action="#" method="get">
                    <input type="text" placeholder="Search.." name="search">
                    <button type="submit"><i class="fa fa-search"></i></button>
                </form>
                <section id="user">
                    <h6>Welcome, Mai!</h6>
                    <a href="#"><img src="../../images/may4.png"></a>
                </section>
                <nav>
                    <ul>
                        <li><a href="#">Flights</a></li>
                        <li class="dropdown">
                            <button class="dropbtn">Trips</button>
                            <ul class="dropdown-content">
                                <li><a href="../../PlanTrip.html" class="w3-bar-item w3-button">Plan a trip</a></li>
                                <li><a href="#" class="w3-bar-item w3-button">Recommended journals</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Attractions</a></li>
                        <li><a href="#">My Profile</a></li>
                    </ul>
                </nav>
            </header>
            <section class="breadcrumbs">
                <h6>
                    <a href="../../index.html">Dashboard</a>
                    >> Trips >>
                    <a href="../../mytrips.html">My Trips</a>
                    >> Edit Trip
                </h6>
            </section>
            <section id="plan">
                <h2>Edit Trip</h2>
                <div id="accordion">
                    <div class="card">
                        <div id="heading3" class="card-header">
                            <!--<h5 class="mb-0">
                                <div class="cardNumber">3</div>
                                Summary
                            </h5>-->
                        </div>
                        <div id="collapse3" class="collapse show" aria-labelledby="heading3" data-parent="#accordion">
                            <div class="card-body">
                                <form id="tripForm3" action="#" method="get" target="frame3">
                                    <iframe name="frame3" hidden></iframe>
                                    <button id="contTrip3" class="btn btn-secondary" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal" type="submit">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <!-- Modal -->
            <div id="myModal" class="modal fade" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form  id="save" action="#" method="get" target="frame4">
                            <iframe name="frame4" hidden></iframe>
                            <div class="modal-body">
                                <h4 class="modal-title">Name your Trip:</h4>
                                <input class="form-control" type="text" id="groupName" name="groupName" required>

                                <table>
                                    <tr>
                                        <td>HD 219134 b</td>
                                        <td>&#09;03.04.2118-12.04.2118</td>
                                    </tr>
                                    <tr>
                                        <td>Kepler 10c</td>
                                        <td>&#09;15.04.2118-30.04.2118</td>
                                    </tr>
                                    <tr>
                                        <td>Namek</td>
                                        <td>&#09;02.05.2118-12.05.2118</td>
                                    </tr>
                                </table>

                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-default">Save</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
        <script src="../js/editTripScript.js"></script>
    </body>
</html>