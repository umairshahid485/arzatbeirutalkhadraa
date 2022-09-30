var countryCode = 'kw';
$(document).ready(function() {
	countryCodeFunc(countryCode);
});

function countryCodeFunc(countryCode) {
	if (countryCode == 'kuwait')
		countryCode = 'kw';
	$(".iti__selected-flag").remove();
	var input = document.querySelector("#mobile_number");
	var iti = window.intlTelInput(input, {
		separateDialCode: true,
		utilsScript: "assets/js/utils.js",
	}).setCountry(countryCode);
}