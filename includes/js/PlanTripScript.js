window.onload = function(){
    var destinationCounter = 1;
    var tripForm1 = document.getElementById("tripForm1");
    var addForm1 = document.getElementById("addForm1");

    function createForm1Input() {
        var planetNameInput = document.createElement("input");
        var startDateInput = document.createElement("input");
        var endDateInput = document.createElement("input");
        planetNameInput.type = "text";
        planetNameInput.name = "planet" + destinationCounter;
        planetNameInput.placeholder = "Planet Name";
        planetNameInput.id = "planet" + destinationCounter;
        startDateInput.type = "date";
        startDateInput.name = "start" + destinationCounter;
        startDateInput.id = "start" + destinationCounter;
        endDateInput.type = "date";
        endDateInput.name = "end" + destinationCounter;
        endDateInput.id = "end" + destinationCounter;
        if(destinationCounter > 1){
            tripForm1.insertBefore(document.createElement("br"), addForm1);
        }
        tripForm1.insertBefore(planetNameInput, addForm1);
        tripForm1.insertBefore(startDateInput, addForm1);
        tripForm1.insertBefore(endDateInput, addForm1);
        destinationCounter++;
    }

    addForm1.addEventListener("click", function() {createForm1Input();});
    createForm1Input();
};