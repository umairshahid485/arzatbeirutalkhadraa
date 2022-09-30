
var country_id = -1;
var state_id = -1;
// Country Update
$("#delivery_vendors_country").on("change", function () {
    for (i in countries) {
        if (countries[i].iso2 == this.value) {
            country_id = countries[i].id;
        }
        //$("#delivery_vendors_country").append(new Option(countries[i].name, countries[i].id));
    }
    // console.log('contru', country_id);
    csc_update(country_id, -1);
});

// State Update
$("#delivery_vendors_state").on("change", function () {
    console.log("State change " + this.value);

    for (i in states) {
        if (states[i].id == this.value) {
            state_id = states[i].id;
        }
    }
    // console.log(state_id);
    csc_update(-1, state_id);
});

function csc_update(cid, sid) {
    // Check and update state list
    if (cid != -1) {
        $("#delivery_vendors_state").empty();
        //$("#delivery_vendors_state").append(new Option(notselected_text, 0))
        for (i in states) {
            if (states[i].country_id == cid) {
                $("#delivery_vendors_state").append(new Option(states[i].name, states[i].id));
            }
        }
        // sid = states[0].id;
    }
    // Update City list
    $("#delivery_vendors_city").empty();
    //$("#delivery_vendors_city").append(new Option(notselected_text, 0))
    for (i in cities) {
        if (cities[i].state_id == sid) {
            $("#delivery_vendors_city").append(new Option(cities[i].name, cities[i].name));
        }
    }
    console.log("list updated.");
}
