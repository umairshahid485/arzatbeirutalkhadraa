<div class="col-md-3 d-none d-md-block col-sm-12 form-group manage-lr-padding ">
    <ul class="list-unstyled side-menu en">
        <li class="{{($type == "update-profile")?'active':''}}">
            <a href="{{ url('account-info/update-profile') }}">
                <img src="{{asset('assets/images/my-account.svg')}}" alt="">
                <span>Account Information</span>
                <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i>
            </a>
        </li>
        <li class="{{($type == "address")?'active':''}}">
            <a href="{{ url('account-info/address') }}">
                <img src="{{asset('assets/images/delivery-address.svg')}}" alt="">
                <span>Delivery Addresses</span>
                <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i>
            </a>
        </li>
        <li class="{{($type == "my-orders")?'active':''}}">
            <a href="{{ url('account-info/my-orders') }}">
                <img src="{{asset('assets/images/my-orders.svg')}}" alt="">
                <span>My Orders</span>
                <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i>
            </a>
        </li>
        <li class="{{($type == "change-password")?'active':''}}">
            <a href="{{ url('account-info/change-password') }}">
                <img src="{{asset('assets/images/password.svg')}}" alt="">
                <span>Change Password</span>
                <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i>
            </a>
        </li>
        <li>
            <a href="{{ route('user.logout') }}">
                <img src="{{asset('assets/images/logout.svg')}}" alt="">
                <span>Log out</span>
                <i class="fa fa-chevron-right pull-right" aria-hidden="true"></i>
            </a>
        </li>
    </ul>
</div>
