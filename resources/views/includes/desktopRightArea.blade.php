<div class="col-lg-8 en desktop-branding-img">
    <?php $cover = asset("assets/images/cover.jpeg"); ?>
    <header class="masthead" style="background-image: url('{{$cover}}');">
        <div class="h-100 d-none d-lg-block" style="background: rgba(0, 0, 0, 0.5);">
            <div class="row m-0 pt-3">
                <div class="col-3 pl-5">
                    @auth
                        <button class="navbar-toggler fa fa-bars home-menu-icon" type="button" data-toggle="modal" data-target="#lr_sidebar_modal"></button>
                    @endauth
                </div>
                <div class="col-6">
                    <div class="home-global-search">
                        <input type="text" placeholder="Search" class="form-control store-search" />
                        <em class="fa fa-search"></em>
                    </div>
                </div>
                <div class="col-3">
                    <ul class="home-right-menu list-unstyled text-center" style="position: relative; top: 5px;">
                        @if (Route::has('login'))
                            @auth
                                <a href="{{ url('account-info/update-profile') }}">
                                    <img src="{{asset('assets/images/user.svg')}}" alt="User" style="width: 18px;" />
                                </a>
                            @else
                                <li>
                                    <a href="{{ route('login') }}" class="text-sm text-gray-700 underline">Login</a>
                                </li>

                                @if (Route::has('register'))
                                    <li>
                                        <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 underline">Register</a>
                                    </li>
                                @endif
                            @endif
                        @endif
                        <li class="dropdown cart-dropdown">
                            <a href="javascript:void(0)" class="cart-total btn-cart" data-toggle="dropdown">
                                <img src="{{asset('assets/images/shopping-bag.svg')}}" alt="shopping-bag" style="width: 18px;" />
                                @if(session('cart'))
                                    <span class="cart-badge">{{sizeof(session('cart'))}}</span>
                                @endif
                            </a>
                            <div class="dropdown-menu cart-menu pl-3 pr-3">
                                <div class="cart-body">
                                    <!-- Cart items list if items added to cart -->
                                    @php $total = 0 @endphp
                                    @if(session('cart'))
                                        @foreach(session('cart') as $id => $details)
                                            @php $total += $details['price'] * $details['quantity'] @endphp
                                            <div class="row cart-detail dropdown-product-item">
                                                <div class="col-lg-3 col-sm-3 col-3 cart-detail-img">
                                                    <img src="{{ asset('uploads/products/'.$details['image']) }}" alt="{{ $details['name'] }}" width="70px" height="70px">
                                                </div>
                                                <div class="col-lg-7 col-sm-7 col-7 cart-detail-product pl-3 pr-0">
                                                    <p class="text-truncate">{{ $details['name'] }}</p>
                                                    <span class="price text-secondary"> {{ $details['quantity'] }} x {{ $details['price'] }} KD</span>
                                                </div>
                                                <div class="col-lg-2 col-sm-2 col-2 dropdown-product-remove">
                                                    <a href="javascript:void(0)" class="remove-from-cart" data-id="{{$id}}">
                                                        <span class="btn-remove-cart-item">
                                                            <i class="fa fa-times header-remove-from-cart"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        @endforeach
                                    @else
                                        <div class="text-center empty-cart-msg p-2">Your cart is empty!</div>
                                    @endif
                                    <!-- Cart items list END-->

                                    <div class="cart-list-above"></div>
                                </div>
                                @if(session('cart'))
                                    <div class="checkout">
                                    <div class="d-flex justify-content-between align-items-center pt-2 pb-1">
                                        <div class="">Total</div>
                                        <div class="total-cart-amt">{{$total}} KD</div>
                                    </div>
                                    <div class="row pt-2 pb-2">
                                        <div class="col-6 text-left">
                                            <a href="/checkout" class="btn theme-btn btn-rounded btn-block check-for-min-order py-2" data-store_open_msg="open">View Cart</a>
                                        </div>
                                        <div class="col-6 text-right">
                                            <a href="{{ route('empty.cart') }}" class="btn btn-danger btn-block py-2">Empty Cart</a>
                                        </div>
                                    </div>
                                </div>
                                @endif
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row h-100 align-items-center m-0">
                <div class="col-12 text-center">
                    <img src="{{asset('assets/images/icon.png')}}" style="vertical-align: middle; border-radius: 50%;" alt="ARZAT BEIRUT ALKHADRAA CO FOR SELLING TOBACCO AND CIGARETTES" />
                    <h1 class="title">ARZAT BEIRUT ALKHADRAA CO FOR SELLING TOBACCO AND CIGARETTES</h1>
                </div>
            </div>
        </div>
    </header>
</div>
</div>
