<div class="header buyer-header">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light shadow booking-header global-header">
        <div class="container-fluid">
            <div class="d-block d-lg-none">
                <button class="navbar-toggler p-0 border-0" type="button" data-toggle="modal" data-target="#lr_sidebar_modal">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand ml-0" href="#">
                    <img src="{{asset('assets/images/icon.png')}}" alt="ARZAT BEIRUT ALKHADRAA CO FOR SELLING TOBACCO AND CIGARETTES" /> <span>ARZAT BEIRUT ALKHADRAA CO FOR SELLING TOBACCO AND CIGARETTES</span> </a>
            </div>
            <a class="navbar-brand d-none d-lg-block" href="/">
                <img src="{{asset('assets/images/icon.png')}}" alt="ARZAT BEIRUT ALKHADRAA CO FOR SELLING TOBACCO AND CIGARETTES" /> <span>ARZAT BEIRUT ALKHADRAA CO FOR SELLING TOBACCO AND CIGARETTES</span> </a>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link text-capitalize contactus-link" href="#">Contact us</a>
                    </li>
                    <li class="nav-item">
                        @if (Route::has('login'))
                            @auth
                                <a class="nav-link" href="{{ url('account-info/update-profile') }}">
                                    <img src="{{asset('assets/images/user-outline-black.svg')}}" alt="Buyer Account" style="width: 18px;" />
                                </a>
                            @else
                                <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Login</a>

                                @if (Route::has('register'))
                                    <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                                @endif
                            @endif
                        @endif
                    </li>
                </ul>
            </div>
            <div class="nav-mobile-links buyer-nav-mobile-links">
                @if (Route::has('login'))
                    @auth
                        <a href="{{ url('account-info/update-profile') }}">
                            <img src="{{asset('assets/images/user-outline-black.svg')}}" alt="Buyer Account" style="width: 18px;" />
                        </a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                        @endif
                    @endif
                @endif
            </div>
        </div>
    </nav>
</div>
