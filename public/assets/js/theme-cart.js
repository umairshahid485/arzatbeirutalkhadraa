function viewProduct(){
	$(".prod-qty").val(1);
	$(".quantity-mgmt").find('.total-qty').html(1);
	$('body').addClass('no-touch');
	$('.floating-whatsapp').addClass('d-none');

	if($(".datepicker").length > 0) {
		$('.datepicker').datepicker({autoclose: true}).on('hide', function(event) {
			event.preventDefault();
			event.stopPropagation();
		});
	}
	
	//if checkbox all option is hide then also hide checkbox option name
	$(".custom-tick-section.theme-checkbox").each(function(){
		if(typeof $(this).children(".checkbox-text").html() == "undefined")
			$(this).hide();
	});
	
	//START show out of stock before click add to cart button
	if($(".out_of_stock_variation").length > 0) {
		$(".out_of_stock_variation").each(function(){
			var out_of_stock_val = $(this).val();
			$(".get-variation-details").each(function(){
				if($(this).attr('type') == "radio" && $(this).is('select')) {
					
				} else {
					var out_of_stock_margin = 'margin-left: 5px;';
					if(language == "ar")
						out_of_stock_margin = 'margin-right: 5px;';
					
					if($(this).attr('type') == "radio" && $(this).val() == out_of_stock_val) {
						var radio_has_attr = $(this).attr('disabled');
						if (typeof radio_has_attr !== typeof undefined && radio_has_attr !== false) {
						} else {
							$(this).prop('disabled', true);
							if(language == "ar") {
								$(this).prev('span').before('<span class="out_of_stock_bg" style="background: rgba(255,0,0,0.7);color:#fff;padding:2px 5px 2px 5px;border-radius: 10px;font-size: 11px;'+out_of_stock_margin+'">'+outOfStock+'</span>');
							} else {
								$(this).next('.product-radio').after('<span class="out_of_stock_bg" style="background: rgba(255,0,0,0.7);color:#fff;padding:2px 5px 2px 5px;border-radius: 10px;font-size: 11px;'+out_of_stock_margin+'">'+outOfStock+'</span>');
							}
						}
					}
					if($(this).is('select')) {
						$(".dropdown-variation.get-variation-details option").each(function(){
							if($(this).val() == out_of_stock_val) {
								var dropdown_has_attr = $(this).attr('disabled');
								if (typeof dropdown_has_attr !== typeof undefined && dropdown_has_attr !== false) {
								} else {
									$(this).prop('disabled', true);
									$(this).append('(<span class="out_of_stock_bg" style="background: rgba(255,0,0,0.7);color:#fff;padding:2px 5px 2px 5px;border-radius: 10px;font-size: 11px;'+out_of_stock_margin+'">'+outOfStock+'</span>)');
								}
							}
						});
					}
				}
			});
			
		});
	}
	//END show out of stock before click add to cart button
	
	//START when modal open then all variations price update in product main price
	variation_details_clicked = false;
	newPrice();
	$(".get-variation-details:first").trigger('change');
	//END when modal open then all variations price update in product main price

	// $(".datepicker-input-group").on('click',function(){
	// 	$(this).parents('.main-datepicker').find('input').focus();
	// });
	if(typeof fbq !== 'undefined'){
		fbq('track', 'PageView');
	}
	if(typeof snaptr !== 'undefined') {
		snaptr('track', 'PAGE_VIEW');
	}
}

function closeProduct(){
	$(".view-product-detail-page").find(".product-detailed-view").html('');
	$(".view-product-detail-page").addClass('d-none');
	$('#product_detail_modal').modal('hide');
	$('#product_detail_modal').find('.product-detailed-view').html('');
	$('body').removeClass('no-touch');
	$('.floating-whatsapp').removeClass('d-none');
}

//START allow maximum number of checkbox
$(document).off("click",".checkbox-variation").on("click",".checkbox-variation",function(){
	var variation_id = $(this).data("id");
	var total_checkbox = $('.checkbox_variation_'+variation_id).length;
	var selected_checkbox = $('.checkbox_variation_'+variation_id+':checked').length;
	var allow_max_no_of_checkbox = $('.checkbox_variation_'+variation_id).data('allow_max_no_of_checkbox');
	//var allow_min_no_of_checkbox = $('.checkbox_variation_' + variation_id).data('allow_min_no_of_checkbox');
	var chk_val = $(this).val();
	$(this).each(function () {
		if(!$(this).is(':checked')) {
			$('.checkbox_variation_'+variation_id).attr('checked', false);
		}
		var sThisVal = (this.checked ? $(this).val() : "");
		if(sThisVal !== "")
			$(this).attr('checked', true);
	});
	/* if($('.checkbox_value_'+chk_val).is(':checked')){
		$('.checkbox_value_'+chk_val).attr('checked', true);
	}else{
		$('.checkbox_value_'+chk_val).attr('checked', false);
	} */
	
	if(allow_max_no_of_checkbox != undefined && allow_max_no_of_checkbox == 1) {
		$('.checkbox_variation_' + variation_id).not(this).prop('checked', false);
		$('.checkbox_variation_' + variation_id).not(this).attr('checked', false);
	} else {
		if(allow_max_no_of_checkbox != undefined && allow_max_no_of_checkbox < selected_checkbox) {
			if(language == "ar")
				toastr['error']('ØªØ³ØªØ·ÙŠØ¹ Ø§Ø®ØªÙŠØ§Ø± '+allow_max_no_of_checkbox+' Ù…Ù† '+total_checkbox+' ØªØ³Øª','');
			else
				toastr['error']('You can select only '+allow_max_no_of_checkbox+' variant out of '+total_checkbox+'','');
			
			return false;
		}
	}
	//checkbox variation price change
	newPrice();
});
// END allow maximum number of checkbox

function newPrice() {
	let variation_checked = [];
	let price_action = type = "";
	let variation_price = total_variation_price = new_price = 0;
	let prod_price_for_variation = parseFloat(number_format($('.variation-price').val(),3,'.',''));

	$(".checkbox-variation").each(function () {
		if ($(this).prop('checked')) {
			if ($(this).data('variation') !== "//")
				variation_checked.push($(this).data('variation'));
		}
	});

	if (variation_checked.length > 0) {
		variation_checked.map(function (variation, index) {
			if (typeof variation !== "undefined") {
				type = variation.split("/")[2];
				price_action = variation.split("/")[0];

				if (type == '%' && prod_price_for_variation > 0) {
					variation_price = (prod_price_for_variation * parseFloat(number_format(variation.split("/")[1],3,'.',''))) / 100;
				} else {
					if (variation.split("/")[1] != "")
						variation_price = parseFloat(number_format(variation.split("/")[1],3,'.',''));
				}

				if (price_action == '+') {
					total_variation_price = variation_price + total_variation_price;
				} else {
					total_variation_price = total_variation_price - variation_price;
				}
			}
		});
	}

	new_price = prod_price_for_variation + total_variation_price;

	$('.modal-actual-price').val(new_price.toFixed(3));
	$('.current-price').text(new_price.toFixed(3) + " KWD");
}

function number_format(number, decimals, dec_point, thousands_sep) {
	// Strip all characters but numerical ones.
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec);
			return '' + Math.round(n * k) / k;
		};
	// Fix for IE parseFloat(0.55).toFixed(0) = 0;
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}

$(document).off("click",".btn-share").on("click",".btn-share",function(){
	if ($(".product-share").is(':visible')) {
		$(".product-share").slideUp();
	} else {
		$(".product-share").slideDown({});
		window.Sharer.init();
	}
});

$(document).off('click touchstart','.copy-data').on('click touchstart','.copy-data',function(){
	var product_url = $(this).data('url');
	var tempInput = document.createElement("input");
	tempInput.style = "position: absolute; left: -1000px; top: -1000px";
	tempInput.value = product_url;
	document.body.appendChild(tempInput);
	tempInput.setSelectionRange(0, 99999);
	tempInput.select();
	tempInput.focus();
	document.execCommand("copy");
	navigator.clipboard.writeText(tempInput.value);
	document.body.removeChild(tempInput);
	toastr['success']("Copied: " + product_url);
});

$(document).off("click",".add-qty").on("click",".add-qty",function(){
	var qty = $(".prod-qty").val();
	qty = Number(qty) + 1;
	$(".prod-qty").val(qty);
	$(".quantity-mgmt").find('.total-qty').html(qty);
});

$(document).off("click",".remove-qty").on("click",".remove-qty",function(){
	var qty = $(".prod-qty").val();
	if(qty > 1){
		qty = Number(qty) - 1;
		$(".prod-qty").val(qty);
		$(".quantity-mgmt").find('.total-qty').html(qty);
	}
});

///Add To Cart
$(document).off("click", ".add-to-cart,.direct-add-to-cart").on("click", ".add-to-cart,.direct-add-to-cart", function () {
	//Check is branch store is actived and if user not selected delivery type of area then we have to force user to select delivery area or branch
	if(isBranchStoreActive && isBranchStoreActive == 1 && typeof(selectedDeliveryMethod) != 'undefined' && ($.trim(selectedDeliveryMethod) == '' || (selectedDeliveryMethod != 'pickup' && selectedDeliveryMethod != 'delivery'))){
		$("#bottom_delivery_modal").modal('toggle');
		return false;
	}

	var product_id = $("#encoded_product_id").val();
	var total_qty = $("#prod_qty").val();
	var clicked_from = $(this).data('from');
	var showSuccessMsg = true;
	if (clicked_from == "direct") {
		product_id = $(this).data('id');
		total_qty = $(this).data('qty');
		showSuccessMsg = false;
	}
	var language = $(this).data('language');
	var merchant_store_listing_type = $(this).data('merchant_store_listing_type');

	if (total_qty < 1)
		toastr['error'](please_add_atlease_1_quantity, '');

	var dropdown_variation = [];
	var dropdown_selected_array = new Array();
	var radio_selected_array = new Array();
	if ($(".dropdown-variation").length > 0) {
		$(".dropdown-variation").each(function () {
			if (typeof dropdown_selected_array[$(this).attr('name')] === 'undefined')
				dropdown_selected_array[$(this).attr('name')] = $('[name="' + $(this).attr('name') + '"] option:selected').length;
			else if (typeof dropdown_selected_array[$(this).attr('name')] !== 'undefined' && radio_selected_array[$(this).attr('name')] != true)
				dropdown_selected_array[$(this).attr('name')] = $('[name="' + $(this).attr('name') + '"] option:selected').length;

			dropdown_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
		});
	}

	var radio_variation = [];
	if ($(".radio-variation").length > 0) {
		$(".radio-variation").each(function () {
			if (typeof radio_selected_array[$(this).attr('name')] === 'undefined')
				radio_selected_array[$(this).attr('name')] = $(this).prop('checked');
			else if (typeof radio_selected_array[$(this).attr('name')] !== 'undefined' && radio_selected_array[$(this).attr('name')] != true)
				radio_selected_array[$(this).attr('name')] = $(this).prop('checked');
			if ($(this).prop('checked')) {
				radio_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
			}
		});
	}

	var drop_down_radio_error_msg = '';
	for (key in radio_selected_array) {
		if (typeof key !== 'undefined') {
			if (typeof radio_selected_array[key] !== "undefined" && radio_selected_array[key] !== true) {
				drop_down_radio_error_msg = 'Please select ' + key;
			}
		}
	}
	for (key in dropdown_selected_array) {
		if (typeof key !== 'undefined') {
			if (typeof dropdown_selected_array[key] !== "undefined" && dropdown_selected_array[key] <= 0) {
				drop_down_radio_error_msg = 'Please select ' + key;
			}
		}
	}
	if (encoded_store_code != 'xq3nDWpdpG') {
		if ($.trim(drop_down_radio_error_msg) != '') {
			toastr['error'](drop_down_radio_error_msg, '');
			return false;
		}
	}
	var checkbox_variation = [];
	var minimum_chk = false;
	if ($(".checkbox-variation").length > 0) {
		$(".checkbox-variation").each(function () {
			var all_checkbox = $('.checkbox-variation').length;
			var all_not_selected_checkbox = $('.checkbox-variation:not(:checked)').length;
			var current_data_id = $(this).data('id');
			var total_checkbox = $('.checkbox_variation_' + current_data_id).length;
			var selected_checkbox = $('.checkbox_variation_' + current_data_id + ':checked').length;
			var allow_min_no_of_checkbox = $('.checkbox_variation_' + current_data_id).data('allow_min_no_of_checkbox');
			if (allow_min_no_of_checkbox != undefined && allow_min_no_of_checkbox > selected_checkbox) {
				toastr['error']('Minimum ' + allow_min_no_of_checkbox + ' variant required out of ' + total_checkbox + '', '');
				minimum_chk = true;
				return false;
			}
			if (all_checkbox == all_not_selected_checkbox) {
				var allow_min_no_of_checkbox = $('.checkbox-variation').data('allow_min_no_of_checkbox');

				if (allow_min_no_of_checkbox != undefined && allow_min_no_of_checkbox > 0) {
					toastr['error']('Please select variant', '');
					minimum_chk = true;
					return false;
				}
			}
			if ($(this).prop('checked')) {
				checkbox_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
			}
		});
	}

	if (minimum_chk == true) {
		return false;
	}

	var size_variation = [];
	if ($(".size-variation").length > 0) {
		$(".size-variation").each(function () {
			if ($(this).hasClass('btn-primary')) {
				size_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('data-name'), 'value': $(this).attr('data-value') });
			}
		});
	}

	var datepicker_variation = [];
	if ($(".datepicker-variation").length > 0) {
		$(".datepicker-variation").each(function () {
			datepicker_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
		});
	}

	var textfield_variation = [];
	if ($(".textfield-variation").length > 0) {
		$(".textfield-variation").each(function () {
			textfield_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
		});
	}

	var productData = {
		product_id: product_id,
		total_qty: total_qty,
		dropdown_variation: dropdown_variation,
		radio_variation: radio_variation,
		checkbox_variation: checkbox_variation,
		size_variation: size_variation,
		datepicker_variation: datepicker_variation,
		textfield_variation: textfield_variation,
		from_page: 'product_modal',
		encoded_store_code: encoded_store_code,
		_token: _token
	};

	if (total_qty > 0) {
		$.ajax({
			type: 'post',
			url: siteURL + '/add_to_cart',
			data: productData,
			async: false,
			dataType: 'json',
			success: function (resp) {
				if (resp.success) {

					//Update cart total badge
					$(".cart-total").find('span').html(resp.total_cart);

					//Add border and total qty
					$(document).find('.product-case.'+product_id).addClass('in-cart');
					$(document).find('.product-case.'+product_id).find('a, .prod-description').find('.product-count').html(resp.currentProductQntyFromCart + 'x');

					//is isItemModifed mean merchant has made changes in product variation
					if (resp.isItemModifed)
						window.location.href = siteURL + '/checkout/' + encoded_store_code;

					closeProduct();
					if ($(".cart-menu").length > 0) {
						$(".dropdown-product-item").remove();
						$(".cart-list-above").before(resp.cartHTML);
						$(".total-cart-amt").html(Number(resp.cart_amt).toFixed(2) + ' KD');
						
						// START bottom review cart
						$(".review-cart-section").removeClass("d-none").addClass("d-flex");
						$(".page-grid .review-order").removeClass("d-none").addClass("d-block");
						$(".review-cart-qty").html(resp.total_cart);
						$(".review-cart-total").html(Number(resp.cart_amt).toFixed(2) + ' KWD');
						// END bottom review cart

						$('.empty-cart-msg').hide();
						var body_bg_color='';
						var product_border_color = body_bg_color;
						// user id 9273
						if (encoded_store_code == 'bXnW3mBnWz')
							product_border_color = '#3FA7D6';

						if (encoded_store_code == 'xgnl1akLJp' || encoded_store_code == 'w4d3w91dDq' || encoded_store_code == 'Y7do3RQdeK')
							product_border_color = body_bg_color;

						if (language == "ar") {
							$('.border_' + product_id).css('border-right', '5px solid ' + product_border_color);
							var current_product_qnty_from_cart = 'x' + resp.currentProductQntyFromCart;
						} else {
							$('.border_' + product_id).css('border-left', '5px solid ' + product_border_color);
							var current_product_qnty_from_cart = resp.currentProductQntyFromCart + 'x';
						}
						$('.cart_product_count_' + product_id).remove();

						if (merchant_store_listing_type == "list") {
							$('.product_name_' + product_id).before('<span class="product_count_span cart_product_count_' + product_id + '" style="color: '+product_border_color+';">' + current_product_qnty_from_cart + '</span>');
						} else {
							if (language == "ar") {
								$('.product_name_' + product_id).prepend('<span class="product_count_span cart_product_count_' + product_id + '" style="color: '+product_border_color+';">' + current_product_qnty_from_cart + '</span>');
							} else {
								$('.product_name_' + product_id).prepend('<span class="product_count_span cart_product_count_' + product_id + '" style="color: '+product_border_color+';">' + current_product_qnty_from_cart + '</span>');
							}
						}
					}
					if(typeof fbq !== 'undefined'){
						fbq('track', 'AddToCart');
					}
					if(typeof snaptr !== 'undefined') {
						snaptr('track', 'ADD_CART');
					}

					return false;
				} else
					toastr['error'](resp.msg, '');

				return false;
			}, error: function (error) {
				toastr['error']('Error:' + error, '');
				return false;

			}
		});
	}

});

//validate variation available or not. if available then show price value of variation
$(document).off("change", ".get-variation-details").on("change", ".get-variation-details", function () {
	
	var product_id = $("#encoded_product_id").val();
	var total_qty = $("#prod_qty").val();

	if (total_qty < 1)
		toastr['error'](please_add_atlease_1_quantity, '');

	var dropdown_selected = false;
	var radio_selected = false;

	var dropdown_variation = [];
	if ($(".dropdown-variation").length > 0) {
		$(".dropdown-variation").each(function () {
			dropdown_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
			if ($(this).val() != '')
				dropdown_selected = true;
		});
	}

	var radio_variation = [];
	if ($(".radio-variation").length > 0) {
		$(".radio-variation").each(function () {
			if ($(this).prop('checked')) {
				radio_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
				if ($(this).val() != '')
					radio_selected = true;
			}
		});
	}

	var checkbox_variation = [];
	if ($(".checkbox-variation").length > 0) {
		$(".checkbox-variation").each(function () {
			if ($(this).prop('checked')) {
				checkbox_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
			}
		});
	}

	var size_variation = [];
	if ($(".size-variation").length > 0) {
		$(".size-variation").each(function () {
			if ($(this).hasClass('btn-primary')) {
				size_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('data-name'), 'value': $(this).attr('data-value') });
			}
		});
	}

	var datepicker_variation = [];
	if ($(".datepicker-variation").length > 0) {
		$(".datepicker-variation").each(function () {
			datepicker_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
		});
	}

	var textfield_variation = [];
	if ($(".textfield-variation").length > 0) {
		$(".textfield-variation").each(function () {
			textfield_variation.push({ 'id': $(this).data('id'), 'name': $(this).attr('name'), 'value': $(this).val() });
		});
	}

	var productData = {
		product_id: product_id,
		total_qty: total_qty,
		dropdown_variation: dropdown_variation,
		radio_variation: radio_variation,
		checkbox_variation: checkbox_variation,
		size_variation: size_variation,
		datepicker_variation: datepicker_variation,
		textfield_variation: textfield_variation,
		from_page: 'product_modal',
		encoded_store_code: encoded_store_code,
		request_type: 'get_variation_details',
		_token: _token
	};
		
	if(total_qty > 0 && (radio_selected || dropdown_selected)){
		$.ajax({
			type: 'post',
			url: siteURL+'/add_to_cart',
			data: productData,			 
			dataType: 'json',
			success:function(resp){
				if(resp.success){
					if(typeof(resp.data) !== "undefined") {
						var data_p = resp.data[0];
						$(".jssort101").find("img[data-vimg='var0"+data_p.id+"0']").trigger("click");
						$(".current-price").html(number_format(data_p.variation_price,3,'.','')+' KWD');
						$(".modal-actual-price").val(data_p.variation_price);
						$(".variation-price").val(data_p.variation_price);
						setTimeout(function () {
							newPrice();
						}, 100);
					}
				}else if(resp.msg != 'get_variation_details'){
					if(variation_details_clicked === true)
						toastr['error'](resp.msg,'');
					else
						variation_details_clicked = true;
				}
			},error:function(error){
				toastr['error']('Something goes wrong. Please try again later','');
			}
		});
	}
	
	return false;
});

/*
 * Below all events of bootstrap modals
 * show.bs.modal: fired just before the modal is open.
 * shown.bs.modal: fired after the modal is shown.
 * hide.bs.modal: fired just before the modal is hidden.
 * hidden.bs.modal: fired after the modal is closed.
*/
$('#product_detail_modal').on('show.bs.modal', function (e) {
	// $(".ltr-1usrurx").hide();
});

$('#product_detail_modal').on('hide.bs.modal', function (e) {
	$("#product_detail_modal").find(".product-detailed-view").html('');
});

$(document).on('show.bs.modal', function () {
	if($('.announcement-block').is(':visible') && $('.add-top-header').is(':visible')) {
		$('#lr_sidebar_modal').css({'margin-top':'115px'});
	} else if($('.announcement-block').is(':visible') && !$('.add-top-header').is(':visible')) {
		$('#lr_sidebar_modal').css({'margin-top':'60px'});
	} else if(!$('.announcement-block').is(':visible') && $('.add-top-header').is(':visible')) {
		$('#lr_sidebar_modal').css({'margin-top':'56px'});
	}

	//remove z-index of main feature div because it's overlapping when product details modal is open
	if ($(".add-app-feature").is(':visible')){
		$(".main-feature-block").css({'z-index':0});
	}
});

$(document).on('hide.bs.modal', function () {
	$('#lr_sidebar_modal').css({'margin-top':'0px'});
	
	//add z-index again because user close the modal
	if ($(".add-app-feature").is(':visible')){
		$(".main-feature-block").css({'z-index': 9999});
	}
});

$(document).off("click", ".header-remove-from-cart").on("click", ".header-remove-from-cart", function () {
	var that = $(this);
	var product_type = $(this).attr('data-type');
	var product_id = $(this).attr('data-id');
	var data_from = $(this).attr('data-from');
	var data_index = $(this).attr('data-index');
	var data_main_product_id = $(this).attr('data-main_product_id');
	var language = $(this).attr('data-language');

	var that = $(this);
	if ($.trim(product_id) != '') {
		$.ajax({
			type: 'get',
			url: siteURL + '/remove_ustore_cart',
			data: { merchant_id: merchantIDEncode, product_id: product_id, op: 'delete_all', language: 'en', product_type: product_type, encoded_store_code: encoded_store_code, data_from: data_from, data_index: data_index },
			dataType: 'json',
			success: function (resp) {
				if (resp.success) {
					toastr['success'](resp.msg, '');
					that.parents('.dropdown-product-item').slideUp(function () {
						$(this).remove();
					});

					$(".cart-badge").html(resp.total_qty);
					if (resp.total_qty > 0)
						$(".empty-cart-msg").hide();
					else
						$(".empty-cart-msg").show();

					//START bottom checkout button
					$(".total-qty-badge").html(resp.total_qty);
					$(".total-amt-badge").html(Number(resp.total_amount).toFixed(2) + ' KD');

					if (resp.currentProductQntyFromCart > 0) {
						$(document).find('.product-case.'+data_main_product_id).addClass('in-cart');
						$(document).find('.product-case.'+data_main_product_id).find('a, .prod-description').find('.product-count').html(resp.currentProductQntyFromCart + 'x');
					} else {
						$('.cart_product_count_' + data_main_product_id).remove();
						$(document).find('.product-case.'+data_main_product_id).removeClass('in-cart');
						$(document).find('.product-case.'+data_main_product_id).find('a, .prod-description').find('.product-count').html('');
					}

					if (Number(resp.total_qty) == 0) {
						$(".ltr-1usrurx").addClass('d-none');
						$("footer").find('.text-center.text-muted').removeClass('pb-4');
					}
					//END bottom checkout button

					//Add to cart list
					if ($(".cart-menu").length > 0) {
						$('.cart-menu').find('.dropdown-product-item').remove();
						$(".cart-list-above").before(resp.cartHTML);
						$(".cart-badge").html(resp.total_qty);
						$(".total-cart-amt").html(Number(resp.total_amount).toFixed(2) + ' KD');
					}

				} else if (!resp.success) {
					toastr['error'](resp.msg, '');
				}
			}
		});
	}
	return false;
});


$(document).off("click", ".delete-product .fa-trash-o, .grid-delete-product").on("click", ".delete-product .fa-trash-o, .grid-delete-product", function () {
	var prod_id = $(this).data('prod_id');
	var from = $(this).data('from');
	console.log({ encoded_store_code:encoded_store_code,prod_id:prod_id,from:from });
	if($.trim(prod_id) != '' && from == 'product_list'){
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': _token
			},
			type: 'delete',
			url: siteURL+'/delete_product',
			data: { encoded_store_code:encoded_store_code,prod_id:prod_id,from:from },
			dataType: 'json',
			success : function(resp){
				if(resp.success){
					//Update cart total badge
					$(".cart-total").find('span').html(resp.total_qty);

					// START bottom review cart
					$(".review-cart-section").removeClass("d-flex").addClass("d-none");
					$(".page-grid .review-order").removeClass("d-block").addClass("d-none");
					// END bottom review cart

					//Add border and total qty
					$(document).find('.product-case.'+prod_id).removeClass('in-cart');
					$(document).find('.product-case.'+prod_id).find('a, .prod-description').find('.product-count').html('');
				}else{
				}
			},error:function(error){
				toastr['error']('Something goes wrong. Please try again later','');
			}
		});
	}
});


$(document).off("click", ".check-for-min-order").on("click", ".check-for-min-order", function (e) {
	var total_amount = $(".total-cart-amt").html();
	total_amount = total_amount.replace('KD', '');
	if (Number(minimum_order) > 0 && Number(total_amount) < Number(minimum_order)) {
		toastr['error'](msg_minimum_order_set_by_user, '');
		e.preventDefault();
		return false;
	}
	if ($(this).data('store_open_msg') == "closed") {
		toastr['error'](store_opens_msg, '');
		e.preventDefault();
		return false;
	}
});