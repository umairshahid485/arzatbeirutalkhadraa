!(function(a) {
    var b = /iPhone/i,
        c = /iPod/i,
        d = /iPad/i,
        e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        f = /Android/i,
        g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        i = /IEMobile/i,
        j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
        k = /BlackBerry/i,
        l = /BB10/i,
        m = /Opera Mini/i,
        n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
        p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
        q = function(a, b) {
            return a.test(b);
        },
        r = function(a) {
            var r = a || navigator.userAgent,
                s = r.split("[FBAN");
            return (
                "undefined" != typeof s[1] && (r = s[0]),
                (s = r.split("Twitter")),
                "undefined" != typeof s[1] && (r = s[0]),
                (this.apple = {
                    phone: q(b, r),
                    ipod: q(c, r),
                    tablet: !q(b, r) && q(d, r),
                    device: q(b, r) || q(c, r) || q(d, r),
                }),
                (this.amazon = {
                    phone: q(g, r),
                    tablet: !q(g, r) && q(h, r),
                    device: q(g, r) || q(h, r),
                }),
                (this.android = {
                    phone: q(g, r) || q(e, r),
                    tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)),
                    device: q(g, r) || q(h, r) || q(e, r) || q(f, r),
                }),
                (this.windows = {
                    phone: q(i, r),
                    tablet: q(j, r),
                    device: q(i, r) || q(j, r),
                }),
                (this.other = {
                    blackberry: q(k, r),
                    blackberry10: q(l, r),
                    opera: q(m, r),
                    firefox: q(o, r),
                    chrome: q(n, r),
                    device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r),
                }),
                (this.seven_inch = q(p, r)),
                (this.any =
                    this.apple.device ||
                    this.android.device ||
                    this.windows.device ||
                    this.other.device ||
                    this.seven_inch),
                (this.phone =
                    this.apple.phone || this.android.phone || this.windows.phone),
                (this.tablet =
                    this.apple.tablet || this.android.tablet || this.windows.tablet),
                "undefined" == typeof window ? this : void 0
            );
        },
        s = function() {
            var a = new r();
            return (a.Class = r), a;
        };
    "undefined" != typeof module && module.exports && "undefined" == typeof window ?
        (module.exports = r) :
        "undefined" != typeof module &&
        module.exports &&
        "undefined" != typeof window ?
        (module.exports = s()) :
        "function" == typeof define && define.amd ?
        define("isMobile", [], (a.isMobile = s())) :
        (a.isMobile = s());
})(this);

if (isMobile.any) {
    var ath = addToHomescreen({
        debug: "android", // activate debug mode in ios emulation
        skipFirstVisit: false, // show at first access
        startDelay: 0, // display the message right away
        lifespan: 0, // do not automatically kill the call out
        displayPace: 0, // do not obey the display pace
        privateModeOverride: true, // show the message in private mode
        maxDisplayCount: 0, // do not obey the max display count
    });
}
var add_app = false;
var merchantAnnouncement = "";
var merchant_announcement = localStorage.getItem(
    "is_announcement_displayed_" + encoded_store_code
);
if (
    merchant_announcement != null &&
    (merchant_announcement == 1 || merchant_announcement == "1")
) {
    $("#announcement-block").hide();
} else {
    if (merchantAnnouncement != "expired") {
        $("#announcement-block").show();
    }
}

$(document)
    .off("click", "#btn-close-announcement")
    .on("click", "#btn-close-announcement", function() {
        localStorage.setItem("is_announcement_displayed_" + encoded_store_code, 1);
        $("#announcement-block").hide();
    });

$(".home-menu-icon").click(function() {
    if ($("#announcement-block").is(":visible")) {
        $("#lr_sidebar_modal").addClass("announcement-margin");
    }
});

$(window).on("load", function() {
    if (popup_flag == "yes") {
        var cookieValue = getCookie("banner"); // Read the cookie
        if (cookieValue == undefined) {
            setCookie("banner", true, 1); // Set a cookie
            $("#popupdesgin").modal("show");
        }
    }
});

$("#popupdesgin").on("click", function() {
    $("#popupdesgin").modal("toggle");
});

// START add app
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
    document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return keyValue ? keyValue[2] : null;
}

function eraseCookie(key) {
    var keyValue = getCookie(key);
    setCookie(key, keyValue, "-1");
}

var show_add_app = true;
if (add_app == true && $(window).width() < 992) {
    if (
        getCookie("add_app_always_close") !== undefined &&
        getCookie("add_app_always_close") !== null
    ) {
        if (getCookie("add_app_always_close") === "true") {
            $(".add-top-header").hide();
            show_add_app = false;
        }
        // eraseCookie('add_app_always_close');
    }
    if (show_add_app == true) {
        //header_top();
        $(document)
            .off("click", ".ath-container")
            .on("click", ".ath-container", function() {
                $(".page-begining").css("opacity", 1);
            });

        $(document)
            .off("click", ".add-app-close")
            .on("click", ".add-app-close", function() {
                setCookie("add_app_always_close", "true", "365");
                if (
                    getCookie("add_app_always_close") !== undefined &&
                    getCookie("add_app_always_close") !== null
                ) {
                    if (getCookie("add_app_always_close") === "true") {
                        $(".add-top-header").hide();
                    }
                }
            });
    }
}
// END add app

$(document)
    .off("click", ".add-app-close")
    .on("click", ".add-app-close", function() {
        setCookie("add_app_always_close", "true", "365");
        if (
            getCookie("add_app_always_close") !== undefined &&
            getCookie("add_app_always_close") !== null
        ) {
            if (getCookie("add_app_always_close") === "true") {
                $(".add-top-header").hide();
            }
        }
    });