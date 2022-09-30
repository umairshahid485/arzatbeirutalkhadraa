//Show Lottie Loader
function showLoader(){
    $(".transparent-loader").removeClass('d-none');
    $("body").addClass('pointer-none');
    return true;
}

//Hide Lottie Loader
function hideLoader(){
    $(".transparent-loader").addClass('d-none');
    $("body").removeClass('pointer-none');
    return true;
}

//Enable Disable Payment  Button When User Click On Pay
function enablePaymentButton(flag = false){
    if(flag)
        $(".payment-btn").removeAttr('disabled').removeClass('disable-payment');
    else
        $(".payment-btn").attr('disabled', 'disabled').addClass('disable-payment');
    return true;
}

$(document).off('keypress','.onlyDigitWithoutDecimal').on('keypress','.onlyDigitWithoutDecimal',function(event) {
    var $this = $(this);
    if (((event.which < 48 || event.which > 57) && (event.which != 0 && event.which != 8))) 
       event.preventDefault();
});

$(document).ready(function(){
    var menu_height = $(".booking-header").outerHeight();
    var window_width = $(window).width();
    if($(".menu-margin").length > 0 && window_width > 767){
        $(".menu-margin").css('margin-top',menu_height+'px');
        // if($(".full-height").length > 0)
        //     $(".full-height").css({ 'height': 'calc(100vh - '+menu_height+'px)' });
    }

    $( window ).resize(function() {
        var menu_height = $(".booking-header").outerHeight();
        if($(".menu-margin").length > 0){
            $(".menu-margin").css({'margin-top':menu_height+'px'});
        }
    });

    //To handle toggle menu events
    $('.navbar-collapse').on('show.bs.collapse', function (e) {
        $(".booking-header .navbar-brand, .nav-mobile-links").hide();
    });

    $('.navbar-collapse').on('hidden.bs.collapse', function (e) {
        $(".booking-header .navbar-brand, .nav-mobile-links").show();
    });
});