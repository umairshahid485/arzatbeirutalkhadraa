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

@include('includes.mainNavbar')

<div class="page-content">
    <!-- Full Page Image Header with Vertically Centered Content -->

    <?php $cover = asset("assets/images/cover.jpeg"); ?>
    <header class="masthead tablet-branding-img" style="background-image: url('{{$cover}}');"></header>
    <!-- Page Content -->
    <section class="menu-margin">
        <div class="row no-gutters">
            <div class="col-lg-4 home-left-section">
