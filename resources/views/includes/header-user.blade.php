<!doctype html>
        <html lang="en">
        <head>
            <!-- Required meta tags -->
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <!-- Bootstrap CSS -->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
            <link href="{{asset('assets/css/font-awesome.min.css')}}" rel="stylesheet" type="text/css" />
            <link href="{{asset('assets/css/simple-line-icons.min.css')}}" rel="stylesheet" type="text/css" />
            <link href="{{asset('assets/css/bootstrap4.0.0.min.css')}}" rel="stylesheet" type="text/css" />
            <link href="{{asset('assets/css/toastr.min.css')}}" rel="stylesheet" type="text/css" />
            <!-- Bootstrap Modal External CSS -->
            <link rel="stylesheet" href="{{asset('assets/css/bootstrap-side-modals.css')}}">
            <link href="{{asset('assets/css/buyer.css?v=1647262693')}}" rel="stylesheet" type="text/css" />
            <link href="{{asset('assets/css/theme-common.css?v=1647262693')}}" rel="stylesheet" type="text/css" />

            <link href="{{asset('assets/css/intlTelInput.css')}}" rel="stylesheet" type="text/css" />
            <link href="{{asset('assets/css/demo.css')}}" rel="stylesheet" type="text/css" />

            <title>Arzatbeirutalkhadraa</title>
            <link rel="shortcut icon" href="{{asset('assets/images/icon.png')}}" type="image/icon">

            <style>
                .error{color: red;}
                .success{color:#a6c2ad!important;}
                :root{
                    --contentBG: #F0F0F0;
                    --fontColor: #fff;
                    --headerLinkColor: #fff;
                    --buttonColor: #399e39;
                }
                .iti.iti--allow-dropdown.iti--separate-dial-code{ width: 100%; }
            </style>
        </head>

        <body class="buyer-content en">

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


            <div class="page-content">
                <div class="buyer-container">
                    <!-- Page Content -->
                    <section>
                        <div class="pb-3 d-block d-md-none">
                            <div class="col-12">
                                <h4 class="m-0">My Account</h4>
                            </div>
                        </div>
                        <div class="row m-0">
                            @include('includes.user-sidebar')
