$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$(".update-cart").change(function (e) {
    e.preventDefault();

    var ele = $(this);

    $.ajax({
        url: $("#updatecart").val(),
        method: "patch",
        data: {
            id: ele.attr("data-id"),
            quantity: ele.val()
        },
        success: function (response) {
            window.location.reload();
        }
    });
});

$(".remove-from-cart").click(function (e) {
    e.preventDefault();
    var ele = $(this);

    if(confirm("Are you sure want to remove?")) {
        $.ajax({
            url: $("#removefromcart").val(),
            method: "DELETE",
            data: {
                id: ele.attr("data-id")
            },
            success: function (response) {
                window.location.reload();
            }
        });
    }
});

$(".remove-address").click(function (e) {
    e.preventDefault();
    var ele = $(this);

    if(confirm("Are you sure want to remove?")) {
        $.ajax({
            url: $("#removeAddress").val(),
            method: "DELETE",
            data: {
                id: ele.attr("data-id")
            },
            success: function (response) {
                window.location.reload();
            }
        });
    }
});

$(".update_address").click(function (e) {
    e.preventDefault();
    var aid = $(this).data('id');
    var type = $(this).data('type');
    var detail = $(this).data('detail');
    $("#aid").val(aid);
    $("#addressType").val(type);
    $.each(detail, function(key,valueObj){
        if (key === "area" || key === "country_code"){
            $("#"+key).val(valueObj);
        }else {
            $("input[name='" + key + "']").val(valueObj);
        }
    });

    $("#regular_modal").modal('show');
    $("#regular_modal #title").html('Update Address');
    changeType(type);
});

$(document).ready(function () {
if($('.owl-carousel').length > 0) {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 100,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 2
            }
        }
    });
}

if($("#address_form").length > 0 && $("#address_form").val() == 1){
    $("#regular_modal").modal('show');

    $(document).on('shown.bs.modal', "#regular_modal",function () {
        setTimeout(function(){
            var address_type = $("#addressType").val();
            changeType(address_type);
        }, 500);
    });
}

$(document).on('hidden.bs.modal', "#regular_modal",function () {
    $("#aid").val(0);
    $('#save-addresss')[0].reset();
    $("#regular_modal #title").html('Add New Address');
});

$(".home-global-search .store-search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    if($(".category-showcase").length > 0) {
        $(".category-list .category_position_bottom").filter(function () {
            if($(this).text().toLowerCase().indexOf(value) > -1){
                $(this).parent().show();
            }else{
                $(this).parent().hide();
            }
        });
    }
});

$(".category-product-list").hide();

if($('.show-category-product.active').length > 0){
    $(".home-global-search").hide();

    setTimeout(function(){
        var show_tab = $('.show-category-product.active').attr('href');
        $(show_tab).show();
    }, 800);
}

$('.show-category-product').on('click', function(){
     $('.show-category-product').removeClass('active');
     $('.show-category-product').removeClass('clicked');

     $(this).addClass('active clicked');

     $(".category-product-list").hide();
     var content = $(this).attr('href');
     $(content).show();
});


$("#search-order").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myOrders tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

$("input[type='radio'][name='select_address']").on('change', function(){
    var selected_address = $(this).val();
    $("#address_id").val(selected_address);
});

});

