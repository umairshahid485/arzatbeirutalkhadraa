@extends('layouts.user')

@section('content')
    <div class="col-md-9 ">
    @if ($message = Session::get('success'))
        <div class="alert alert-success alert-block">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>{{ $message }}</strong>
        </div>
    @endif

    @if ($message = Session::get('failure'))
        <div class="alert alert-danger alert-block">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>{{ $message }}</strong>
        </div>
    @endif
    <div class="form-group manage-lr-padding {{($type == "update-profile")?'':'hide'}}" id="update-profile">
        <div class="page-cover my-account">
            <div class="page-title hide">
                <div class="left">
                    <a href="#">
                        <img src="{{asset('assets/images/back-btn.svg')}}" alt="">
                    </a>
                </div>
                <div class="center">Account Information</div>
                <div class="right">
                </div>
            </div>

            <div class="page-padding">
                <form method="post" action="{{ url('updateuser') }}" id="account-details-form" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <input type="hidden" name="uid" value="{{!empty($user)?$user->id:'0'}}">
                    <div class="row m-0">
                        <div class="col-12 form-group">
                            <label class="theme-label">Full Name <small class="text-danger">*</small></label>
                            <input type="text" name="name" class="form-control theme-input en" value="{{!empty($user)?$user->name:''}}" placeholder="Full Name">
                            @if ($errors->has('name'))
                                <span>
                                    <strong>{{ $errors->first('name') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-12 form-group">
                            <label class="theme-label">Email Address <small class="text-danger">*</small></label>
                            <input type="email" name="email" class="form-control theme-input en" placeholder="Email Address" readonly="readonly" value="{{!empty($user)?$user->email:''}}">
                            @if ($errors->has('email'))
                                <span>
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                            @endif
                        </div>
                        <div class="col-12 form-group">
                            <label class="theme-label">Mobile Number</label>
                            <input type="text" name="phone_number" class="form-control theme-input en" value="{{!empty($user)?$user->phone_number:''}}" placeholder="Mobile Number">
                            @if ($errors->has('phone_number'))
                                <span>
                                    <strong>{{ $errors->first('phone_number') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-12 form-group">
                            <label for="theme-label avatar">Upload Avatar</label>
                            <input type="file" class="form-control theme-input en" id="avatar" name="avatar" accept="image/*">
                        </div>
                        <?php
                        if($user->photo != ""){
                            $img = "uploads/users/".$user->photo;
                            ?>
                        <div class="form-group col-12">
                            <img alt="" class="img-circle" src="{{asset($img)}}" width="100px" height="100px" />
                        </div>
                            <?php
                        }
                        ?>
                        <div class="col-12 form-group">
                            <button type="submit" class="btn btn-block theme-btn text-uppercase save-account-details">Update</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>

    <div class="form-group manage-lr-padding {{($type == "address")?'':'hide'}}" id="addresses">
        <div class="page-cover">
            <div class="page-title hide">
                <div class="left">
                    <a href="#">
                        <img src="{{asset('assets/images/back-btn.svg')}}" alt="">
                    </a>
                </div>
                <div class="center">Delivery Addresses</div>
                <div class="right"></div>
            </div>

            <div class="page-padding">
                <div class="row justify-content-center delivery-addr-section">
                    <div class="col add-address" data-toggle="modal" data-target="#regular_modal"><span>+ ADD NEW ADDRESS</span> <i class="fa fa-chevron-right align-middle pull-right" aria-hidden="true"></i>
                    </div>

                    <!-- Old Addresses -->
                    @if($addresses->count() > 0)
                        <input type="hidden" id="removeAddress" value="{{ route('remove.address') }}">
                        @foreach($addresses as $address)
                            <div class="col-12 form-group card-case">
                                <div class="col p-0">
                                    <h6 class="align-middle font-weight-bold">
                                        {{$address['data']['full_name']}}
                                        <button class="btn btn-sm btn-light text-uppercase gray-badge pull-right">
                                            @if($address['address_type'] == "house")
                                                <i class="fa fa-home" aria-hidden="true"></i>
                                            @elseif($address['address_type'] == "office")
                                                <i class="fa fa-suitcase" aria-hidden="true"></i>
                                            @elseif($address['address_type'] == "apartment")
                                                <i class="fa fa-building" aria-hidden="true"></i>
                                            @endif
                                            {{$address['address_type']}}
                                        </button>
                                    </h6>
                                    <p>
                                        {{!empty($address['data']['area'])?'Area: '.$address['data']['area'].', ':''}}
                                        {{!empty($address['data']['block'])?'Block: '.$address['data']['block'].', ':''}}
                                        {{!empty($address['data']['street'])?'Street: '.$address['data']['street'].', ':''}}
                                        {{!empty($address['data']['house'])?'House: '.$address['data']['house'].', ':''}}
                                        {{!empty($address['data']['avenue'])?'Avenue: '.$address['data']['avenue'].', ':''}}
                                        {{!empty($address['data']['building'])?'Building: '.$address['data']['building'].', ':''}}
                                        {{!empty($address['data']['floor'])?'Floor: '.$address['data']['floor'].', ':''}}
                                        {{!empty($address['data']['office_no'])?'Office No: '.$address['data']['office_no'].', ':''}}
                                        {{!empty($address['data']['apartment_no'])?'Apartment No: '.$address['data']['apartment_no'].', ':''}}
                                        {{!empty($address['data']['country_code'])?'Country: '.$address['data']['country_code']:''}}
                                    </p>
                                    <p>Mobile: {{$address['data']['mobile_number']}}</p>
                                    <p>Email: {{$address['data']['email']}}</p>
                                </div>
                                <div class="col p-0">
                                    <div class="line-80 m-0"></div>
                                </div>
                                <div class="row m-0 mt-2">
                                    <div class="col-6 p-0" style="border-right: 1px solid #dbdbdb;">
                                        <button class="btn btn-block theme-btn theme-btn-outline border-0 text-uppercase update_address" data-id="{{$address->id}}" data-type="{{$address->address_type}}" data-detail="{{json_encode($address->data)}}">Edit</button>
                                    </div>
                                    <div class="col-6 p-0" style="border-left: 1px solid #dbdbdb;">
                                        <button class="btn btn-block theme-btn theme-btn-outline border-0 text-uppercase remove-address" data-id="{{$address->id}}">Remove</button>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @endif

                    <!-- Old Addresses END -->

                </div>
            </div>

        </div>

        @include('includes.address-form')
    </div>

    <div class="form-group manage-lr-padding {{($type == "my-orders")?'':'hide'}}" id="my-orders">

        <!-- Mobile View -->
        <div class="row m-0 mt-2 mb-2 d-none filter-block">
            <div class="panel panel-default w-100 filter-panel">
                {{--<div class="panel-heading p-2">
                    <div class="row d-flex align-items-center">
                        <div class="col-2">
                            <a href="#">
                                <img src="{{asset('assets/images/back-btn.svg')}}" class="border-none" width="35px" alt="">
                            </a>
                        </div>
                        <div class="col-10 text-center pr-5 font-weight-bold">
                            Filter By
                        </div>
                    </div>
                </div>--}}
                {{--<div class="panel-body">
                    <div class="row">
                        <div class="col-4">
                            <ul class="nav nav-pills custom-nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link custom-nav-link rounded-0 active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">
                                        Merchants
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link custom-nav-link rounded-0" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                                        Date
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link custom-nav-link rounded-0" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                                        Status
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="col-8 pl-0">
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                    <ul class="list-group custom-list-group"></ul>
                                </div>
                                <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                    <input type="text" name="date_mobile" id="datepicker" class="form-control theme-input" placeholder="Date" value="">
                                </div>
                                <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                    <ul class="list-group custom-list-group">
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="awaiting_processing">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Awaiting Processing</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="processing">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Processing</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="ready_for_pickup">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Out for Delivery</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="shipped">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Shipped</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="delivered">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Delivered</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="will_not_deliver">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Will not deliver</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="returned">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Returned</span>
                                            </label>
                                        </li>
                                        <li class="list-group-item px-1 py-2 m-0 rounded-0">
                                            <label class="custom-tick-section d-flex justify-content-start align-items-center m-0 p-1">
                                                <input type="checkbox" class="theme-checkbox custom-theme-checkbox" name="status_mobile" value="cancelled">
                                                <span class="checkmark"></span>
                                                <span class="checkbox-text text-truncate pl-1">Cancelled</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="panel-footer p-3">
                    <div class="row">
                        <div class="col-5">
                            <button type="button" class="btn btn-block text-uppercase btn-light btn-cancel-filter p-2">Cancel</button>
                        </div>
                        <div class="col-7">
                            <button type="button" onclick="#" class="btn btn-block theme-btn text-uppercase p-2">Apply Filter</button>
                        </div>
                    </div>
                </div>--}}
            </div>
        </div>
        <!-- Mobile View END -->

        <!-- Desktop View -->
        <div class="page-cover orders-page">
            <div class="page-title hide">
                <div class="left">
                    <a href="#">
                        <img src="{{asset('assets/images/back-btn.svg')}}" alt="">
                    </a>
                </div>
                <div class="center">My Orders</div>
                <div class="right"></div>
            </div>
            <div class="page-padding pl-2 pr-2">
                <div class="row m-0 justify-content-center">
                    <div class="col-md-12">
                        <div class="row p-1">
                            <div class="col-10 col-md-12 p-0 pr-1">
                                {{--<form action="#" method="GET" role="search">--}}
                                    <div class="text-right my-orders-search en">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input type="text" id="search-order" placeholder="Search all orders" class="form-control">
                                    </div>
                                {{--</form>--}}
                            </div>
                        </div>

                        <!-- Old Orders History -->
                        <div class="row p-1">
                            <div class="col-10 col-md-12 p-0 pr-1">
                                <div class="table-responsive" style="font-size: small;">
                                    <table class="table table-hover" id="myOrders">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Grand Total</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        @if($orders->count() > 0)
                                            @foreach($orders as $order)
                                                <tr>
                                                    <td>{{$order->order_number}}</td>
                                                    <td class="overflow">{{$order->first_name}}</td>
                                                    <td>{{$order->grand_total}}</td>
                                                    <td>{{$order->created_at}}</td>
                                                    <td>{{$order->status}}</td>
                                                </tr>
                                            @endforeach
                                        @endif
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- Old Orders History END -->

                        <br>
                    </div>
                </div>
            </div>
        </div>
        <!-- Desktop View END -->

    </div>

    <div class="form-group manage-lr-padding {{($type == "change-password")?'':'hide'}}" id="change-password">
        <div class="page-cover">
            <div class="page-title hide">
                <div class="left">
                    <a href="#">
                        <img src="{{asset('assets/images/back-btn.svg')}}" alt="">
                    </a>
                </div>
                <div class="center">Change Password</div>
                <div class="right">
                </div>
            </div>

            <div class="page-padding change-password-section">
                <form method="post" action="{{ route('change.password') }}" id="password_change">
                    {{ csrf_field() }}
                    <div class="row m-0">
                        <div class="col-12 form-group">
                            <label class="d-none">Current Password</label>
                            <input type="password" name="current-password" class="form-control theme-input" placeholder="Current Password" required="required">
                            @if ($errors->has('current-password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('current-password') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-12 form-group">
                            <label class="d-none">New Password</label>
                            <input type="password" name="new-password" class="form-control theme-input" placeholder="New Password" required="required">
                            @if ($errors->has('new-password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('new-password') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-12 form-group">
                            <label class="d-none">Retype New Password</label>
                            <input type="password" name="new-password_confirmation" class="form-control theme-input" placeholder="Retype New Password" required="required">
                        </div>
                        <div class="col-12 form-group">
                            <button type="submit" class="btn btn-block theme-btn text-uppercase change-password-btn">Change Password</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    </div>
@endsection
