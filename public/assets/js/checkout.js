        var siteURL = "https://ustore.upayments.com/buyer";
        var addresses = JSON.parse(
            '[{"id":1393,"buyer_id":98811,"full_name":"Saad Munir","email":"muhammadmunir646464@gmail.com","mobile_number":"95623485","country":"kuwait","country_code":"kuwait","area":"bniad_alqar","block":"52","address_type":"office","house":"","street":"63","building":"65","floor":"2","office_no":"8","apartment_no":"","avenue":"Lahore","deleted_at":null,"created_at":"2022-03-16 10:16:04","updated_at":"2022-03-16 10:16:04"},{"id":1392,"buyer_id":98811,"full_name":"Saad Munir","email":"muhammadmunir646464@gmail.com","mobile_number":"95623485","country":"kuwait","country_code":"kuwait","area":"sharq","block":"52","address_type":"apartment","house":"","street":"10","building":"65","floor":"2","office_no":"","apartment_no":"6","avenue":"Lahore","deleted_at":null,"created_at":"2022-03-16 10:15:33","updated_at":"2022-03-16 10:15:33"},{"id":1391,"buyer_id":98811,"full_name":"Saad Munir","email":"muhammadmunir646464@gmail.com","mobile_number":"95623485","country":"kuwait","country_code":"kuwait","area":"dasman","block":"52","address_type":"house","house":"32","street":"6","building":"","floor":"","office_no":"","apartment_no":"","avenue":"Lahore","deleted_at":null,"created_at":"2022-03-16 10:14:52","updated_at":"2022-03-16 10:14:52"}]'
        );

        var promo_code = "";
        var selected_country = "";
        var selected_estimated_time = "";
        var clicked_delivery_address = false;
        var free_delivery = 1;
        var encoded_store_code = "1aL5886nwO";
        var countryCode = "kw";
        var last_updated_shipping = "";
        var cash_on_delivery = false;
        var selected_address_id = "";
        var sel_pref_date = "";
        var show_preferred_time = 1;
        var homesprays_store = false;
        var mhash = "Dlrlj66aoY";
        var total_amount = 73;
        var uploaded_doc = "";
        var document_required = "";
        var order_delivery_method = "delivery";
        var schedule_order = "Schedule Order";
        var pickupTimeSlotsDateWise = [];

        var cookieDeliveryType = "delivery";

        function isNumber(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;

            if (charCode < 48 || charCode > 57) {
                return false;
            }

            return true;
        }
        $(function () {
            function countryCodeFunc(countryCode) {
                if (countryCode == "kuwait") countryCode = "kw";
                $(".iti__selected-flag").remove();
                var input = document.querySelector("#mobile_number");
                var iti = window
                    .intlTelInput(input, {
                        separateDialCode: true,
                        utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                    })
                    .setCountry(countryCode);

                if ($("#mobile_number_pickup").length > 0) {
                    var pickup_input = document.querySelector("#mobile_number_pickup");
                    if (pickup_input != null) {
                        var iti = window
                            .intlTelInput(pickup_input, {
                                separateDialCode: true,
                                utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                            })
                            .setCountry(countryCode);
                    }
                }
            }
            if ($("#mobile_number").length > 0) {
                countryCodeFunc("kw");
            }
            countryCodeFuncAddress("kw");
            function countryCodeFuncAddress(countryCode) {
                if (countryCode == "kuwait") countryCode = "kw";
                //$(".iti__selected-flag").remove();
                var input = document.querySelector(".mobile_number_checkout");
                var iti = window
                    .intlTelInput(input, {
                        separateDialCode: true,
                        utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                    })
                    .setCountry(countryCode);
            }

            var regex_email = /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i;

            $("#txtEmail").on("keyup", function () {
                setTimeout(() => {
                    if (regex_email.test($("#txtEmail").val())) {
                        if ($("#txtEmail").val() != "") {
                            $.ajax({
                                headers: {
                                    "X-CSRF-TOKEN": "tV7ivibZyjiqZRR7Wosg4RcFvCoM9eqihdi8bmII",
                                },
                                type: "POST",
                                url: "https://ustore.upayments.com/buyer/check_email_checkout",
                                data: { merchant_id: "Dlrlj66aoY", email: $("#txtEmail").val() },
                                dataType: "json",
                                success: function (resp) {
                                    if (resp.success) {
                                        $("[name='email']").val($("#txtEmail").val());
                                        $(".ck-address-section").hide();
                                        $(".ck-login-section").show();
                                    }
                                },
                            });
                        }
                    }
                }, 200);
            });

            $("#mobile_number").on("change", function () {
                if ($("[name='mobile_number']:visible").val().length < 8 && $("#store_pickup").val() == "delivery") {
                    $(this).addClass("has-error");
                }
            });

            if (selected_address_id == "") {
                $(".delivery-type").removeClass("active");
                $("[data-type=" + type + "]").addClass("active");
            }
            if (selected_address_id == "") {
                $(".appt-off-address, .appt-address, .off-address, .house-address").hide();
                if (type == "apartment" || type == "office") {
                    $(".appt-off-address").show();
                    if (type == "apartment") $(".appt-address").show();
                    if (type == "office") $(".off-address").show();
                    $(".house-address").find('[name="house"]').removeAttr("required");
                    $(".house-address").find('[name="house"]').val("");
                } else if (type == "house") {
                    if ($("#delivery_vendors_country").length > 0) {
                        if ($("#delivery_vendors_country").val() != "kuwait") {
                            $(".house-address").hide();
                        } else {
                            $(".house-address").show();
                            if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                        }
                    } else {
                        $(".house-address").show();
                        if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                    }
                }
            }

            $(document)
                .off("click", ".ck-as-guest")
                .on("click", ".ck-as-guest", function () {
                    $(".ck-address-section").show();
                    $(".ck-login-section").hide();
                });

            $(document)
                .off("click", ".show-login")
                .on("click", ".show-login", function () {
                    $(".login-msg").hide();
                    $(".show-login").slideDown({});
                });
            $(document)
                .off("click", ".add_new_address")
                .on("click", ".add_new_address", function () {
                    $("#title").html("Add New Address");
                    $("#save-addresss").find("input[type=text], textarea").val("");
                    $("[data-type=house]").trigger("click");
                    countryCodeFuncAddress("kw");
                    $(".select2-country-checkout").val("kuwait").change();
                });

            $("#checkout_login").submit(function (e) {
                e.preventDefault();

                let url = $(this).attr("action");
                let formData = new FormData(this);
                let that = $(this);

                $.ajax({
                    type: "POST",
                    url: url,
                    data: formData,
                    beforeSend: function () {
                        $(".btnLogin").prop("disabled", true);
                    },
                    success: function (res) {
                        $(".btnLogin").prop("disabled", false);

                        if (res.success) {
                            toastr["success"](res.msg, "");
                            $(that)[0].reset();

                            if (res.url) {
                                window.location.href = res.url;
                            }
                        } else {
                            toastr.error(res.msg, "");
                        }
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                });
            });

            /*$(document).off('click','.do-login').on('click','.do-login',function(){
                $(".ck-address-section,.ck-login-section").hide();
                $(".delivery-to-section,.saved-card-section").show();
                $(".toggle-outer").trigger('click');
            });*/

            //Hide / Show transactions details if has any
            $(document)
                .off("click", ".show-transaction")
                .on("click", ".show-transaction", function () {
                    if ($(".transaction-details").is(":visible")) {
                        $(".transaction-details").slideUp("fast", function () {
                            $(".show-transaction").removeClass("fa fa-chevron-circle-up").addClass("fa fa-chevron-circle-down");
                        });
                    } else {
                        $(".transaction-details").slideDown("fast", function () {
                            $(".show-transaction").removeClass("fa fa-chevron-circle-down").addClass("fa fa-chevron-circle-up");
                        });
                    }
                    return false;
                });

            $(document)
                .off("click", ".apply-coupon-cover")
                .on("click", ".apply-coupon-cover", function () {
                    if ($(".expanded-promo").is(":visible")) {
                        $(".expanded-promo").slideUp("fast", function () {
                            $(".apply-coupon-cover").find(".expand-icon").removeClass("fa fa-chevron-up").addClass("fa fa-chevron-down");
                        });
                    } else {
                        $(".expanded-promo").slideDown("fast", function () {
                            $(".apply-coupon-cover").find(".expand-icon").removeClass("fa fa-chevron-down").addClass("fa fa-chevron-up");
                        });
                    }
                    return false;
                });

            $(document)
                .off("click", ".terms-expand-collapse")
                .on("click", ".terms-expand-collapse", function () {
                    if ($(".expanded-terms").is(":visible")) {
                        $(".expanded-terms").slideUp("fast", function () {
                            $(".delivery-note-section").find(".terms-expand-collapse").removeClass("fa fa-chevron-up").addClass("fa fa-chevron-down");
                        });
                    } else {
                        $(".expanded-terms").slideDown("fast", function () {
                            $(".delivery-note-section").find(".terms-expand-collapse").removeClass("fa fa-chevron-down").addClass("fa fa-chevron-up");
                        });
                    }
                    return false;
                });

            $("[name='inline_create_account']").on("click", function () {
                if ($(this).prop("checked")) {
                    $(".inline-create-account").show();
                    $("#inline_create_account").val(1);
                } else {
                    $(".inline-create-account").hide();
                    $("#checkout_password").val("");
                    $("#checkout_conf_password").val("");
                    $("#inline_create_account").val(0);
                }
            });

            $(document)
                .off("click", '[name="save_cc_card"]')
                .on("click", '[name="save_cc_card"]', function () {
                    if ($(this).prop("checked")) {
                        $(".saved-card-section").show();
                    } else {
                        $(".saved-card-section").hide();
                    }
                });

            $(document)
                .off("click", ".delivery-button")
                .on("click", ".delivery-button", function () {
                    var type = $(this).data("type");
                    $(".delivery-button").removeClass("active");
                    $(this).addClass("active");
                    $(".address_type").val(type);

                    $(".appt-off-address, .appt-address, .off-address, .house-address").hide();
                    if (type == "apartment" || type == "office") {
                        $(".appt-off-address").show();
                        if (type == "apartment") $(".appt-address").show();
                        if (type == "office") $(".off-address").show();
                        $(".house-address").find('[name="house"]').removeAttr("required");
                        $(".house-address").find('[name="house"]').val("");
                    } else if (type == "house") {
                        if ($("#delivery_vendors_country").length > 0) {
                            if ($("#delivery_vendors_country").val() != "kuwait") {
                                $(".house-address").hide();
                            } else {
                                $(".house-address").show();
                                if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                            }
                        } else {
                            $(".house-address").show();
                            if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                        }
                    }
                });

            $("[name='estimated_delivery_time']").on("click", function () {
                var delivery_type = $("input[name='estimated_delivery_time']:checked").val();
                if (delivery_type == "schedule_delivery") {
                    $(".schedule-delivery-section").show();
                    $("#modal-datepicker").find(".pick-date").find(".btn-block").removeClass("theme-btn");
                } else {
                    $(".schedule-delivery-section").hide();
                    $("#modal-datepicker").find(".time-frame").removeClass("selected");
                    $("#modal-datepicker").find(".pick-date").find(".btn-block").addClass("theme-btn");
                }
            });

            $(document)
                .off("click", ".time-frame")
                .on("click", ".time-frame", function () {
                    $("#modal-datepicker").find(".time-frame").removeClass("selected");
                    $(this).addClass("selected");
                    $("#modal-datepicker").find(".pick-date").find(".btn-block").addClass("theme-btn");
                });

            $(document)
                .off("click", ".confirm-date")
                .on("click", ".confirm-date", function () {
                    var delivery_type = $("#modal-datepicker").find("input[name='estimated_delivery_time']:checked").val();
                    var selected_time_slot_text = $("#modal-datepicker").find(".time-frame.selected").html();
                    var selected_time = $("#modal-datepicker").find(".time-frame.selected").attr("data-slot");
                    var selectedDate = $(".show-calendar").datepicker("getFormattedDate");
                    var preferred_delivery_time = $(".show-calendar").datepicker("getFormattedDate");

                    if (delivery_type == "schedule_delivery") {
                        if (selectedDate === "") {
                            toastr["error"]("Please Select Date");
                            return false;
                        }
                        if (preferred_delivery_time === "") {
                            toastr["error"]("Time slot not available.Please select other Date");
                            return false;
                        }
                    }
                    if (preferred_delivery_time == "") {
                        preferred_delivery_time = $("#preferred_delivery_time").val();
                    }
                    if (!$(this).hasClass("theme-btn")) {
                        toastr["error"]("Please Select Delivery Time");
                        return false;
                    }
                    if (selectedDate) {
                        selectedDate = new Date(selectedDate);
                    } else {
                        selectedDate = new Date();
                    }

                    if (language == "en") {
                        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    } else {
                        var days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
                        var months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
                    }

                    var day = selectedDate.getDate();
                    var dayName = days[Number(selectedDate.getDay())];
                    var monthName = months[Number(selectedDate.getMonth())];
                    var year = selectedDate.getFullYear();
                    var selected_date_text = dayName + ", " + day + " " + monthName;

                    if (delivery_type == "schedule_delivery") {
                        $(".display-schedule-delivery").find(".date-block").html(selected_date_text);
                        $(".display-schedule-delivery").find(".time-block").html(selected_time_slot_text);
                        $(".display-schedule-delivery").show();
                        $(".display-fix-delivery").hide();
                        $("#preferred_delivery_time").val(preferred_delivery_time);
                        $("#preferred_delivery_time_part").val(selected_time);
                    } else {
                        $(".display-schedule-delivery").hide();
                        $(".display-fix-delivery").show();
                    }

                    $("#modal-datepicker").modal("hide");
                });

            var current_dates = fmt.formatDate("2022-03-17", "Y-m-d");
            $(".show-calendar")
                .datepicker({
                    format: "yyyy-mm-dd",
                    inline: true,
                    autoclose: true,
                    startDate: new Date("2022-03-17"),
                    minDate: new Date("2022-03-17"),
                    //todayHighlight: true,
                    container: "#modal-datepicker",
                    beforeShowDay: function (date) {
                        dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
                        if (cnls_dates !== undefined && cnls_dates.indexOf(dmy) != -1) {
                            return false;
                        } else {
                            if ($.inArray(fmt.formatDate(dmy, "d-m-Y"), cnls_dates) >= 0) {
                                return false;
                            } else {
                                var current_date = "";
                                $.each(cnsl_dt_time_slot, function (key, val) {
                                    if (val != "") {
                                        current_date = key;
                                        return false;
                                    }
                                });
                                if (current_date != "") {
                                    var parts = current_date.split("-");
                                    current_dates = parts[2] + "-" + parts[1] + "-" + (parseInt(parts[0], 10) % 100);
                                }
                                return true;
                            }
                        }
                    },
                })
                .on("hide", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                })
                .on("changeDate", function (event) {
                    $(".timeslot_div").addClass("d-none");
                    var selectedDate = $(".show-calendar").datepicker("getFormattedDate");
                    $("." + selectedDate).removeClass("d-none");
                    $("#modal-datepicker").find(".time-frame").removeClass("selected");
                    $("#modal-datepicker").find(".pick-date").find(".btn-block").removeClass("theme-btn");
                })
                .datepicker("setDate", current_dates);

            // START modal datepicker target
            $(document)
                .off("click", ".schedule-delivery-target")
                .on("click", ".schedule-delivery-target", function () {
                    if ($(window).width() > 991) {
                        $("#modal-datepicker").removeClass(["modal-bottom", "fade"]);
                    } else {
                        $("#modal-datepicker").removeClass(["modal-dialog-centered"]);
                    }
                    if ($("[name='estimated_delivery_time']").is(":checked")) {
                        $("#modal-datepicker").find(".pick-date").find(".btn-block").addClass("theme-btn");
                    }
                });
            // END modal datepicker target
        });

        if ($(".select2-country").length > 0) {
            //When International delivery then kuwait is automatically selected
            if ($(".select2-country option[value='kuwait']").val() !== undefined && $(".select2-country  > option").length > 2) $(".select2-country").val("kuwait").change();
            $(".select2-country")
                .select2({
                    allowClear: false,
                    containerCssClass: "select2-checkout",
                    dropdownCssClass: "select2-checkout",
                    placeholder: "Country",
                    width: null,
                    debug: true,
                    language: select2_lang,
                    // minimumResultsForSearch: -1
                })
                .on("select2:open", function () {
                    $(".select2-dropdown--above").attr("id", "fix");
                    $("#fix").removeClass("select2-dropdown--above");
                    $("#fix").addClass("select2-dropdown--below");
                    // $('html,body').animate({ scrollTop: $(".select2-area").offset().top-150}, 1000);
                });

            $(document)
                .off("change", "#estimated_delivery_time")
                .on("change", "#estimated_delivery_time", function () {
                    if ($(this).val() == "schedule_delivery") {
                        $(".schedule-delivery-section").show();
                        $("#modal-datepicker").find(".pick-date").find(".btn-block").removeClass("theme-btn");
                    } else {
                        $(".schedule-delivery-section").hide();
                        $("#modal-datepicker").find(".time-frame").removeClass("selected");
                        $("#modal-datepicker").find(".pick-date").find(".btn-block").addClass("theme-btn");
                    }
                });

            // Start Phone number with country code plugin
            function countryCodeFunc(countryCode) {
                if (countryCode == "kuwait") countryCode = "kw";
                $(".iti__selected-flag").remove();
                var input = document.querySelector("#mobile_number");
                var iti = window
                    .intlTelInput(input, {
                        separateDialCode: true,
                        utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                    })
                    .setCountry(countryCode);

                if ($("#mobile_number_pickup").length > 0) {
                    var input = document.querySelector("#mobile_number_pickup");
                    var iti = window
                        .intlTelInput(input, {
                            separateDialCode: true,
                            utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                        })
                        .setCountry(countryCode);
                }
            }

            countryCodeFuncAddress("kw");
            function countryCodeFuncAddress(countryCode) {
                if (countryCode == "kuwait") countryCode = "kw";
                $(".modal-checkout").find(".iti__selected-flag").remove();
                var input = document.querySelector(".mobile_number_checkout");
                var iti = window
                    .intlTelInput(input, {
                        separateDialCode: true,
                        utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                    })
                    .setCountry(countryCode);
            }
            // End Country Code
            $(document)
                .off("change", ".select2-country")
                .on("change", ".select2-country", function () {
                    if ($(this).val() != "kuwait") {
                        // special notes label change

                        $(".select2-area").val("").change();
                        $(".governate-main-div,.area-main-div").hide();

                        //START custom area
                        $(".inter_country-area-main-div").show();
                        // if(encoded_store_code == '1aL5AwALwO') {
                        if (last_updated_shipping === "dhl") $(".international-country-than-hide").hide();
                        if (last_updated_shipping === "dhl" || last_updated_shipping === "ocs") {
                            $(".international-country-than-show").show();
                            $(".inter_country-area-main-div").hide();
                        }
                        $(".city-type-div").show();

                        if (encoded_store_code == "1aL5WzQdwO" || encoded_store_code == "1aL5AwALwO") {
                            $(".international-country-hide").hide();
                            var type = "house";
                            $(".address_type").val(type);
                            $(".delivery-button").removeClass("active");
                            $("[data-type=" + type + "]").addClass("active");
                            $(".appt-off-address, .appt-address, .off-address, .house-address").hide();
                            $(".house-address").show();
                        }
                        if (last_updated_shipping === "dhl") {
                            $('input[name="preferred_delivery_time"]').val("");
                            $('input[name="preferred_delivery_time"]').prop("required", false); // optional
                            //if($("#preferred_delivery_time_part").length > 0)
                            //$('#preferred_delivery_time_part').select2("val", "");

                            $("#preferred_delivery_time_part").prop("required", false); // optional
                        }
                        if (last_updated_shipping === "dhl" || last_updated_shipping === "ocs") {
                            if (last_updated_shipping === "dhl") {
                                $('input[name="inter_country_state"]').prop("required", false); // optional
                            } else {
                                $('input[name="inter_country_state"]').prop("required", true); // mandatory
                            }
                            $('input[name="inter_country_area"]').prop("required", true); // mandatory
                            $('input[name="zip_code"]').prop("required", true); // mandatory
                        }
                        // }

                        //START country not kuwait then remove select2
                        $(".dropdown-block").removeClass("select2-hidden-accessible");
                        $(".dropdown-block").attr("aria-hidden", "false");
                        $(".dropdown-block").next(".select2").addClass("d-none");
                        //END country not kuwait then remove select2

                        var country_name = $(this).val();
                        var state = $("#delivery_vendors_state").val();
                        var city = $("#delivery_vendors_city").val();
                        var zip_code = $('input[name="zip_code"]').val();
                        promo_code = "";
                        if ($(".promo-code-row").length > 0) {
                            $("#promo_code").val("");
                            $(".promo-div").hide();
                            $(".promo-code-row").show();
                            $(".promo-applied").remove();
                        }

                        var countries_array = [];
                        $(".select2-country option").each(function () {
                            countries_array.push($(this).val());
                        });
                        if ($.inArray($(this).val(), countries_array) >= 0) {
                            if ($("#mobile_number").length > 0) {
                                countryCodeFunc(country_name);
                            }
                        }

                        showLoader();

                        $.ajax({
                            type: "get",
                            url: "https://ustore.upayments.com/get_charge_from_gov_area",
                            data: { language: language, merchant_id: "Dlrlj66aoY", country: country_name, state: state, area: city, zip_code: zip_code, from_store: "ustore" },
                            dataType: "json",
                            success: function (resp) {
                                hideLoader();
                                if (resp.success) {
                                    $(".knet-amount-label").html(resp.knet_amount);
                                    $(".cc-amount-label").html(resp.cc_amount);

                                    //if premium subscribtion enable
                                    if (cash_on_delivery == true) {
                                        $(".cod-amount-label").html(resp.cod_amount);
                                    }

                                    if (resp.delivery_charge > 0 || resp.show_free_delivery == 1) {
                                        if (selected_country != "" && selected_country !== "kuwait" && resp.delivery_charge == 0) {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                            }
                                        } else {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                                $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                            }
                                        }
                                    } else {
                                        if (homesprays_store === false) {
                                            $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                        }
                                    }
                                    $(".delivery-fees").show();
                                    $(".coupon_div").hide();
                                    $(".delivery_fee").html(parseFloat(resp.delivery_charge).toFixed(3) + " KD");
                                    $(".sub_total").html(parseFloat(resp.cart_amount.toString()).toFixed(3) + " KD");

                                    if (resp.dhl_service === false || resp.ocs_service === false) {
                                        $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                        $("#payment_button").val("false");
                                        $(".payment-buttons-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                                        //if premium subscribtion enable
                                        $(".cash-on-delivery-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                                    } else {
                                        $("#payment_button").val("true");
                                        $(".payment-buttons-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                                        //if premium subscribtion enable
                                        $(".cash-on-delivery-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                                    }
                                } else {
                                    toastr["error"](resp.msg, "");
                                }
                            },
                        });
                    } else {
                        $(".delivery-fees").hide();
                        //START country code
                        if ($("#mobile_number").length > 0) {
                            countryCodeFunc(countryCode);
                        }

                        // special notes label change
                        //START custom area
                        $(".inter_country-area-main-div").hide();

                        if (encoded_store_code == "1aL5WzQdwO" || encoded_store_code == "1aL5AwALwO") {
                            $(".international-country-hide").show();
                            var type = "house";
                            $(".address_type").val(type);
                            $(".delivery-button").removeClass("active");
                            $("[data-type=" + type + "]").addClass("active");
                        }
                        // if(encoded_store_code == '1aL5AwALwO') {
                        if (last_updated_shipping === "dhl") {
                            $(".international-country-than-hide").show();
                            $(".city-type-div").hide();
                        }
                        if (last_updated_shipping === "dhl" || last_updated_shipping === "ocs") $(".international-country-than-show").hide();
                        // }
                        //END custom area

                        //START when country kuwait selected then we execute below function only for change price user id 422 [I have to normalize code]
                        promo_code = "";
                        if ($(".promo-code-row").length > 0) {
                            $("#promo_code").val("");
                            $(".promo-div").hide();
                            $(".promo-code-row").show();
                            $(".promo-applied").remove();
                        }
                        showLoader();
                        var country_name = $(this).val();
                        var area_name = $("#area").val();
                        $.ajax({
                            type: "get",
                            url: "https://ustore.upayments.com/get_charge_from_gov_area",
                            data: { language: language, merchant_id: "Dlrlj66aoY", country: country_name, area: area_name, from_store: "ustore" },
                            dataType: "json",
                            success: function (resp) {
                                hideLoader();
                                if (resp.success) {
                                    $(".knet-amount-label").html(resp.knet_amount);
                                    $(".cc-amount-label").html(resp.cc_amount);

                                    //if premium subscribtion enable
                                    if (cash_on_delivery == true) {
                                        $(".cod-amount-label").html(resp.cod_amount);
                                    }

                                    if (resp.delivery_charge > 0 || resp.show_free_delivery == 1) {
                                        if (selected_country != "" && selected_country !== "kuwait" && encoded_store_code == "1aL5AwALwO") {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                            }
                                        } else {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                                $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                            }
                                        }
                                    } else {
                                        if (homesprays_store === false) {
                                            $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                        }
                                    }
                                } else {
                                    toastr["error"](resp.msg, "");
                                }
                            },
                        });

                        // $('.select2-governate').select2("val", "");
                        if (!clicked_delivery_address) $(".select2-area").val("").change();

                        $(".governate-main-div,.area-main-div").show();
                    }

                    if ($("#estimated_delivery_time").length > 0) {
                        if ($("#estimated_delivery_time").val() == "schedule_delivery") {
                            $(".schedule-delivery-section").show();
                            $("#modal-datepicker").find(".pick-date").find(".btn-block").removeClass("theme-btn");
                        } else {
                            $(".schedule-delivery-section").hide();
                            $("#modal-datepicker").find(".time-frame").removeClass("selected");
                            $("#modal-datepicker").find(".pick-date").find(".btn-block").addClass("theme-btn");
                        }
                    }
                });

            if ($("#estimated_delivery_time").length > 0) {
                if ($("#estimated_delivery_time").val() == "schedule_delivery") {
                    $(".schedule-delivery-section").show();
                    $("#modal-datepicker").find(".pick-date").find(".btn-block").removeClass("theme-btn");
                } else {
                    $(".schedule-delivery-section").hide();
                    $("#modal-datepicker").find(".time-frame").removeClass("selected");
                    $("#modal-datepicker").find(".pick-date").find(".btn-block").addClass("theme-btn");
                }
            }

            //Remove COD button when customer choose the international country as per merchant request
            $(".select2-country").on("change", function () {
                var selected_country = $(this).val();
                if (selected_country != "kuwait") {
                    $.ajax({
                        type: "get",
                        url: "https://ustore.upayments.com/cod_check_disabled",
                        data: { merchant_id: "Dlrlj66aoY", selected_country: selected_country },
                        dataType: "json",
                        success: function (resp) {
                            hideLoader();
                            if (resp.success) {
                                if (resp.cash_on_delivery_div == true) {
                                    $(".cash-on-delivery-div").show();
                                } else {
                                    $(".cash-on-delivery-div").hide();
                                }
                            } else {
                                toastr["error"](resp.msg, "");
                            }
                        },
                    });
                } else {
                    $(".cash-on-delivery-div").show();
                }
            });
        }
        if ($(".select2-area-checkout").length > 0) {
            $(".select2-area-checkout")
                .select2({
                    allowClear: true,
                    containerCssClass: "select2-checkout",
                    dropdownCssClass: "select2-checkout",
                    placeholder: "Area",
                    width: null,
                    debug: true,
                    language: select2_lang,
                })
                .on("select2:open", function () {
                    $(".select2-dropdown--above").attr("id", "fix");
                    $("#fix").removeClass("select2-dropdown--above");
                    $("#fix").addClass("select2-dropdown--below");
                });
        }
        if ($(".select2-time").length > 0) {
            $(".select2-time").select2({
                containerCssClass: "select2-checkout",
                dropdownCssClass: "select2-checkout",
                placeholder: "Select delivery time",
                width: null,
                debug: false,
                language: select2_lang,
                dir: select2_dir,
                minimumResultsForSearch: -1,
            });
        }
        //START delivery vendors region
        if ($('input[name="store_pickup"]').val() == "delivery") {
            if ($("[name='country']").length > 0 && $("[name='country']").val() !== "kuwait") $(".region_data").show();
        } else {
            $(".region_data").hide();
        }
        $("#delivery_vendors_country").select2({
            allowClear: true,
            containerCssClass: "select2-checkout",
            dropdownCssClass: "select2-checkout",
            placeholder: "Delivery Country",
            width: null,
            debug: true,
            language: select2_lang,
        });
        $("#delivery_vendors_state").select2({
            allowClear: true,
            containerCssClass: "select2-checkout",
            dropdownCssClass: "select2-checkout",
            placeholder: "Delivery State",
            width: null,
            debug: true,
            language: select2_lang,
        });
        $("#delivery_vendors_city").select2({
            allowClear: true,
            containerCssClass: "select2-checkout",
            dropdownCssClass: "select2-checkout",
            placeholder: "Delivery City",
            width: null,
            debug: true,
            language: select2_lang,
        });
        $(document)
            .off("change", "#delivery_vendors_country")
            .on("change", "#delivery_vendors_country", function () {
                $("#delivery_vendors_state").val("").change();
                $("#delivery_vendors_city").val("").change();
                $('input[name="zip_code"]').val("00000");
            });
        $(document)
            .off("change", "#delivery_vendors_state")
            .on("change", "#delivery_vendors_state", function () {
                $("#delivery_vendors_city").val("").change();
            });
        //END delivery vendors region
        if ($(".select2-area").length > 0) {
            $(".select2-area")
                .select2({
                    allowClear: true,
                    containerCssClass: "select2-checkout",
                    dropdownCssClass: "select2-checkout",
                    placeholder: "Area",
                    width: null,
                    debug: true,
                    language: select2_lang,
                })
                .on("select2:open", function () {
                    $(".select2-dropdown--above").attr("id", "fix");
                    $("#fix").removeClass("select2-dropdown--above");
                    $("#fix").addClass("select2-dropdown--below");
                });
            $(document)
                .off("change", ".select2-area")
                .on("change", ".select2-area", function () {
                    var area_value = $(this).val();
                    promo_code = "";
                    if ($(".promo-code-row").length > 0) {
                        $("#promo_code").val("");
                        $(".promo-div").hide();
                        $(".promo-code-row").show();
                        $(".promo-applied").remove();
                    }
                    var country = "kuwait";
                    if ($(".select2-country").length > 0) country = $(".select2-country").val();

                    if ($.trim(area_value) != "") {
                        showLoader();
                        $.ajax({
                            type: "get",
                            url: "https://ustore.upayments.com/get_charge_from_gov_area",
                            data: { language: language, merchant_id: "Dlrlj66aoY", governate: "", country: country, area: area_value, from_store: "ustore" },
                            dataType: "json",
                            success: function (resp) {
                                hideLoader();
                                if (resp.success) {
                                    $(".knet-amount-label").html(resp.knet_amount);
                                    $(".cc-amount-label").html(resp.cc_amount);

                                    // if premium subscribtion enable
                                    if (cash_on_delivery == true) {
                                        $(".cod-amount-label").html(resp.cod_amount);
                                    }
                                    if (resp.delivery_charge > 0 || resp.show_free_delivery == 1) {
                                        if (selected_country != "" && selected_country !== "kuwait" && resp.delivery_charge == 0 && encoded_store_code == "1aL5AwALwO") {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                            }
                                        } else {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                                $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                            }
                                        }
                                        //let delivery_charge = (resp.delivery_charge).toString();
                                        //var total_amt = Number(resp.cart_amount) + Number(resp.delivery_charge);
                                        $(".coupon_div").hide();
                                        $(".delivery_fee").html(parseFloat(resp.delivery_charge).toFixed(3) + " KD");
                                        $(".sub_total").html(parseFloat(resp.cart_amount.toString()).toFixed(3) + " KD");
                                    } else {
                                        if (homesprays_store === false) {
                                            $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                        }
                                    }
                                } else {
                                    toastr["error"](resp.msg, "");
                                }
                            },
                        });
                    }
                });
            $(document)
                .off("change", "#delivery_vendors_city")
                .on("change", "#delivery_vendors_city", function () {
                    var city = $(this).val();
                    var area_value = $(this).val();
                    var country_name = $("#delivery_vendors_country").val();
                    var selected_country = $(".select2-country").val();
                    var state = $("#delivery_vendors_state").val();
                    var zip_code = $('input[name="zip_code"]').val();
                    promo_code = "";
                    if ($(".promo-code-row").length > 0) {
                        $("#promo_code").val("");
                        $(".promo-div").hide();
                        $(".promo-code-row").show();
                        $(".promo-applied").remove();
                    }

                    if ($.trim(area_value) != "") {
                        showLoader();
                        $.ajax({
                            type: "get",
                            url: "https://ustore.upayments.com/get_charge_from_gov_area",
                            data: { language: language, merchant_id: "Dlrlj66aoY", country: country_name, state: state, area: city, zip_code: zip_code, from_store: "ustore" },
                            dataType: "json",
                            success: function (resp) {
                                hideLoader();
                                if (resp.success) {
                                    //var total_amt = Number(resp.cart_amount) + Number(resp.delivery_charge);
                                    if (resp.delivery_charge != 0) {
                                        $(".delivery-fees").show();
                                    } else {
                                        $(".delivery-fees").hide();
                                    }
                                    $(".knet-amount-label").html(resp.knet_amount);
                                    $(".cc-amount-label").html(resp.cc_amount);
                                    $(".delivery_fee").html(parseFloat(resp.delivery_charge).toFixed(3) + " KD");
                                    $(".sub_total").html(parseFloat(resp.cart_amount.toString()).toFixed(3) + " KD");
                                    $(".coupon_div").hide();
                                    $("#promo_code").val("");

                                    if (resp.estimated_delivery != "") {
                                        $(".estimate_delivery_div").show();
                                        $(".delivery_fees").show();
                                        $(".estimate_delivery_date").html(resp.estimated_delivery);
                                    }
                                    // if premium subscribtion enable
                                    if (cash_on_delivery == true) {
                                        $(".cod-amount-label").html(resp.cod_amount);
                                    }

                                    // if(encoded_store_code == '1aL5AwALwO' || encoded_store_code == 'jPn4DZYnD8') {
                                    if (resp.dhl_service === false || resp.ocs_service === false) {
                                        $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                        $("#payment_button").val("false");
                                        $(".payment-buttons-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                                        //if premium subscribtion enable
                                        $(".cash-on-delivery-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                                    } else {
                                        $("#payment_button").val("true");
                                        $(".payment-buttons-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                                        //if premium subscribtion enable
                                        $(".cash-on-delivery-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                                    }
                                } else {
                                    $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                    $("#payment_button").val("false");
                                    $(".payment-buttons-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                                    $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                    $(".cash-on-delivery-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                                    toastr["error"](resp.msg, "");
                                }
                            },
                        });
                    }
                });
        }
        if ($(".select2-governate").length > 0) {
            $(".select2-governate")
                .select2({
                    allowClear: false,
                    containerCssClass: "select2-checkout",
                    dropdownCssClass: "select2-checkout",
                    placeholder: "Governorate",
                    width: null,
                    debug: true,
                    language: select2_lang,
                })
                .on("select2:open", function () {
                    $(".select2-dropdown--above").attr("id", "fix");
                    $("#fix").removeClass("select2-dropdown--above");
                    $("#fix").addClass("select2-dropdown--below");
                    // $('html,body').animate({ scrollTop: $(".select2-area").offset().top-150}, 1000);
                });
            /*$(".select2-area").select2({
                allowClear: true,
                containerCssClass: "select2-checkout",
                dropdownCssClass: "select2-checkout",
                placeholder: "Area",
                width: null,
                debug:true,
                language:select2_lang
            }).on('select2:open',function(){
                $('.select2-dropdown--above').attr('id','fix');
                $('#fix').removeClass('select2-dropdown--above');
                $('#fix').addClass('select2-dropdown--below');
            });*/
            $(document)
                .off("change", ".select2-governate")
                .on("change", ".select2-governate", function () {
                    var gov_value = $(this).val();
                    promo_code = "";
                    if ($(".promo-code-row").length > 0) {
                        $("#promo_code").val("");
                        $(".promo-div").hide();
                        $(".promo-code-row").show();
                        $(".promo-applied").remove();
                    }
                    $(".select2-area").val("");
                    if ($.trim(gov_value) == "") $(".select2-area").select2("val", "");
                    else {
                        showLoader();
                        $.ajax({
                            type: "get",
                            url: "https://ustore.upayments.com/get_area_from_gov",
                            data: { merchant_id: "Dlrlj66aoY", governate: gov_value, language: language },
                            dataType: "json",
                            success: function (resp) {
                                hideLoader();
                                $(".loader-store").hide();
                                if (resp.success) {
                                    $(".select2-area")
                                        .select2("destroy")
                                        .empty()
                                        .select2({ data: null, allowClear: true, containerCssClass: "select2-checkout", dropdownCssClass: "select2-checkout", placeholder: "Area", width: null, debug: true, language: select2_lang })
                                        .on("select2:open", function () {
                                            $(".select2-dropdown--above").attr("id", "fix");
                                            $("#fix").removeClass("select2-dropdown--above");
                                            $("#fix").addClass("select2-dropdown--below");
                                        });
                                    if (resp.total_cities > 0) {
                                        var options = [];
                                        options.push({ id: "", text: "select" });
                                        $.each(resp.cities, function (index, value) {
                                            options.push({ id: index, text: value });
                                        });

                                        $(".select2-area")
                                            .select2("destroy")
                                            .empty()
                                            .select2({ data: options, allowClear: true, containerCssClass: "select2-checkout", dropdownCssClass: "select2-checkout", placeholder: "Area", width: null, debug: true, language: select2_lang })
                                            .on("select2:open", function () {
                                                $(".select2-dropdown--above").attr("id", "fix");
                                                $("#fix").removeClass("select2-dropdown--above");
                                                $("#fix").addClass("select2-dropdown--below");
                                            });
                                    }
                                    if (clicked_delivery_address) {
                                        var checked_del_addr = $("input[name='select_default_delivery_address']:checked").data("id");
                                        if (free_delivery == 0) {
                                            $(".select2-area").val(addresses.multiple_address.area[checked_del_addr]).change();
                                        } else {
                                            if (addresses.multiple_address.area[checked_del_addr] != "")
                                                $('input[name="area"]')
                                                    .val($(".get_clicked_city_name_" + checked_del_addr).val())
                                                    .change();
                                        }
                                        $(".dropdown-block").val(addresses.multiple_address.block[checked_del_addr]).change();
                                    }
                                }

                                //END country code
                                if ($("#estimated_delivery_time").length > 0) {
                                    if ($("#estimated_delivery_time").val() == "schedule_delivery") {
                                        $(".estimated-time-than-hide").show();
                                        //$('input[name="preferred_delivery_time"]').val('');
                                        $('input[name="preferred_delivery_time"]').prop("required", true); // required
                                        //$('input[name="preferred_delivery_time_part"]').val('');
                                        $('input[name="preferred_delivery_time_part"]').prop("required", true); // required
                                    } else {
                                        $(".estimated-time-than-hide").hide();
                                        $('input[name="preferred_delivery_time"]').val("");
                                        $('input[name="preferred_delivery_time"]').prop("required", false); // optional
                                        //if($("#preferred_delivery_time_part").length > 0)
                                        //  $('#preferred_delivery_time_part').select2("val", "");

                                        $('input[name="preferred_delivery_time_part"]').prop("required", false); // optional
                                    }
                                }
                            },
                        });
                    }
                });

            $(document)
                .off("change", ".select2-area")
                .on("change", ".select2-area", function () {
                    var area_value = $(this).val();

                    var gov_value = $(".select2-governate").val();
                    promo_code = "";
                    if ($(".promo-code-row").length > 0) {
                        $("#promo_code").val("");
                        $(".promo-div").hide();
                        $(".promo-code-row").show();
                        $(".promo-applied").remove();
                    }

                    if ($.trim(gov_value) != "" && $.trim(area_value) != "") {
                        showLoader();
                        $.ajax({
                            type: "get",
                            url: "https://ustore.upayments.com/get_charge_from_gov_area",
                            data: { language: language, merchant_id: "Dlrlj66aoY", governate: gov_value, area: area_value, from_store: "ustore" },
                            dataType: "json",
                            success: function (resp) {
                                hideLoader();
                                if (resp.success) {
                                    $(".knet-amount-label").html(resp.knet_amount);
                                    $(".cc-amount-label").html(resp.cc_amount);

                                    //if premium subscribtion enable
                                    if (cash_on_delivery == true) {
                                        $(".cod-amount-label").html(resp.cod_amount);
                                    }

                                    if (resp.delivery_charge > 0 || resp.show_free_delivery == 1) {
                                        if (selected_country != "" && selected_country !== "kuwait" && resp.delivery_charge == 0 && encoded_store_code == "1aL5AwALwO") {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                            }
                                        } else {
                                            if (homesprays_store === false) {
                                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                                $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                            }
                                        }
                                    } else {
                                        if (homesprays_store === false) {
                                            $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                        }
                                    }
                                } else {
                                    toastr["error"](resp.msg, "");
                                }
                            },
                        });
                    }
                });
        }

        if (show_preferred_time) {
            var cnls_dates = [];
            var fmt = new DateFormatter();
            var lastDay = "";

            var cnsl_dt_time_slot = [];

            var add_date = "17-03-2022";
            //var min_date_start = '2022-03-17';
            //if(encoded_store_code == '1aL5AwALwO' || encoded_store_code == '6Wdw08onZo' || encoded_store_code == 'bXnWlxOLWz') {
            var min_date_start = "2022-03-17";
            //} else {
            //  var min_date_start = '2022-03-17    ';
            //}

            if ($.trim(lastDay) == "") {
                lastDay = new Date();
                lastDay.setMonth(lastDay.getMonth() + 1);
            }

            var allowTimesData = [];
            if (Object.keys(cnsl_dt_time_slot).length > 0 && typeof cnsl_dt_time_slot !== "undefined") {
                if (typeof cnsl_dt_time_slot[add_date] !== "undefined") {
                    allowTimesData = cnsl_dt_time_slot[add_date];
                }
            }

            /*var getTimeSlots = function( currentDateTime ){
                if($.trim(sel_pref_date) == "" || sel_pref_date != fmt.formatDate(currentDateTime, "d-m-Y")){
                    if(typeof(cnsl_dt_time_slot) !== 'undefined'){
                        if(typeof(cnsl_dt_time_slot[fmt.formatDate(currentDateTime, "d-m-Y")]) !== 'undefined'){
                            this.setOptions({
                                allowTimes:cnsl_dt_time_slot[fmt.formatDate(currentDateTime, "d-m-Y")]
                            });
                        }
                    }

                    if(typeof(time_slots) !== 'undefined'){
                        if(typeof(time_slots[fmt.formatDate(currentDateTime, "Y-m-d")]) !== 'undefined'){
                            var options = [];
                            options.push({id:'',text:'select'});
                            $.each(time_slots[fmt.formatDate(currentDateTime, "Y-m-d")],function(index,value){
                                options.push({id:value,text:value});
                            });
                            console.log(options);
                            $(".select2-time").select2('destroy').empty().select2({data: options,
                                containerCssClass: "select2-checkout",
                                dropdownCssClass: "select2-checkout",
                                placeholder: "Select delivery time",
                                width: null,
                                debug:false,
                                language:select2_lang,
                                dir: select2_dir,
                                minimumResultsForSearch: -1
                            }).on('select2:open',function(){
                                $('.select2-dropdown--above').attr('id','fix');
                                $('#fix').removeClass('select2-dropdown--above');
                                $('#fix').addClass('select2-dropdown--below');
                            });;
                        }else{
                            var options = [];
                            options.push({id:'',text:'select'});

                            $(".select2-time").select2('destroy').empty().select2({data: options,
                                containerCssClass: "select2-checkout",
                                dropdownCssClass: "select2-checkout",
                                placeholder: "Select delivery time",
                                width: null,
                                debug:false,
                                language:select2_lang,
                                dir: select2_dir,
                                minimumResultsForSearch: -1
                            }).on('select2:open',function(){
                                $('.select2-dropdown--above').attr('id','fix');
                                $('#fix').removeClass('select2-dropdown--above');
                                $('#fix').addClass('select2-dropdown--below');
                            });
                        }
                    }
                    sel_pref_date = fmt.formatDate(currentDateTime, "d-m-Y");
                    $(".preferred_delivery_time_note").show();
                }
            }*/
        }

        $(".promo-apply").on("click", function () {
            $("#promo_code").parent("div").removeClass("has-error");
            promo_code = $("#promo_code").val();
            if ($.trim(promo_code) == "") {
                $("#promo_code").parent("div").addClass("has-error");
                toastr["error"]("Please enter promo code", "");
                return false;
            } else {
                var country_value = $("[name='country']").val();
                var area_value = $(".select2-area").val();
                $(".transparent-loader").show();
                $.ajax({
                    type: "get",
                    url: "https://ustore.upayments.com/apply_promo_code_payit_store",
                    data: { mhash: mhash, promo_code: promo_code, amnt: $.trim($(".customer-cart-total").html().replace(/ /g, "")), language: language, governate: "", area: area_value, country: country_value, from: "ustore" },
                    dataType: "json",
                    success: function (resp) {
                        $(".transparent-loader").hide();
                        if (!resp.success) {
                            toastr["error"](resp.msg, "");
                            $("#promo_code").parent("div").addClass("has-error");
                        } else {
                            toastr["success"](resp.msg, "");
                            $(".promo-code-row").hide();
                            //$("#invoice_promo_code").val(promo_code);
                            //var sub_total= Number(resp.cart_amount)- Number(resp.promo_code_discount);

                            $(".payment-buttons-div").find(".knet-amount-label").html(resp.knet_amount);
                            $(".payment-buttons-div").find(".cc-amount-label").html(resp.cc_amount);
                            $(".knet-amount-label").html(resp.knet_amount);
                            $(".cc-amount-label").html(resp.cc_amount);
                            //$('.delivery_fee').html(parseFloat(resp.delivery_charge).toFixed(3) + ' KD');
                            $(".sub_total").html(parseFloat(resp.cart_amount.toString()).toFixed(3) + " KD");

                            $(".coupon_div").show();
                            $(".coupon_amount").html(parseFloat(resp.promo_code_discount.toString()).toFixed(3) + " KD");
                            //if premium subscribtion enable
                            if (cash_on_delivery == true) {
                                $(".cash-on-delivery-div").find(".cod-amount-label").html(resp.cod_amount);
                            }

                            $(
                                '<div class="row form-group promo-applied">' +
                                    '<div class="col-sm-12" style="text-align:center; margin:0 auto;" class="inline-btn-div">' +
                                    '<div class="alert alert-success" style="font-size:16px;margin-bottom:0px;">' +
                                    "<strong>" +
                                    promo_code +
                                    " </strong>" +
                                    resp.msg +
                                    "</div>" +
                                    "</div>" +
                                    "</div>"
                            ).insertAfter(".promo-code-row");
                        }
                    },
                    error(err) {
                        $(".transparent-loader").hide();
                        console.log("err", err);
                    },
                });
            }
            return false;
        });

        $(".add-more-cart").on("click", function () {
            $(".delivery-fees").hide();
            $(".estimate_delivery_div").hide();
            $(".coupon_div").hide();
            $("#promo_code").val("");

            var product_id = $(this).attr("data-id");
            var product_type = $(this).attr("data-type");
            var data_from = $(this).attr("data-from");
            var data_index = $(this).attr("data-index");

            var var_id = "";
            promo_code = "";

            if ($("#delivery_vendors_city").length > 0) {
                if ($("#delivery_vendors_city").val() != "") {
                    $("#delivery_vendors_city").val("").change();
                }
            }

            if ($(".select2-area").length > 0) {
                if ($(".select2-area").val() != "") {
                    $(".select2-area").val("");
                    $(".select2-area").trigger("change");
                }
            }
            if ($(".promo-code-row").length > 0) {
                $("#promo_code").val("");
                $(".promo-div").hide();
                $(".promo-code-row").show();
                $(".promo-applied").remove();

                if ($(".delivery_charge_div").length > 0) $(".delivery_charge_div").remove();
            }

            var that = $(this);
            showLoader();
            $.ajax({
                type: "get",
                url: "https://ustore.upayments.com/add_remove_cart_ustore",
                data: { merchant_id: "Dlrlj66aoY", product_id: product_id, op: "add", language: language, product_type: product_type, encoded_store_code: encoded_store_code, data_from: data_from, data_index: data_index },
                dataType: "json",
                success: function (resp) {
                    // console.log("resp",resp);
                    hideLoader();
                    if (resp.success) {
                        $(".cart-badge").html(resp.total_qty);
                        $(".knet-amount-label").html(resp.knet_amount);
                        $(".cc-amount-label").html(resp.cc_amount);
                        $(".total-checkout-text").html(resp.total_amount);
                        $(".customer-cart-total,.sub_total").html(resp.total_amount);

                        //if premium subscribtion enable
                        if (cash_on_delivery == true) {
                            $(".cod-amount-label").html(resp.cod_amount);
                        }
                        if (resp.temp_total_bulk_delivery_charge_c15 > 0) {
                            $(".buttons-div-payment").find(".delivery_charge_div").remove();
                            $(".buttons-div-payment").prepend('<div class="delivery_charge_div">Delivery charges : ' + resp.temp_total_bulk_delivery_charge_c15 + " included</div>");
                        }
                        if (resp.delivery_charge_per_product > 0) {
                            $(".delivery-details-c15-div_" + product_id)
                                .find(".delivery-charge-c15")
                                .remove();
                            $(".delivery-details-c15-div_" + product_id).prepend('<p class="delivery-charge-c15 mb-0" style="font-size: 12px;">' + delivery_charge_trans + " : " + resp.delivery_charge_per_product + " " + kwd_trans + "</p>");
                        }
                        that.parents(".price-action").find(".item-qty").val(resp.product_qty);
                        that.parents(".price-action").find("span").html(resp.product_qty);
                    } else toastr["error"](resp.msg, "");
                },
                error: function (error) {
                    hideLoader();
                    //$('#productModal').modal('toggle');
                    //toastr['error']('Error:'+error,'');
                    return false;
                },
            });
        });

        $(".remove-from-cart").on("click", function () {
            $(".delivery-fees").hide();
            $(".estimate_delivery_div").hide();
            $(".coupon_div").hide();
            $("#promo_code").val("");
            if ($("#delivery_vendors_city").length > 0)
                if ($("#delivery_vendors_city").val() != "") {
                    $("#delivery_vendors_city").val("").change();
                }

            if ($(".select2-area").length > 0) {
                if ($(".select2-area").val() != "") {
                    $(".select2-area").val("");
                    $(".select2-area").trigger("change");
                }
            }
            promo_code = "";
            if ($(".promo-code-row").length > 0) {
                $("#promo_code").val("");
                $(".promo-div").hide();
                $(".promo-code-row").show();
                $(".promo-applied").remove();

                if ($(".delivery_charge_div").length > 0) $(".delivery_charge_div").remove();
            }
            var product_id = $(this).attr("data-id");
            var product_type = $(this).attr("data-type");
            var data_from = $(this).attr("data-from");
            var data_index = $(this).attr("data-index");
            var current_qty = Number($(this).parents(".price-action").find("span").html());
            if (current_qty <= 1) {
                toastr["error"]("You can't remove all quantity please go with delete.", "");
                return false;
            }

            var that = $(this);
            if (current_qty > 1) {
                showLoader();
                $.ajax({
                    type: "get",
                    url: "https://ustore.upayments.com/add_remove_cart_ustore",
                    data: { merchant_id: "Dlrlj66aoY", product_id: product_id, op: "remove", language: language, product_type: product_type, encoded_store_code: encoded_store_code, data_from: data_from, data_index: data_index },
                    dataType: "json",
                    success: function (resp) {
                        hideLoader();
                        if (resp.success) {
                            $(".cart-badge").html(resp.total_qty);
                            $(".knet-amount-label").html(resp.knet_amount);
                            $(".cc-amount-label").html(resp.cc_amount);
                            $(".total-checkout-text").html(resp.total_amount);
                            $(".customer-cart-total,.sub_total").html(resp.total_amount);

                            //if premium subscribtion enable
                            if (cash_on_delivery == true) {
                                $(".cod-amount-label").html(resp.cod_amount);
                            }

                            if (resp.temp_total_bulk_delivery_charge_c15 > 0) {
                                $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                $(".buttons-div-payment").prepend('<div class="delivery_charge_div">Delivery charges : ' + resp.temp_total_bulk_delivery_charge_c15 + " included</div>");
                            }
                            if (resp.delivery_charge_per_product > 0) {
                                $(".delivery-details-c15-div_" + product_id)
                                    .find(".delivery-charge-c15")
                                    .remove();
                                $(".delivery-details-c15-div_" + product_id).prepend(
                                    '<p class="delivery-charge-c15 mb-0" style="font-size: 12px;">' + delivery_charge_trans + " : " + resp.delivery_charge_per_product + " " + kwd_trans + "</p>"
                                );
                            }

                            that.parents(".price-action").find(".item-qty").val(resp.product_qty);
                            that.parents(".price-action").find("span").html(resp.product_qty);
                        } else toastr["error"](resp.msg, "");
                    },
                    error: function (error) {
                        hideLoader();
                        //$('#productModal').modal('toggle');
                        //toastr['error']('Error:'+error,'');
                        return false;
                    },
                });
            }
        });

        ///Delete item from cart
        $(".delete_item").on("click", function () {
            $(".delivery-fees").hide();
            $(".estimate_delivery_div").hide();
            $(".coupon_div").hide();
            $("#promo_code").val("");
            if ($("#delivery_vendors_city").length > 0) $("#delivery_vendors_city").val("").change();
            promo_code = "";
            var that = $(this);
            var product_type = $(this).attr("data-type");
            if ($(".promo-code-row").length > 0) {
                $("#promo_code").val("");
                $(".promo-div").hide();
                $(".promo-code-row").show();
                $(".promo-applied").remove();
            }

            if ($(".select2-area").length > 0) {
                if ($(".select2-area").val() != "") {
                    $(".select2-area").val("");
                    $(".select2-area").trigger("change");
                }
            }
            var product_id = $(this).attr("data-id");
            var data_from = $(this).attr("data-from");
            var data_index = $(this).attr("data-index");

            var that = $(this);
            if ($.trim(product_id) != "") {
                showLoader();
                $.ajax({
                    type: "get",
                    url: "https://ustore.upayments.com/remove_ustore_cart",
                    data: { merchant_id: "Dlrlj66aoY", product_id: product_id, op: "delete_all", language: language, product_type: product_type, encoded_store_code: encoded_store_code, data_from: data_from, data_index: data_index },
                    dataType: "json",
                    success: function (resp) {
                        hideLoader();
                        if (resp.success) {
                            toastr["success"](resp.msg, "");
                            /*if($('.product-case.card_id_'+product_id).hasClass('data_index_'+data_index))
                                $('.card_id_'+product_id+'.data_index_'+data_index).remove();
                            else
                                $('.card_id_'+product_id).remove();*/
                            if ($(".card_id_" + product_id).hasClass("data_index_" + data_index)) $(".card_id_" + product_id + ".data_index_" + data_index).remove();
                            else $(".card_id_" + product_id).remove();

                            /* that.parents('.card-main-div').slideUp(function(){
                        }); */
                            $(".cart-badge").html(resp.total_qty);

                            $(".knet-amount-label").html(resp.knet_label);
                            $(".cc-amount-label").html(resp.cc_label);
                            //$(".total-checkout-text").html(resp.total_amount+' KD');
                            $(".customer-cart-total,.sub_total").html(parseFloat(resp.total_amount.toString()).toFixed(3) + " KD");
                            if ($(".cod-amount-label").length > 0) $(".cod-amount-label").html(resp.cod_label);

                            if ($(".cart_item_list").length > 0 && resp.cartHTML) {
                                $(".dropdown-product-item").remove();
                                $(".cart-list-above").before(resp.cartHTML);
                                $(".customer-cart-total,.sub_total").html(resp.total_amount + " KD");
                            }

                            if (!resp.hasItemInCart) window.location.href = resp.redirect_url;
                        } else if (!resp.success) {
                            toastr["error"](resp.msg, "");
                        }
                    },
                });
            }

            return false;
        });

        $(document)
            .off("click", "#accept_terms")
            .on("click", "#accept_terms", function () {
                if ($(this).prop("checked") == true) {
                    if ($(".select2-country").length > 0) selected_country = $('select[name="country"]').val();
                    if (encoded_store_code == "1aL5AwALwO" || encoded_store_code == "jPn4DZYnD8") {
                        if (selected_country !== "kuwait") {
                            if ($("#payment_button").val() == "true") {
                                $(".payment-buttons-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                                //if premium subscribtion enable
                                $(".cash-on-delivery-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                            }
                        } else {
                            $(".payment-buttons-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                            //if premium subscribtion enable
                            $(".cash-on-delivery-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                        }
                    } else {
                        $(".payment-buttons-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                        //if premium subscribtion enable
                        $(".cash-on-delivery-div").find(".btn-checkout").removeClass("disabled").removeAttr("disabled");
                    }
                } else {
                    $(".payment-buttons-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                    //if premium subscribtion enable
                    $(".cash-on-delivery-div").find(".btn-checkout").addClass("disabled").attr("disabled");
                }
            });

        $(document)
            .off("change", ".select2-area")
            .on("change", ".select2-area", function () {
                var area_value = $(this).val();
                var country_value = "";
                var is_pickup_flag = false;
                if ($("[name='store_pickup']").val() == "pickup") {
                    is_pickup_flag = true;
                    area_value = "";
                }

                if ($.trim(area_value) != "" || is_pickup_flag == true) {
                    $(".dropdown-block").val("");
                    if ($(".select2-country").length > 0) country_value = $("[name='country']").val();

                    promo_code = "";
                    if ($(".promo-code-row").length > 0) {
                        $("#promo_code").val("");
                        $(".promo-div").hide();
                        $(".promo-code-row").show();
                        $(".promo-applied").remove();
                    }
                    showLoader();
                    $.ajax({
                        type: "get",
                        url: "https://ustore.upayments.com/get_block_from_area",
                        data: { language: language, merchant_id: "Dlrlj66aoY", country: country_value, governate: "", area: area_value, from_store: "ustore" },
                        dataType: "json",
                        success: function (resp) {
                            hideLoader();
                            if (resp.hasOwnProperty("knet_amount")) {
                                if (resp.delivery_charge != 0) {
                                    $(".delivery-fees").show();
                                } else {
                                    $(".delivery-fees").hide();
                                }
                                //var total_amt = Number(resp.cart_amount) + Number(resp.delivery_charge);
                                $(".knet-amount-label").html(resp.knet_amount);
                                $(".cc-amount-label").html(resp.cc_amount);
                                $(".delivery_fee").html(parseFloat(resp.delivery_charge).toFixed(3) + " KD");
                                $(".sub_total").html(parseFloat(resp.cart_amount.toString()).toFixed(3) + " KD");
                                $(".coupon_div").hide();
                                $("#promo_code").val("");
                                //if premium subscribtion enable
                                if (cash_on_delivery == true) {
                                    $(".cod-amount-label").html(resp.cod_amount);
                                }
                                if (resp.delivery_charge > 0 || resp.show_free_delivery == 1) {
                                    if (homesprays_store === false) {
                                        $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                        $(".buttons-div-payment").prepend(resp.delivery_charge_text);
                                    }
                                    if ((encoded_store_code == "1aL5AwALwO" || encoded_store_code == "kpr9l0oL41") && resp.show_free_delivery == 1) {
                                        $(".delivery-note-text-show").hide();
                                    } else if (encoded_store_code == "1aL5AwALwO" || encoded_store_code == "kpr9l0oL41") {
                                        $(".delivery-note-text-show").show();
                                    }
                                } else {
                                    if (homesprays_store === false) {
                                        $(".buttons-div-payment").find(".delivery_charge_div").remove();
                                    }
                                }
                            }

                            var cookie_input = "block_temp";
                            var cookie_block = $('input[name="' + cookie_input + '"]').data("cookie_block");
                            if (typeof is_transaction != "undefined" && is_transaction != "" && typeof cookie_block != "undefined" && cookie_block != "") {
                                $('input[name="' + cookie_input + '"]').val(cookie_block);
                            }
                            if (resp.total_block > 0) {
                                var options = [];
                                options.push({ id: "", text: "select" });
                                $.each(resp.blocks, function (index, value) {
                                    options.push({ id: value, text: value });
                                });

                                $(".dropdown-block")
                                    .select2({
                                        data: options,
                                        allowClear: true,
                                        containerCssClass: "select2-checkout",
                                        dropdownCssClass: "select2-checkout",
                                        placeholder: "Block",
                                        width: null,
                                        debug: true,
                                        language: select2_lang,
                                    })
                                    .on("select2:open", function () {
                                        $(".select2-dropdown--above").attr("id", "fix");
                                        $("#fix").removeClass("select2-dropdown--above");
                                        $("#fix").addClass("select2-dropdown--below");
                                    });

                                if (encoded_store_code == "1aL5WzQdwO" || encoded_store_code == "1aL5AwALwO") {
                                    if ($(".dropdown-block").hasClass("select2-hidden-accessible")) {
                                        $(".dropdown-block").select2("destroy");
                                    }
                                }
                            } else {
                                if ($(".dropdown-block").hasClass("select2-hidden-accessible")) {
                                    $(".dropdown-block").select2("destroy");
                                }
                            }

                            //END country code
                            if ($("#estimated_delivery_time").length > 0) {
                                if ($("#estimated_delivery_time").val() == "schedule_delivery") {
                                    $(".estimated-time-than-hide").show();
                                    $('input[name="preferred_delivery_time"]').prop("required", true); // required
                                    $('input[name="preferred_delivery_time_part"]').prop("required", true); // required
                                } else {
                                    $(".estimated-time-than-hide").hide();
                                    $('input[name="preferred_delivery_time"]').val("");
                                    $('input[name="preferred_delivery_time"]').prop("required", false); // optional
                                    //if($("#preferred_delivery_time_part").length > 0)
                                    //$('#preferred_delivery_time_part').select2("val", "");

                                    $('input[name="preferred_delivery_time_part"]').prop("required", false); // optional
                                }
                            }
                        },
                    });
                }
            });
        $(document)
            .off("change", ".dropdown-block")
            .on("change", ".dropdown-block", function () {
                //var data = $(this).select2('data');//it's work in only select2 so it throw error some time i(r) moved in below

                if ($(this).hasClass("select2-hidden-accessible")) {
                    var data = $(this).select2("data");
                    data = $(this).val(); //data[0].text;
                } else var data = $(this).val();

                $("[name='block_temp']").val(data);
                $("[name='block']").val(data);
            });

        $(".btn-checkout").on("click", function (e) {
            //START tokenization
            e.preventDefault();
            if ($(this).hasClass("disabled")) return false;

            var cc_token_id = "";
            var save_cc_card = 0;
            if ($("[name='save_cc_card']").length > 0) {
                save_cc_card = $("[name='save_cc_card']").val();
                if (typeof $(this).attr("data-cc_token_id") !== "undefined") cc_token_id = $(this).attr("data-cc_token_id");
            }
            //END tokenization
            var btn_type = $(this).attr("data-type");
            var delivery_addr_type = $("#address_type").val();
            var store_pickup_type = "delivery";
            if ($("#store_pickup").length > 0) store_pickup_type = $("#store_pickup").val();

            e.preventDefault();
            $(".checkout-form")
                .find("input,textarea")
                .each(function () {
                    $(this).parents(".error-group").removeClass("error-form");
                });

            $(".all-products-div")
                .find(".card-main-div")
                .each(function () {
                    $(this).removeClass("error-border");
                    $(this).find(".checkout-card").removeClass("error-box-shadow");
                    $(this).find(".checkout-card").find(".error-messages").remove();
                });

            $(".input-form-checkout-frm").find(".alert-danger").remove();
            var form_flag = true;

            var accept_terms = "";
            if ($("[name='accept_terms']").length > 0) {
                if ($("#accept_terms").prop("checked") == false) {
                    toastr["error"]("Please accept terms and condition to continue.", "");
                    form_flag = false;
                    return false;
                } else accept_terms = $("[name='accept_terms']").val();
            }

            $(".checkout-form")
                .find("input,textarea")
                .each(function () {
                    var name = $(this).attr("name");
                    if (name == "special_notes") {
                        $(this).parent("div.textarea-checkout ").removeClass("error-form");
                    } else $(this).removeClass("error-form");
                });

            var cntry = "";
            if ($("[name='country']").length > 0) cntry = $("[name='country']").val();

            if (store_pickup_type == "delivery") {
                $(".checkout-form")
                    .find("input,textarea")
                    .each(function () {
                        var requried_attr = $(this).attr("required");
                        var type = $(this).attr("type");
                        if (type == "file") {
                            var uploaded = $(this).attr("data-uploaded");
                            if (typeof uploaded === typeof undefined) {
                                if (typeof requried_attr !== typeof undefined && requried_attr !== false) {
                                    $(this).parents(".file-upload-main").addClass("has-error");
                                    form_flag = false;
                                }
                            }
                        }

                        if (typeof requried_attr !== typeof undefined && requried_attr !== false) {
                            if ($.trim($(this).val()) == "") {
                                var name = $(this).attr("name");
                                if ((name == "governate" || name == "area") && $.trim(cntry) != "" && cntry != "kuwait") {
                                } else {
                                    if (type != "file") {
                                        form_flag = false;
                                        if (name == "special_notes") {
                                            $(this).addClass("error-form");
                                        } else if (
                                            name != "area" &&
                                            name != "street" &&
                                            name != "block" &&
                                            name != "block_temp" &&
                                            name != "house" &&
                                            name != "avenue" &&
                                            name != "building" &&
                                            name != "floor" &&
                                            name != "apartment_no" &&
                                            name != "office_no"
                                        ) {
                                            if ($(this).hasClass("custom-checkout-fields")) $(this).addClass("error-form");
                                            else $(this).addClass("error-form");
                                        } else if (delivery_addr_type != "house" && (name == "building" || name == "floor" || name == "apartment_no" || name == "office_no")) {
                                            if ((delivery_addr_type == "apartment" && name == "office_no") || (delivery_addr_type == "office" && name == "apartment_no")) form_flag = true;
                                            else $(this).addClass("error-form");
                                        } else {
                                            if (name == "block_temp" && $(this).hasClass("select2-hidden-accessible")) $(this).find(".select2").addClass("has-error");
                                            else $(this).addClass("error-form");
                                        }

                                        if (delivery_addr_type == "house") form_flag = true;

                                        //optional building, floor, apartment, office for user id: 22445
                                        if ((delivery_addr_type == "apartment" || delivery_addr_type == "office") && encoded_store_code == "Pjdp68ZLQ7") form_flag = true;

                                        if (name == "inter_country_area") form_flag = true;
                                    }
                                }
                            }
                        }
                    });
                console.log("form_flag", form_flag);

                //START custom checkout fields
                $(".checkout-form")
                    .find(".custom-checkout-fields")
                    .each(function () {
                        var requried_attr = $(this).attr("required");
                        var attr_name = $(this).attr("name");
                        var selected_country = $("[name='country']").val();
                        var do_validation = true;

                        if ($(this).val() !== "") {
                            var regexExpEmojis = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
                            if (regexExpEmojis.test($(this).val())) {
                                $(this).addClass("error-form");
                                toastr["error"]("Emojis not allowed!", "");
                                $(this).val("");
                                form_flag = false;
                            }
                        }
                        if (do_validation && typeof requried_attr !== typeof undefined && requried_attr !== false) {
                            if ($(this).val() == "" && $(this).is(":visible")) {
                                $(this).addClass("error-form");
                                form_flag = false;
                            }
                        }
                    });
                //END custom checkout fields
            }

            //mobile number validation date : 20.05.2019
            if ($(".mobile_number_checkout_validation").length > 0 && store_pickup_type == "delivery") {
                if ($("[name='mobile_number']").val().length < 8) {
                    $("[name='mobile_number']").addClass("has-error");
                    form_flag = false;
                }
            }

            if (free_delivery == 0 && store_pickup_type == "delivery") {
                if ($("[name='country']").length > 0 && ($("[name='area']").length > 0 || $("[name='governate']").length > 0)) {
                    var cntry = $("[name='country']").val();
                    if ($.trim(cntry) == "" || cntry == "kuwait") {
                        var gov = $("[name='governate']").val();
                        var area = $("[name='area']").val();

                        if ($.trim(gov) == "" && $("[name='governate']").length > 0) {
                            $("[name='governate']").parent(".extra-fields").find(".select2").addClass("has-error");
                            form_flag = false;
                        }
                        if ($.trim(area) == "") {
                            $("[name='area']").parent(".extra-fields").find(".select2").addClass("has-error");
                            form_flag = false;
                        }
                    } else {
                        //if(encoded_store_code == '1aL5AwALwO' || encoded_store_code == 'xq3nDWpdpG' || encoded_store_code == 'kpr988OL41' || encoded_store_code == '0KrPZzAnap' || encoded_store_code == '0QLV0DPdjw' || encoded_store_code == 'VMLz61WLB9' || encoded_store_code == 'JDn8qywLlw' || encoded_store_code == 'ApRrkMonj1'){
                        if (encoded_store_code != "w4d3K8pdDq") {
                            if (last_updated_shipping === "dhl" || last_updated_shipping === "ocs") {
                                if (last_updated_shipping != "dhl") {
                                    if ($.trim($("[name='inter_country_state']").val()) == "") {
                                        $("[name='inter_country_state']").parent(".extra-fields").addClass("has-error");
                                        form_flag = false;
                                    } else {
                                        $("[name='inter_country_state']").parent(".extra-fields").removeClass("has-error");
                                    }
                                }
                                if ($.trim($("[name='inter_country_area']").val()) == "") {
                                    $("[name='inter_country_area']").parent(".extra-fields").addClass("has-error");
                                    form_flag = false;
                                } else {
                                    $("[name='inter_country_area']").parent(".extra-fields").removeClass("has-error");
                                }
                            } else {
                                if ($.trim($("[name='inter_country_area']").val()) == "") {
                                    $("[name='inter_country_area']").parent(".extra-fields").addClass("has-error");
                                    form_flag = false;
                                }
                            }
                        }
                        //}
                    }
                } else {
                    if (gcc_country_enabled === false && ($("[name='area']").length > 0 || $("[name='governate']").length > 0)) {
                        if ($("[name='governate']").length > 0) var gov = $("[name='governate']").val();
                        var area = $("[name='area']").val();

                        if ($.trim(gov) == "" && $("[name='governate']").length > 0) {
                            $("[name='governate']").parent(".extra-fields").find(".select2").addClass("has-error");
                            form_flag = false;
                        }
                        if ($.trim(area) == "" && $("[name='area']").length > 0) {
                            $("[name='area']").parent(".extra-fields").find(".select2").addClass("has-error");
                            form_flag = false;
                        }
                    }
                }
            }

            //Check for store pickup option
            var branch_name = (branch_id = store_pickup_timing = store_pickup_date = store_pickup_timeslot = "");
            if (store_pickup_type == "pickup") {
                branch_name = $("[name='branch_name']").val();
                branch_id = $("[name='branch']").val();
                store_pickup_timing = $("[name='pickup_timing']").val();
                store_pickup_date = $("[name='pickup_dates']").val();
                store_pickup_timeslot = $("[name='pickup_timeslot']").val();
                if (store_pickup_timing == "schedule_order") {
                    if ($.trim(store_pickup_date) == "") {
                        toastr["error"]("Please selected pickup date.", "");
                        form_flag = false;
                        return false;
                    }

                    if ($.trim(store_pickup_timeslot) == "") {
                        toastr["error"]("Please selected pickup time slot.", "");
                        form_flag = false;
                        return false;
                    }
                }
            }
            //end store pickup option

            if (!form_flag) {
                $(".ck-address-section").removeClass("d-none");
                $(".delivery-to-section").addClass("d-none");
                toastr["error"]("Please fill all required fields", "");
                $("html, body").animate({ scrollTop: "0" });
                return false;
            }
            var delivery_timeslot = "";
            if (total_amount > 0 && form_flag) {
                var mhash = $("#mhash").val();

                $(this).attr("disabled", "disabled");
                $(this).addClass("disabled");
                $(this).css("opacity", "0.5");
                $(this).attr("readonly", true);

                $(".btn-checkout").attr("disabled", "disabled");
                $(".btn-checkout").addClass("disabled");
                $(".btn-checkout").css("opacity", "0.5");
                $(".btn-checkout").attr("readonly", true);
                showLoader();

                var name = $("[name='full_name']").val();
                var email = $("[name='email']").val();
                var phone_number = "";
                if ($("[name='mobile_number']").val() !== undefined) var phone_number = $.trim($("[name='mobile_number']").val().replace(/ /g, ""));
                var delivery_address = $("[name='delivery_address']").val();
                var governate = "";
                if (free_delivery == 0) governate = $("[name='governate']").val();
                var area = $("[name='area']").val();
                var street = $("[name='street']").val();
                var block = $("[name='block']").val();
                var house = $("[name='house']").val();
                var avenue = $("[name='avenue']").val();
                var special_notes = $("[name='special_notes']").val();
                var checkout_password = $("#checkout_password").val();
                var checkout_conf_password = $("#checkout_conf_password").val();
                var inline_create_account = $("#inline_create_account").val();
                var preferred_delivery_time = "";
                var preferred_delivery_time_part = "";
                if ($("#preferred_delivery_time").length > 0) {
                    preferred_delivery_time = $("#preferred_delivery_time").val();
                    preferred_delivery_time_part = $("#preferred_delivery_time_part").val();
                }
                var cntry = "";
                if ($("[name='country']").length > 0) cntry = $("[name='country']").val();

                var inter_country_state = $("[name='inter_country_state']").val();
                var inter_country_area = $("[name='inter_country_area']").val();
                var zip_code = $("[name='zip_code']").val();
                var address1 = $("[name='address1']").val();
                var address2 = $("[name='address2']").val();
                var estimated_delivery_time = $("[name='estimated_delivery_time']:checked").val();
                var selected_address_id = $("#selected_address_id").val();

                var dial_code = "";
                if ($("#mobile_number").length > 0) {
                    dial_code = $("#mobile_number").parents(".iti--separate-dial-code").find(".iti__selected-dial-code").html();
                }
                var delivery_vendors_country = "";
                var delivery_vendors_state = "";
                var delivery_vendors_city = "";
                if (store_pickup_type == "delivery") {
                    delivery_vendors_country = $("[name='delivery_vendors_country']").val();
                    delivery_vendors_state = $("[name='delivery_vendors_state']").val();
                    delivery_vendors_city = $("[name='delivery_vendors_city']").val();
                }

                var dhl_service_type = "";
                var dhl_service_product_code = "";
                if (encoded_store_code == "1aL5AwALwO") {
                    dhl_service_type = $('input[name="dhl_service_type"]:checked').val();
                    dhl_service_product_code = $('input[name="dhl_service_type"]:checked').attr("dhl_service_product_code");
                }

                var accept_terms = (your_sign = pickup_type = vehicle_number = vehicle_model = "");
                if ($("[name='accept_terms']").length > 0 && $("#accept_terms").prop("checked") == true) accept_terms = $("[name='accept_terms']").val();

                //Delivery address field based on address type house, apartment, office
                var building = (floor = apartment_no = office_no = "");
                if ($("[name='building']").length > 0) building = $("[name='building']").val();
                if ($("[name='floor']").length > 0) floor = $("[name='floor']").val();
                if ($("[name='apartment_no']").length > 0 && delivery_addr_type == "apartment") apartment_no = $("[name='apartment_no']").val();
                if ($("[name='office_no']").length > 0 && delivery_addr_type == "office") office_no = $("[name='office_no']").val();

                if (store_pickup_type == "pickup") {
                    name = $("[name='pickup_full_name']").val();
                    email = $("[name='pickup_email']").val();
                    if ($("[name='pickup_mobile_number']").val() !== undefined) phone_number = $.trim($("[name='pickup_mobile_number']").val().replace(/ /g, ""));

                    if ($("#mobile_number_pickup").length > 0) {
                        dial_code = $("#mobile_number_pickup").parents(".iti--separate-dial-code").find(".iti__selected-dial-code").html();
                    }

                    pickup_type = $("#optPickupType").val();
                    if ($("#pickup_special_notes").length > 0) special_notes = $("#pickup_special_notes").val();
                    if ($("[name='vehicle_number']").length > 0) vehicle_number = $("[name='vehicle_number']").val();
                    if ($("[name='vehicle_model']").length > 0) vehicle_model = $("[name='vehicle_model']").val();
                    if ($("[name='pickup_your_sign']").length > 0) your_sign = $("[name='pickup_your_sign']").val();
                }

                var homesprays_product_val = "";
                if (typeof $('input[name="homesprays_product"]').val() !== "undefined") {
                    homesprays_product_val = $('input[name="homesprays_product"]').val();
                }

                $this = $(this);

                var checked_delivery_time = $("[name='estimated_delivery_time']:checked").val();
                if (checked_delivery_time != "undefined" && checked_delivery_time == "schedule_delivery") {
                    estimated_delivery_time = "";
                } else if (checked_delivery_time != "undefined" && checked_delivery_time == "60") {
                    preferred_delivery_time = "";
                    preferred_delivery_time_part = "";
                }
                if ($(".store-pickup-type.active").data("type") == "pickup") {
                    preferred_delivery_time = "";
                    preferred_delivery_time_part = "";
                }
                var postData = {
                    full_name: name,
                    email: email,
                    phone_number: phone_number,
                    your_sign: your_sign,
                    pickup_type: pickup_type,
                    vehicle_number: vehicle_number,
                    vehicle_model: vehicle_model,
                    delivery_address: delivery_address,
                    special_notes: special_notes,
                    area: area,
                    block: block,
                    house: house,
                    avenue: avenue,
                    street: street,
                    dhl_service_type: dhl_service_type,
                    dhl_service_product_code: dhl_service_product_code,
                    from_page: "web",
                    mhash: $("#mhash").val(),
                    language: language,
                    payment_by_cc: btn_type,
                    uploaded_doc: uploaded_doc,
                    document_required: document_required,
                    free_delivery: free_delivery,
                    governate: governate,
                    promo_code: promo_code,
                    preferred_delivery_time: preferred_delivery_time,
                    preferred_delivery_time_part: preferred_delivery_time_part,
                    delivery_timeslot: delivery_timeslot,
                    country: cntry,
                    accept_terms: accept_terms,
                    domain: "ustore",
                    cash_on_delivery: cash_on_delivery,
                    delivery_addr_type: delivery_addr_type,
                    building: building,
                    floor: floor,
                    apartment_no: apartment_no,
                    office_no: office_no,
                    store_pickup_type: store_pickup_type,
                    branch_name: branch_name,
                    branch_id: branch_id,
                    store_pickup_timing: store_pickup_timing,
                    store_pickup_date: store_pickup_date,
                    store_pickup_timeslot: store_pickup_timeslot,
                    inter_country_area: inter_country_area,
                    state: inter_country_state,
                    zip_code: zip_code,
                    address1: address1,
                    address2: address2,
                    estimated_delivery_time: estimated_delivery_time,
                    delivery_vendors_country: delivery_vendors_country,
                    delivery_vendors_state: delivery_vendors_state,
                    delivery_vendors_city: delivery_vendors_city,
                    homesprays_product_val: homesprays_product_val,
                    cc_token_id: cc_token_id,
                    save_cc_card: save_cc_card,
                    password: checkout_password,
                    password_confirmation: checkout_conf_password,
                    inline_create_account: inline_create_account,
                    selected_address_id: selected_address_id,
                    max_product_prep_time: "",
                    dial_code: dial_code,
                };

                //custom checkout fields live for all date: 28/05/2020 Bhavin Kanani
                // to pass custom checkout fields to object
                $(".custom-checkout-fields").each(function () {
                    postData[$(this).attr("name")] = $(this).val();
                });

                $.ajax({
                    headers: {
                        "X-CSRF-TOKEN": "tV7ivibZyjiqZRR7Wosg4RcFvCoM9eqihdi8bmII",
                    },
                    type: "post",
                    url: "https://ustore.upayments.com/proceed_checkout",
                    data: postData,
                    dataType: "json",
                    success: function (resps) {
                        if (resps.status != "success" && resps.status != "done" && resps.status != "cod_order") {
                            $this.removeAttr("disabled");
                            $this.removeClass("disabled");
                            $this.css("opacity", "1");

                            $(".btn-checkout").removeAttr("disabled");
                            $(".btn-checkout").removeClass("disabled");
                            $(".btn-checkout").css("opacity", "1");

                            hideLoader();
                            if (resps.error_msg && typeof resps.error_msg != "object") toastr["error"](resps.error_msg, "");
                            if (resps.form_error) {
                                $(".checkout-form")
                                    .find("input,textarea,select")
                                    .each(function () {
                                        var name = $(this).attr("name");
                                        if (name == "full_name") {
                                            if (resps.error_msg.full_name && resps.error_msg.full_name != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.full_name, "");
                                            }
                                        }
                                        if (name == "mobile_number") {
                                            if (resps.error_msg.mobile_number && resps.error_msg.mobile_number != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.mobile_number, "");
                                            }
                                        }
                                        if (name == "email" && $(this).is(":visible")) {
                                            if (resps.error_msg.email && resps.error_msg.email != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.email, "");
                                            }
                                        }

                                        if (name == "special_notes") {
                                            if (resps.error_msg.special_notes && resps.error_msg.special_notes != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.special_notes, "");
                                            }
                                        }
                                        if (name == "area") {
                                            if (resps.error_msg.area && resps.error_msg.area != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.area, "");
                                            }
                                        }
                                        if (name == "block") {
                                            if (resps.error_msg.block && resps.error_msg.block != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.block, "");
                                            }
                                        }
                                        if (name == "street") {
                                            if (resps.error_msg.street && resps.error_msg.street != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.street, "");
                                            }
                                        }
                                        if (name == "house") {
                                            if (resps.error_msg.house && resps.error_msg.house != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.house, "");
                                            }
                                        }
                                        if (name == "avenue") {
                                            if (resps.error_msg.avenue && resps.error_msg.avenue != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.avenue, "");
                                            }
                                        }
                                        if (name == "preferred_delivery_time") {
                                            if (resps.error_msg.preferred_delivery_time && resps.error_msg.preferred_delivery_time != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.preferred_delivery_time, "");
                                            }
                                        }
                                        if (name == "preferred_delivery_time_part") {
                                            if (resps.error_msg.preferred_delivery_time_part && resps.error_msg.preferred_delivery_time_part != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.preferred_delivery_time_part, "");
                                            }
                                        }
                                        if (name == "accept_terms") {
                                            if (resps.error_msg.accept_terms && resps.error_msg.accept_terms != "") toastr["error"](resps.error_msg.accept_terms, "");
                                        }
                                        if (name == "building") {
                                            if (resps.error_msg.building && resps.error_msg.building != "") toastr["error"](resps.error_msg.building, "");
                                        }
                                        if (name == "floor") {
                                            if (resps.error_msg.floor && resps.error_msg.floor != "") toastr["error"](resps.error_msg.floor, "");
                                        }
                                        if (name == "apartment_no") {
                                            if (resps.error_msg.apartment_no && resps.error_msg.apartment_no != "") toastr["error"](resps.error_msg.apartment_no, "");
                                        }
                                        if (name == "office_no") {
                                            if (resps.error_msg.office_no && resps.error_msg.office_no != "") toastr["error"](resps.error_msg.office_no, "");
                                        }
                                        if (name == "inter_country_state") {
                                            if (resps.error_msg.inter_country_state && resps.error_msg.inter_country_state != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.inter_country_state, "");
                                            }
                                        }
                                        if (name == "inter_country_area") {
                                            if (resps.error_msg.inter_country_area && resps.error_msg.inter_country_area != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.inter_country_area, "");
                                            }
                                        }

                                        if (name == "zip_code") {
                                            if (resps.error_msg.zip_code && resps.error_msg.zip_code != "") {
                                                $(this).parents(".error-group").addClass("error-form");
                                                toastr["error"](resps.error_msg.zip_code, "");
                                            }
                                        }

                                        if (encoded_store_code == "1aL5WzQdwO" || encoded_store_code == "1aL5AwALwO") {
                                            if (name == "address1") {
                                                if (resps.error_msg.address1 && resps.error_msg.address1 != "") {
                                                    $(this).parents(".error-group").addClass("error-form");
                                                    toastr["error"](resps.error_msg.address1, "");
                                                }
                                            }
                                        }
                                    });
                            } else if (resps.product_error) {
                                var pid = "";
                                $.each(resps.errors, function (index, value) {
                                    pid = index.replace("product_id_", "");
                                    $(".all-products-div")
                                        .find(".card-main-div[data-pid='" + pid + "']")
                                        .addClass("error-border");
                                    $(".all-products-div")
                                        .find(".card-main-div[data-pid='" + pid + "']")
                                        .find(".checkout-card")
                                        .addClass("error-box-shadow");
                                    $(".all-products-div")
                                        .find(".card-main-div[data-pid='" + pid + "']")
                                        .find(".checkout-card")
                                        .append('<span class="text-danger error-messages">' + value + "</span>");
                                    console.log(value);
                                });
                            } else {
                                $this.removeAttr("disabled");
                                $this.removeClass("disabled");
                                $this.css("opacity", "1");

                                $(".btn-checkout").removeAttr("disabled");
                                $(".btn-checkout").removeClass("disabled");
                                $(".btn-checkout").css("opacity", "1");

                                hideLoader();
                                var html = '<div class="col-sm-12"><div class="alert alert-danger">' + "<strong>Error!!!</strong>" + resps.error_msg;
                                ("</div></div>");
                                $(".input-form-checkout-frm").prepend(html);
                            }
                        } else {
                            if (btn_type == "apple") {
                                hideLoader();
                                $this.removeAttr("disabled");
                                $this.removeClass("disabled");
                                $this.css("opacity", "1");

                                $(".btn-checkout").removeAttr("disabled");
                                $(".btn-checkout").removeClass("disabled");
                                $(".btn-checkout").css("opacity", "1");

                                apple_invoice_id = resps.invoice_id;
                                apple_transaction_id = resps.transaction_id;
                                applePaysubtotal = resps.amount;

                                justEat.applePay.beginPayment();
                            } else if (btn_type == "cod") {
                                if (resps.success && resps.status == "cod_order") {
                                    if (typeof fbq !== "undefined") {
                                        fbq("track", "AddPaymentInfo");
                                        fbq("track", "InitiateCheckout");
                                    }
                                    window.location.href = resps.url;
                                    return false;
                                } else {
                                    if (resps.error_msg) toastr["error"](resps.error_msg, "");
                                    setTimeout(function () {
                                        hideLoader();
                                    }, 4000);
                                    if (resps.status == "success") console.log(resps);
                                    if (typeof fbq !== "undefined") {
                                        fbq("track", "AddPaymentInfo");
                                        fbq("track", "InitiateCheckout");
                                    }
                                    window.location.href = resps.invoice_link;
                                    return false;
                                }
                            } else if (btn_type == "samsung" && resps.success && resps.data.resultMessage == "SUCCESS" && resps.data.resultCode == 0) {


                                if (language == "ar") samsung_lang = "ae_ae";
                                else samsung_lang = "en_ae";

                                //production
                                SamsungPay.connect(
                                    resps.data.id,
                                    resps.data.href,
                                    "d220a9ada5fb4708a6c402",
                                    "https://upay.upayments.com/samsung-response?order_id=" + resps.order_id + "&frm=ustore&track_id=" + resps.track_id,
                                    "https://upay.upayments.com/samsung-response?order_id=" + resps.order_id + "&frm=ustore&track_id=" + resps.track_id,
                                    samsung_lang,
                                    resps.data.encInfo.mod,
                                    resps.data.encInfo.exp,
                                    resps.data.encInfo.keyId
                                );
                            } else if (btn_type == "cc") {
                                var scriptTag = document.createElement("script");
                                scriptTag.type = "text/javascript";
                                var checkoutVersion = 52;
                                var merchant_name = "JEBAYAH";
                                scriptTag.src = "https://nbkpayment.gateway.mastercard.com/checkout/version/52/checkout.js";

                                merchant_name = "900120701";

                                //add this condition below if($merchantObj->from_nbk == 1)
                                merchant_name = "900126601";
                                if (save_cc_card == 1 || (cc_token_id !== "" && typeof cc_token_id != "undefined")) {
                                    checkoutVersion = 60;
                                    scriptTag.src = "https://nbkpayment.gateway.mastercard.com/checkout/version/" + checkoutVersion + "/checkout.js";
                                }

                                scriptTag.setAttribute("data-error", resps.cc_error_url);
                                scriptTag.setAttribute("data-success", resps.cc_success_url);
                                scriptTag.setAttribute("data-cancel", resps.cc_cancel_url);

                                (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(scriptTag);

                                if (cc_token_id !== "" && typeof cc_token_id != "undefined") {
                                    e.preventDefault();

                                    if ($("#cc_tokenization_form").length > 0) $("#cc_tokenization_form").remove();

                                    var actionUrl = "https://ustore.upayments.com/card_payment";
                                    var html =
                                        '<form action="' +
                                        actionUrl +
                                        '" method="POST" id="cc_tokenization_form">' +
                                        '<input type="hidden" name="_token" value="tV7ivibZyjiqZRR7Wosg4RcFvCoM9eqihdi8bmII"/>' +
                                        '<input type="hidden" name="id" class="token_encoded_invoice_id" value="' +
                                        resps.invoice_id +
                                        '"/>' +
                                        '<input type="hidden" name="promo_code" class="token_promo_code" value="' +
                                        promo_code +
                                        '"/>' +
                                        '<input type="hidden" name="order_type" class="token_order_type" value="' +
                                        store_pickup_type +
                                        '"/>' +
                                        '<input type="hidden" name="save_cc_card" class="token_save_cc_card" value="' +
                                        save_cc_card +
                                        '"/>' +
                                        '<input type="hidden" name="cc_token_id" class="token_cc_token_id" value="' +
                                        cc_token_id +
                                        '"/>' +
                                        '<input type="hidden" name="cc_error_url" class="token_cc_error_url" value="' +
                                        resps.cc_error_url +
                                        '"/>' +
                                        '<input type="hidden" name="cc_success_url" class="token_cc_success_url" value="' +
                                        resps.cc_success_url +
                                        '"/>' +
                                        "</form>";

                                    $(html).insertAfter(".ck-continue-shopping");
                                    $("#cc_tokenization_form").submit();

                                    return false;
                                } else {
                                    setTimeout(function () {
                                        $.ajax({
                                            type: "get",
                                            url: "https://ustore.upayments.com/card_payment",
                                            data: { id: resps.invoice_id, promo_code: promo_code, order_type: $("#store_pickup").val(), save_cc_card: save_cc_card, cc_error_url: resps.cc_error_url, cc_success_url: resps.cc_success_url },
                                            dataType: "json",
                                            success: function (resp) {
                                                //console.log(resp);
                                                setTimeout(function () {
                                                    hideLoader();
                                                }, 4000);
                                                if (resp.result == "SUCCESS") {
                                                    if (typeof fbq !== "undefined") {
                                                        fbq("track", "AddPaymentInfo");
                                                        fbq("track", "InitiateCheckout");
                                                    }
                                                    console.log(merchant_name);

                                                    Checkout.configure({
                                                        merchant: merchant_name,
                                                        session: {
                                                            id: resp.session_id,
                                                        },
                                                        order: {
                                                            amount: resp.amount,
                                                            currency: "KWD",
                                                            description: "Payment of invoice : " + resps.invoice_code,
                                                            reference: resp.ref,
                                                            id: resp.order_id,
                                                        },
                                                        interaction: {
                                                            merchant: {
                                                                name: "UPayments",
                                                                address: {
                                                                    line1: "Mercury Tower, Abdullah Almubarak St.",
                                                                    line2: "Mirqab, Kuwait City",
                                                                },
                                                            },
                                                            displayControl: {
                                                                billingAddress: "HIDE",
                                                                customerEmail: "HIDE",
                                                                orderSummary: "SHOW",
                                                                shipping: "HIDE",
                                                            },
                                                        },
                                                    });

                                                    Checkout.showPaymentPage();
                                                } else {
                                                    $this.removeAttr("disabled");
                                                    $this.removeClass("disabled");

                                                    $(".btn-checkout").removeAttr("disabled");
                                                    $(".btn-checkout").removeClass("disabled");
                                                    $(".btn-checkout").css("opacity", "1");

                                                    toastr["error"](resp.msg, "");
                                                }
                                            },
                                        });
                                    }, 2000);
                                }
                            } else {
                                if (resps.error_msg) toastr["error"](resps.error_msg, "");
                                setTimeout(function () {
                                    hideLoader();
                                }, 4000);
                                if (resps.status == "success")
                                    if (typeof fbq !== "undefined") {
                                        fbq("track", "AddPaymentInfo");
                                        fbq("track", "InitiateCheckout");
                                    }
                                window.location.href = resps.paymentURL;
                            }
                        }
                    },
                });
                return false;
            }
            return false;
        });

        setTimeout(() => {
            if ($(".store-pickup-type.deli").length > 0 && $(".show_pickup").length == 0) {
                $(".store-pickup-type.deli").trigger("click");
            } else if ($(".store-pickup-type.pickup").length > 0 && $(".show_pickup").length > 0) {
                $(".store-pickup-type.pickup").trigger("click");
            } else {
                var type = "delivery";
                $("#store_pickup").val(type);
                $(".store-pickup-type").removeClass("active");
                $(this).addClass("active");
                $(".global-section").show();
                if ($(".select2-area").length > 0) $(".select2-area").change();

                if (type == "delivery") {
                    if ($(".delivery_charge_div").length > 0) $(".delivery_charge_div").show();
                    $(".pickup-section").hide();
                    $(".delivery-section").show();
                }
            }
            $(".international-country-than-show").hide();
            /*if(order_delivery_method == 'delivery' && cookieDeliveryType !== 'pickup' && $(".select2-area").length > 0 && $.trim($(".select2-area").val()) != '')
                $(".select2-area").change();
            else if(order_delivery_method == 'pickup')
                $("#store_pickup_branch").change();*/
        }, 300);

        $(".store-pickup-type").on("click", function () {
            var type = $(this).data("type");
            $("#store_pickup").val(type);
            $(".store-pickup-type").removeClass("active");
            $(this).addClass("active");
            $(".global-section").show();
            if ($(".select2-area").length > 0) $(".select2-area").change();
            if (type == "delivery") {
                if ($(".delivery_charge_div").length > 0) $(".delivery_charge_div").show();
                $(".pickup-section").hide();
                $(".delivery-section").show();
            } else {
                if ($(".delivery_charge_div").length > 0) $(".delivery_charge_div").hide();
                $(".delivery-section").hide();
                $(".pickup-section").show();
            }
        });

        if ($("#store_pickup_branch").length > 0 && $("#store_pickup_branch").val() != "") {
            setTimeout(() => {
                $("#store_pickup_branch").change();
                var cookie_pickup_timing = $("#pickup_timing").data("cookie_pickup_timing");
                var cookie_pickup_date = $("#pickup_dates").data("cookie_pickup_date");
                var cookie_pickup_timeslot = $("#pickup_timeslot").data("cookie_pickup_timeslot");
                if (
                    $("#pickup_timing").length > 0 &&
                    $("#pickup_timing").val() != "" &&
                    cookie_pickup_timing != "" &&
                    typeof is_transaction != "undefined" &&
                    is_transaction &&
                    cookie_pickup_timing != "" &&
                    cookie_pickup_timing != "undefined"
                ) {
                    $("#pickup_timing > [value=" + cookie_pickup_timing + "]").attr("selected", "true");
                    $("#pickup_timing").trigger("change");
                    if (cookie_pickup_date != "" && typeof is_transaction != "undefined" && is_transaction && cookie_pickup_date != "" && cookie_pickup_date != "undefined") {
                        $("#pickup_dates > [value=" + cookie_pickup_date + "]").attr("selected", "true");
                        $("#pickup_dates").trigger("change");
                        if (cookie_pickup_timeslot != "" && typeof is_transaction != "undefined" && is_transaction && cookie_pickup_timeslot != "" && cookie_pickup_timeslot != "undefined") {
                            $("#pickup_timeslot > [value='" + cookie_pickup_timeslot + "']").attr("selected", "true");
                        }
                    }
                }
            }, 500);
        }
        $("#store_pickup_branch").on("change", function () {
            var store_open = $(this).find(":selected").data("store_open");
            if (store_open === "no") {
                $("#pickup_timing").find("option").remove().end().append('<option value="" selected>Select Time</option>').val("");
                toastr["error"]("We do not accept orders off working hours. Please visit us again during our working hours", "");
                return false;
            }

            var branch = $(this).val();
            var name = $(this).find(":selected").data("name");
            var timing = $(this).find(":selected").data("time");
            var timing_options = '<option value="" selected>Select Time</option>';
            if (typeof timing != "undefined" && timing != "undefined") {
                timing_options = '<option value="' + timing + '" selected>' + timing + "</option>";
                if (encoded_store_code != "q3nDpxpnpG") timing_options += '<option value="schedule_order">' + schedule_order + "</option>";
            }
            $("#pickup_timing").html(timing_options);

            $('[name="branch_name"]').val(name);
            $("#pickup_timeslot").html('<option value="">Select Time</option>');
            $("#pickup_dates").val("");
            $(".pickup-timeslot,.pickup-dates").hide();
            if ($("#accept_terms").length > 0 && !$("#accept_terms").prop("checked")) $("#accept_terms").trigger("click");

            if ($(".delivery_charge_div").length > 0) {
                if ($(".select2-country").length > 0) $(".select2-country").val("").change();
                else if ($(".select2-area").length > 0) $(".select2-area").val("").change();

                $(".delivery_charge_div").remove();
            }
        });

        $("#pickup_timing").on("change", function () {
            var selected = $(this).val();
            if (selected == "schedule_order") $(".pickup-dates").show();
            else $(".pickup-dates").hide();
        });

        $("#pickup_dates").on("change", function () {
            var selected_date = $(this).val();
            var branch_id = $("#store_pickup_branch").val();
            showPickupTimeSlots(branch_id, selected_date);
        });

        function showPickupTimeSlots(branch_id, selected_date) {
            var branchTimeSlots = {};
            var options = '<option value="">TimeSlot is empty</option>';
            if (Object.keys(pickupTimeSlotsDateWise).length > 0 && pickupTimeSlotsDateWise[branch_id]) {
                branchTimeSlots = pickupTimeSlotsDateWise[branch_id];
                if (Object.keys(branchTimeSlots).length > 0 && branchTimeSlots[selected_date] && branchTimeSlots[selected_date]["status"] == "found") {
                    var totalLength = Object.keys(branchTimeSlots[selected_date]["slots"]).length;
                    branchTimeSlots = branchTimeSlots[selected_date]["slots"];
                    options = '<option value="">Select Time</option>';
                    for (var i = 0; i < totalLength; i++) {
                        options += '<option value="' + branchTimeSlots[i] + '">' + branchTimeSlots[i] + "</option>";
                    }
                }
            }
            $("#pickup_timeslot").html(options);
            $(".pickup-timeslot").show();
        }
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams !== null) history.pushState({}, null, window.location.href.split("?")[0]);

        //START delivery vendors region
        if ($('input[name="store_pickup"]').val() == "delivery") {
            if ($("[name='country']").length > 0 && $("[name='country']").val() !== "kuwait") $(".region_data").show();
        } else {
            $(".region_data").hide();
        }

        $(".file-upload-bootstrap")
            .fileinput({
                theme: "explorer",
                showUpload: true,
                uploadUrl: "https://ustore.upayments.com/upload_customer_data",
                uploadExtraData: function (previewId, index) {
                    var info = { uploaded_doc: uploaded_doc, _token: "tV7ivibZyjiqZRR7Wosg4RcFvCoM9eqihdi8bmII", file_name: file_name, mhash: mhash };
                    return info;
                },
                autoupload: true,
                showCaption: true,
                browseClass: "btn btn-primary browse-btn",
                progress: "percentage",
                showPreview: true,
                overwriteInitial: false,
                allowedFileTypes: ["image"],
                allowedFileExtensions: ["jpg", "png"],
                maxFileSize: 2048,
                mainClass: "file-upload-main",
                multiple: false,
                msgInvalidFileType: "File not supported",
                msgInvalidFileExtension: 'Invalid extension for file "{name}". Only "JPG/PNG" files are supported.',
                msgSizeTooLarge: "File size is too large. Please upload file size less than 2MB",
            })
            .on("change", function (event) {
                var name = $(this).attr("data-file_name");
                file_name = name.replace(/ /g, "_").toLowerCase();
                var file_size = this.files[0].size;
                var flag = true;
                if (file_size > 2000000) flag = false;

                var file_type = this.files[0].type.toLowerCase();
                if (file_type != "image/jpg" && file_type != "image/jpeg" && file_type != "image/png") flag = false;

                if (flag) {
                    $(".loader-document").show();
                    $(this).fileinput("upload");
                }

                var that = $(this);

                event.preventDefault();
                return false;
            });
        $(".file-upload-bootstrap").on("fileuploaded", function (event, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;
            if (typeof response != typeof undefined) {
                if (response.success) {
                    $(".file-upload-bootstrap[data-file_name=" + extra.file_name + "]").attr("data-uploaded", true);
                    uploaded_doc = response.folder_name_client;
                }
            }
            event.preventDefault();
            return false;
        });
        $(".file-upload-bootstrap").on("filebatchuploadcomplete", function (event, data, previewId, index) {
            var form = data.form,
                files = data.files,
                extra = data.extra,
                response = data.response,
                reader = data.reader;
            $(".loader-document").hide();

            event.preventDefault();
            return false;
        });
        setTimeout(function () {
            $("#form_sample_2").css("visibility", "visible");
        }, 700);

        // change address from modal checkout page
        $(document)
            .off("click", ".delivery_addr")
            .on("click", ".delivery_addr", function () {
                clicked_delivery_address = true;
                var data_id = $(this).data("id");
                var address_id = $(this).attr("address_id");
                $(".delivery-button").removeClass("active");
                $(".delivery_addr").addClass("selected");
                $("#delivery_addr_" + address_id).prop("checked", true);
                $(this).attr("checked", true);
                $(this).removeClass("selected");

                $("#change-address").modal("hide");

                if (addresses[data_id].full_name !== undefined) $('input[name="full_name"]').val(addresses[data_id].full_name);

                if (addresses[data_id].email !== undefined) $('input[name="email"]').val(addresses[data_id].email);

                if (addresses[data_id].mobile_number !== undefined) $('input[name="mobile_number"]').val(addresses[data_id].mobile_number);

                $('input[name="street"]').val(addresses[data_id].street);

                //Start
                if (addresses[data_id].address_type !== undefined) {
                    var type = addresses[data_id].address_type;
                    $(".address_type").val(type);
                    $(".delivery-type").removeClass("active");
                    $("[data-type=" + type + "]").addClass("active");
                    //$("#address_type").val(type);
                    $(".appt-off-address, .appt-address, .off-address, .house-address").hide();
                    if (type == "apartment" || type == "office") {
                        $(".appt-off-address").show();
                        if (type == "apartment") $(".appt-address").show();
                        if (type == "office") $(".off-address").show();
                        $(".house-address").find('[name="house"]').removeAttr("required");
                        $(".house-address").find('[name="house"]').val("");
                    } else if (type == "house") {
                        $(".house-address").show();
                        if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                    }
                }
                //End

                if (addresses[data_id].house !== undefined) $('input[name="house"]').val(addresses[data_id].house);

                if (addresses[data_id].building !== undefined) $('input[name="building"]').val(addresses[data_id].building);

                if (addresses[data_id].floor !== undefined) $('input[name="floor"]').val(addresses[data_id].floor);

                if (addresses[data_id].apartment_no !== undefined) $('input[name="apartment_no"]').val(addresses[data_id].apartment_no);

                if (addresses[data_id].office_no !== undefined) $('input[name="office_no"]').val(addresses[data_id].office_no);

                if (addresses[data_id].avenue !== undefined) $('input[name="avenue"]').val(addresses[data_id].avenue);

                if (addresses[data_id].country_code !== undefined) {
                    $(".select2-country").val(addresses[data_id].country_code).change();
                }

                if (addresses[data_id].area !== undefined) {
                    if (addresses[data_id].country_code == "kuwait") {
                        $(".select2-area").val(addresses[data_id].area).change();
                    }
                }
                if (addresses[data_id].block !== undefined && addresses[data_id].block != "") {
                    var disblock = addresses[data_id].block;
                    if (addresses[data_id].country_code == "kuwait") {
                        $(".dropdown-block").select2().val(disblock).change();
                    } else {
                        $('input[name="block"]').val(addresses[data_id].block);
                    }
                }

                // set address id when click on address radio button
                $.ajax({
                    type: "get",
                    url: "https://ustore.upayments.com/buyer/get_address_buyer",
                    data: { id: address_id, encoded_store_code: encoded_store_code },
                    dataType: "json",
                    success: function (resp) {
                        if (resp.success) {
                            if (resp.selected_address_id != "") {
                                $("#delivery-to-show-div").show();
                                $(".delivery-to-section").html(resp.html);
                                $(".ck-address-section").addClass("d-none");
                                $(".delivery-to-section").removeClass("d-none");
                                $(".delivering_name_class").html(resp.full_name);
                            } else {
                                $("#delivery-to-show-div").hide();
                                $(".ck-address-section").show();
                                $(".ck-address-section").removeClass("d-none");
                                $(".delivery-to-section").addClass("d-none");
                            }
                            $("#selected_address_id").val(resp.selected_address_id);
                        } else toastr["error"](resp.msg, "");
                    },
                });
            });

        // START tokenization
        //Saved cards list slide down up
        $("#togBtn").change(function () {
            var flag = $(this).prop("checked");
            if (flag) {
                $(this).attr("checked", "checked");
                $(this).val(1);
            } else {
                $(this).removeAttr("checked");
                $(this).val(0);
                // $("#saved-cards-list, .pay-with").slideUp('slow');
            }
        });
        //end
        if ($(window).width() >= 900) {
            $(".login-here-label").addClass("d-none");
            $(".login-here-text").css("cursor", "pointer");
            $(".save-card-height").css("min-height", 0);
        }

        $(document)
            .off("click", ".bottom_modal_close")
            .on("click", ".bottom_modal_close", function () {
                $("#bottom_modal_login").removeClass("show");
                $("#bottom_modal_login").removeClass("modal");
                $(document.body).css("pointer-events", "");
                $("body").removeClass("modal-open");
                $(".modal-backdrop").remove();
                $("#bottom_modal_login").hide();
                $(".floating-whatsapp").css("bottom", "45px");
                $("#togBtn").trigger("click");
            });
        // END tokenization

        // save address new address amd edit address action
        $(function () {
            $("#save-addresss").submit(function (e) {
                e.preventDefault();

                let url = $(this).attr("action");
                let formData = new FormData(this);
                let that = $(this);

                $.ajax({
                    type: "POST",
                    url: url,
                    data: formData,
                    beforeSend: function () {
                        $(".save-addresss-btn").prop("disabled", true);
                    },
                    success: function (res) {
                        $(".save-addresss-btn").prop("disabled", false);

                        if (res.success) {
                            toastr.success(res.msg, "");
                            $(that)[0].reset();

                            if (res.url) {
                                window.location.reload();
                            }
                        } else {
                            toastr.error(res.msg, "");
                        }
                    },
                    cache: false,
                    contentType: false,
                    processData: false,
                });
            });
        });

        // update address from modal in checkout
        $(document)
            .off("click", ".update_address")
            .on("click", ".update_address", function () {
                var id = $(this).attr("id");
                $("#action_hidden").val("update");
                $("#id_hidden").val($(this).attr("id"));
                $("#title").html("EDIT ADDRESS");
                $(".delivery-button").removeClass("active");
                var siteURL = "https://ustore.upayments.com/buyer";

                $.ajax({
                    type: "get",
                    url: siteURL + "/get_address",
                    data: { _token: "tV7ivibZyjiqZRR7Wosg4RcFvCoM9eqihdi8bmII", id: id },
                    success: function (res) {
                        if (res.success) {
                            if (res.buyerAddressesObj) {
                                $("#full_name").val(res.buyerAddressesObj.full_name);
                                $("#email").val(res.buyerAddressesObj.email);
                                $("#mobile_number").val(res.buyerAddressesObj.mobile_number);
                                $(".address_type").val(res.buyerAddressesObj.address_type);
                                $("#block").val(res.buyerAddressesObj.block);
                                $("#street").val(res.buyerAddressesObj.street);
                                $("#house").val(res.buyerAddressesObj.house);
                                $("#avenue").val(res.buyerAddressesObj.avenue);
                                $("#building").val(res.buyerAddressesObj.building);
                                $("#floor").val(res.buyerAddressesObj.floor);
                                $("#apartment_no").val(res.buyerAddressesObj.apartment_no);
                                $("#office_no").val(res.buyerAddressesObj.office_no);
                                $("#country").val(res.buyerAddressesObj.country);
                                $("#country_code").val(res.buyerAddressesObj.country_code).change();
                                var selected_country = res.buyerAddressesObj.country_code;
                                if (selected_country != "kuwait") {
                                    $(".kuwait_country_dev").hide();
                                    $("#area").val("");
                                } else {
                                    $("#area").val(res.buyerAddressesObj.area).change();
                                    $(".kuwait_country_dev").show();
                                }
                                var type = res.buyerAddressesObj.address_type;
                                $(".delivery-type").removeClass("active");
                                $("[data-type=" + type + "]").addClass("active");

                                $(".appt-off-address, .appt-address, .off-address, .house-address").hide();
                                if (type == "apartment" || type == "office") {
                                    $(".appt-off-address").show();
                                    if (type == "apartment") $(".appt-address").show();
                                    if (type == "office") $(".off-address").show();
                                    $(".house-address").find('[name="house"]').removeAttr("required");
                                    $(".house-address").find('[name="house"]').val("");
                                } else if (type == "house") {
                                    if ($("#delivery_vendors_country").length > 0) {
                                        if ($("#delivery_vendors_country").val() != "kuwait") {
                                            $(".house-address").hide();
                                        } else {
                                            $(".house-address").show();
                                            if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                                        }
                                    } else {
                                        $(".house-address").show();
                                        if ($(".house-address").attr("option") != "optional") $(".house-address").find('[name="house"]').attr("required", "required");
                                    }
                                }
                            }
                        }
                    },
                });
            });

        if ($(".select2-country-checkout").length > 0) {
            //When International delivery then kuwait is automatically selected
            if ($(".select2-country-checkout option[value='kuwait']").val() !== undefined && $(".select2-country  > option").length > 2) $(".select2-country-checkout").val("kuwait").change();
            $(".select2-country-checkout")
                .select2({
                    allowClear: false,
                    containerCssClass: "select2-checkout",
                    dropdownCssClass: "select2-checkout",
                    placeholder: "Country",
                    width: null,
                    debug: true,
                    language: select2_lang,
                    // minimumResultsForSearch: -1
                })
                .on("select2:open", function () {
                    $(".select2-dropdown--above").attr("id", "fix");
                    $("#fix").removeClass("select2-dropdown--above");
                    $("#fix").addClass("select2-dropdown--below");
                    // $('html,body').animate({ scrollTop: $(".select2-area").offset().top-150}, 1000);
                });
        }

        $(".select2-country-checkout").on("change", function () {
            var selected_country = $(this).val();
            var country = $(".select2-country-checkout :selected").text();
            $("#country").val(country);
            if (selected_country != "kuwait") {
                $(".kuwait_country_dev").hide();
                $("#area").val("");
                countryCodeFuncAddress(selected_country);
            } else {
                $(".kuwait_country_dev").show();
                countryCodeFuncAddress("kw");
            }
        });

        countryCodeFuncAddress("kw");
        function countryCodeFuncAddress(countryCode) {
            if (countryCode == "kuwait") countryCode = "kw";
            //$(".iti__selected-flag").remove();
            var input = document.querySelector(".mobile_number_checkout");
            var iti = window
                .intlTelInput(input, {
                    separateDialCode: true,
                    utilsScript: "https://ustore.upayments.com/assets/global/plugins/telephone-code/js/utils.js",
                })
                .setCountry(countryCode);
        }