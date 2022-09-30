$(document).ready(function () {});
            $( function() {
		$( ".datepicker" ).datepicker(
			{
				format: "yyyy-mm-dd",
				autoclose: true
			}
		).on('change', function(){
			filterResults();
		});

		$( "#datepicker" ).datepicker(
			{
				format: "yyyy-mm-dd",
				autoclose: true
			}
		);
	} );
	function showFilters(filter = ''){
		if(filter=='merchant') {
			if ($(".filter-content-merchant").is(':visible')) {
				$(".filter-content-merchant").prev().find('i').toggleClass('fa fa-plus fa fa-remove');
				$(".filter-content-merchant").slideUp('fast', function () {
				});
			} else {
				$(".filter-content-merchant").prev().find('i').toggleClass('fa fa-plus fa fa-remove');
				$(".filter-content-merchant").slideDown('fast', function () {
				});
			}
		}

		if(filter=='date') {
			if ($(".filter-content-date").is(':visible')) {
				$(".filter-content-date").prev().find('i').toggleClass('fa fa-plus fa fa-remove');
				$(".filter-content-date").slideUp('fast', function () {
				});
			} else {
				$(".filter-content-date").prev().find('i').toggleClass('fa fa-plus fa fa-remove');
				$(".filter-content-date").slideDown('fast', function () {
				});
			}
		}

		if(filter=='status') {
			if ($(".filter-content-status").is(':visible')) {
				$(".filter-content-status").prev().find('i').toggleClass('fa fa-plus fa fa-remove');
				$(".filter-content-status").slideUp('fast', function () {
				});
			} else {
				$(".filter-content-status").prev().find('i').toggleClass('fa fa-plus fa fa-remove');
				$(".filter-content-status").slideDown('fast', function () {
				});
			}
		}
	}

	$('.btn-filter').click(function() {
		$('.filter-block').removeClass('d-none');
	});
	