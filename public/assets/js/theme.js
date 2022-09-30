$(".home-menu-icon").on('click',function(){
    $('.home-menu-icon').removeClass("fa-bars").addClass("fa-times");
});
$(document).on('hide.bs.modal','#lr_sidebar_modal', function () {
    $('.home-menu-icon').removeClass("fa-times").addClass("fa-bars");
});