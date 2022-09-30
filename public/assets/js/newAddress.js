$(document).ready(function () {});
function changeType(locationType) {
    var locationHouse = document.getElementById("locationHouse");
    var locationApartment = document.getElementById("locationApartment");
    var locationOffice = document.getElementById("locationOffice");

    var house = document.getElementById("house");
    var building = document.getElementById("building");
    var floor = document.getElementById("floor");
    var apartment_no = document.getElementById("apartment_no");
    var office_no = document.getElementById("office_no");

    $("#save-addresss .address_type").val(locationType);

    if (locationType === "house") {
        locationOffice.classList.remove("active");
        locationApartment.classList.remove("active");
        locationHouse.classList.add("active");

        house.style.display = "inline-block";
        building.style.display = "none";
        floor.style.display = "none";
        apartment_no.style.display = "none";
        office_no.style.display = "none";
    } else if (locationType === "apartment") {
        locationOffice.classList.remove("active");
        locationHouse.classList.remove("active");
        locationApartment.classList.add("active");

        house.style.display = "none";
        building.style.display = "inline-block";
        floor.style.display = "inline-block";
        apartment_no.style.display = "inline-block";
        office_no.style.display = "none";
    } else {
        locationHouse.classList.remove("active");
        locationApartment.classList.remove("active");
        locationOffice.classList.add("active");

        house.style.display = "none";
        building.style.display = "inline-block";
        floor.style.display = "inline-block";
        apartment_no.style.display = "none";
        office_no.style.display = "inline-block";
    }
}
