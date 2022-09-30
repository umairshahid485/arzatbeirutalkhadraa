<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <!-- Bootstrap CSS -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/simple-line-icons.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/bootstrap4.0.0.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/toastr.min.css')}}" rel="stylesheet" type="text/css" />
    <!-- Bootstrap Modal External CSS -->
    <link rel="stylesheet" href="{{asset('assets/css/bootstrap-side-modals.css')}}" />
    <script src="{{asset('https://kit.fontawesome.com/bbf8dc88b8.js')}}" crossorigin="anonymous"></script>
    <link href="{{asset('assets/css/theme.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/theme-common.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/product.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/intlTelInput.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/fileinput.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/demo.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/bootstrap-datepicker.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/select2.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/select2-bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/jquery.datetimepicker.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/theme-checkout.css')}}" rel="stylesheet" type="text/css" />

    <title>Arzatbeirutalkhadraa</title>
    <link rel="shortcut icon" href="{{asset('assets/images/icon.png')}}" type="image/icon" />
</head>
<body class="store-content en store_1aL5886nwO">
<div class="main-feature-block" style="top: 0; z-index: 9999;"></div>
<div class="page-begining">
    <div id="sidebar2">
        <div class="modal modal-left fade" id="lr_sidebar_modal" tabindex="-1" role="dialog" aria-labelledby="lr_sidebar_modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="row sidebar-logo-section">
                            <div class="col pl-0 mobi-back-div">
                                <i class="fa  fa-chevron-left " data-dismiss="modal" aria-hidden="true"></i>
                            </div>
                            <div class="col text-center">
                                <img src="{{asset('assets/images/icon.png')}}" class="sidebar-logo" alt="payments">
                            </div>
                            {{--<div class="col text-right pr-0 mobi-back-div">
                                <a href="#" class="sidebar-business-name">عربي</a>
                            </div>--}}
                        </div>

                         <div class="sidebar-contact-section">
                             <div class="mb-3">
                                 <img src="{{asset('assets/images/question-circle.svg')}}" class="que-circle" alt="">
                                 <span class="font-weight-bold need-help">Need Help?</span>
                                 <div class="mt-1 d-none d-sm-none customer-care">If you need to speak to our customer care representative you can reach us here.</div>
                             </div>
                             <div class="row">
                             </div>
                         </div>

                        @auth
                        <div class="sidebar-contact-section mt-3">
                            <div class="row">
                                <div class="col-12 account-menu-link">
                                    <span class="account-menu-link-span"><img src="{{asset('assets/images/my-account.svg')}}" alt="My Account" /></span>
                                    <a href="{{ url('account-info/update-profile') }}" class="account-menu-link-a">My Account</a>
                                    <i class="fa fa-angle-right account-menu-link-i" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar-contact-section mt-3">
                            <div class="row">
                                <div class="col-12 account-menu-link">
                                    <span class="account-menu-link-span"><img src="{{asset('assets/images/delivery-address.svg')}}" alt="Delivery Addresses" /></span>
                                    <a href="{{ url('account-info/address') }}" class="account-menu-link-a">Delivery Addresses</a>
                                    <i class="fa fa-angle-right account-menu-link-i" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar-contact-section mt-3">
                            <div class="row">
                                <div class="col-12 account-menu-link">
                                    <span class="account-menu-link-span"><img src="{{asset('assets/images/my-orders.svg')}}" alt="My Orders" /></span>
                                    <a href="{{ url('account-info/my-orders') }}" class="account-menu-link-a">My Orders</a>
                                    <i class="fa fa-angle-right account-menu-link-i" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar-contact-section mt-3">
                            <div class="row">
                                <div class="col-12 account-menu-link">
                                    <span class="account-menu-link-span"><img src="{{asset('assets/images/password.svg')}}" alt="Change Password" /></span>
                                    <a href="{{ url('account-info/change-password') }}" class="account-menu-link-a">Change Password</a>
                                    <i class="fa fa-angle-right account-menu-link-i" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar-contact-section mt-3 bg-white">
                            <div class="row">
                                <div class="col-12 account-menu-link">
                                    <span class="account-menu-link-span"><img src="{{asset('assets/images/logout.svg')}}" alt="Sign out" /></span>
                                    <a href="{{ route('user.logout') }}" class="account-menu-link-a">Sign out</a>
                                </div>
                            </div>
                        </div>
                        @endauth

                        {{--<div class="sidebar-contact-section mt-3 social-btns bg-white">
                            <div class="row">
                            </div>
                        </div>--}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('includes.navbar')
