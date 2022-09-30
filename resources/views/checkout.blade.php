@extends('layouts.cart')

@section('content')
    <div class="page-content">
        <!-- Page Content -->
        <section class="content-bg checkout-page checkout-form">
            @if(session('success'))
                <div class="alert alert-success" style="width: 40%;top: 20px">
                    {{ session('success') }}
                </div>
            @endif
            <div class="row m-0">
                <div class="col-lg-4 order-lg-8 manage-lr-padding">
                    <div class="row no-gutters">
                        <div class="col-4">
                            <h4 class="m-0 py-3">Cart</h4>
                        </div>
                        <div class="col-8 text-right">
                            <a href="/" class="py-3 ck-continue-shopping"> <i class="fa fa-arrow-left" aria-hidden="true"></i> Continue Shopping </a>
                        </div>
                    </div>

                    <div class="cart-list-cover">
                        <ul class="list-product-view en">
                            @php $total = 0 @endphp
                            @if(session('cart'))
                                @foreach(session('cart') as $id => $details)
                                    @php $total += $details['price'] * $details['quantity'] @endphp
                                    <li class="product-case">
                                        <a href="javascript:;" data-pid="{{$id}}">
                                            <div class="prod-img">
                                                <img src="{{ asset('uploads/products/'.$details['image']) }}" alt="{{ $details['name'] }}">
                                            </div>
                                            <div class="info px-3" style="margin-left: 10px;">
                                                <h3>{{ $details['name'] }}</h3>
                                                <p></p>
                                                <div class="price-section">
                                                    <span class="price">{{ $details['price'] }} KD</span>
                                                </div>
                                                <div class="">
                                                    <input type="number" min="1" value="{{ $details['quantity'] }}" data-id="{{$id}}" class="price-action quantity update-cart" style="width: 65px;text-align: center;"/>
                                                </div>
                                                <div class="delete-product en delete_item remove-from-cart" data-id="{{$id}}">
                                                    <i class="fa fa-trash-o delete_item" aria-hidden="true"></i> Remove
                                                </div>
                                            </div>
                                        </a>
                                        <em class="bottom-border"></em>
                                    </li>
                                @endforeach
                            @else
                                <li class="product-case">
                                    <div class="text-center">Your cart is empty!</div>
                                </li>
                            @endif
                        </ul>
                        @if(session('cart'))
                            <div class="row cart-total m-0 pb-2">
                                <div class="col-6 label">
                                    Cart Total
                                </div>
                                <div class="col-6 amount customer-cart-total text-right">
                                    {{$total}} KD
                                </div>
                            </div>
                            <div class="row cart-total delivery-fees pb-2 m-0" style="display: none;">
                                <div class="col-6 label">
                                    Delivery fee
                                </div>
                                <div class="col-6 amount text-right delivery_fee">
                                    0.00 KD
                                </div>
                            </div>
                            <div class="row cart-total pb-2 m-0 coupon_div" style="display: none;">
                                <div class="col-6 label">
                                    Promo code discount
                                </div>
                                <div class="col-6 amount text-right coupon_amount">
                                    0.00 KD
                                </div>
                            </div>
                            <div class="row cart-total estimate_delivery_div pb-2 m-0" style="display: none;">
                                <div class="col-6 label">
                                    Estimated Delivery
                                </div>
                                <div class="col-6 amount text-right estimate_delivery_date">
                                    -
                                </div>
                            </div>
                            <div class="line-80"></div>
                            <div class="row cart-total sub-total m-0 pt-3">
                                <div class="col-6 label font-weight-bold">
                                    Sub Total
                                </div>
                                <div class="col-6 amount text-right font-weight-bold sub_total">
                                    {{$total}} KD
                                </div>
                            </div>
                        @endif
                    </div>
                </div>

                <div class="col-lg-8 order-lg-1 manage-lr-padding">
                    <div class="row m-0 py-3">
                        <div class="col-6 title p-0">
                            <h4>Delivery</h4>
                        </div>
                        <div class="col-6 title p-0">
                            <button class="btn btn-light btn-sm ck-login pull-right" data-toggle="modal" data-target="#change-address" style="background: white"><i class="fa fa-location-arrow" aria-hidden="true"></i> Select Address</button>
                        </div>
                    </div>
                    <form name="checkout-form" action="{{ route('place.order') }}" method="post" role="form">
                        @csrf
                        <input type="hidden" name="address_id" value="{{old('address_id')?old('address_id'):'0'}}" id="address_id">
                        <div class="delivery-section">
                        <div class="input-outer ck-address-section">
                            <div class="row m-0 mb-3">
                                <div class="col-12 title p-0">
                                    Enter your delivery details
                                </div>
                            </div>
                            @if ($errors->any())
                                <div class="row">
                                    <div class="alert alert-danger">
                                        <ul>
                                            @foreach ($errors->all() as $error)
                                                <li>{{ $error }}</li>
                                            @endforeach
                                        </ul>
                                    </div>
                                </div>
                            @endif
                            @if(session('failure'))
                                <div class="row">
                                    <div class="alert alert-danger">
                                        {{ session('failure') }}
                                    </div>
                                </div>
                            @endif
                            <div class="row">

                                <div class="col-md-6 form-group">
                                    <input type="text" name="first_name" id="first_name" value="{{old('first_name')?old('first_name'):''}}" placeholder="First Name" class="text-capitalized form-control theme-input" />
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" name="last_name" id="last_name" value="{{old('last_name')?old('last_name'):''}}" placeholder="Last Name" class="text-capitalized form-control theme-input" />
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" name="address" id="address" value="{{old('address')?old('address'):''}}" placeholder="Address" class="text-capitalized form-control theme-input" />
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" name="city" id="city" value="{{old('city')?old('city'):''}}" placeholder="City" class="text-capitalized form-control theme-input" />
                                </div>
                                <div class="col-md-6 form-group">
                                    <input type="text" name="postal_code" value="{{old('postal_code')?old('postal_code'):''}}" id="postal_code" placeholder="Postal Code" class="text-capitalized form-control theme-input" />
                                </div>

                                <div class="col-md-6 form-group ck-input error-group en">
                                    <div class="">
                                        <input
                                            type="tel"
                                            name="phone_number"
                                            placeholder="Mobile Number"
                                            class="text-capitalized form-control"
                                            id="phone_number"
                                            autocomplete="off"
                                            value="{{old('phone_number')?old('phone_number'):''}}"
                                        />
                                    </div>


                                </div>

                                <div class="col-md-6 form-group ck-input appt-off-address extra-fields" style="display: none;" id="building">
                                    <input type="text" name="building" value="" placeholder="Building " class="text-capitalized form-control" value="{{old('building')?old('building'):''}}" />
                                </div>
                                <div class="col-md-6 form-group ck-input appt-off-address extra-fields" style="display: none;" id="floor">
                                    <input type="text" name="floor" value="" placeholder="Floor " class="text-capitalized form-control" value="{{old('floor')?old('floor'):''}}" />
                                </div>
                                <div class="col-md-6 form-group ck-input appt-address extra-fields" style="display: none;" id="apartment_no">
                                    <input type="text" name="apartment_no" value="" placeholder="Apartment No " class="text-capitalized form-control" value="{{old('apartment_no')?old('apartment_no'):''}}" />
                                </div>
                                <div class="col-md-6 form-group ck-input off-address extra-fields" style="display: none;" id="office_no">
                                    <input type="text" name="office_no" value="" placeholder="Office No " class="text-capitalized form-control" value="{{old('office_no')?old('office_no'):''}}" />
                                </div>

                                <div class="col-md-12 form-group extra-fields">
                                    <textarea name="special_notes" placeholder="Special Notes" class="en text-capitalized form-control special_notes" rows="4">{{old('special_notes')?old('special_notes'):''}}</textarea>
                                </div>
                                <div class="col-md-12 form-group extra-fields payment_type">
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="knet-test">
                                            <input type="radio" class="form-check-input" id="knet-test" name="payment_type" value="knet-test" checked>knet-test
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="knet">
                                            <input type="radio" class="form-check-input" id="knet" name="payment_type" value="knet">knet-live
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="credit-card">
                                            <input type="radio" class="form-check-input" id="credit-card" name="payment_type" value="credit-card">Credit Card Live
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-12 mt-4">
                                    <button type="submit" class="btn btn-success btn-lg btn-block">Place Order</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    </form>

                    <h4 class="m-0 py-3 payment-button-section" style="display: none">Pay with</h4>
                    <div class="row m-0" style="display: none">
                        <div class="col-12 p-0">
                            <div class="ck-pay-btns">
                                <div class="form-group" style="border: 1px solid #e0e0e0; border-radius: 5px;">
                                    <div class="payment-buttons-div">
                                        <a class="payment-btn knet border-0 btn-checkout" data-btn="knet" data-type="knet">
                                            <img class="en logo_img" src="{{asset('assets/images/KNET.svg')}}" style="height: 44px; width: 44px;" />
                                            <span class="pay-btn-label pl-1 align-middle d-none d-lg-inline" style="display: block;">KNET</span>
                                            <label class="en amount knet-amount-label">
                                                <span> Pay 73.350 KWD</span>
                                            </label>
                                            <span> <i class="fa fa-chevron-right" style="float: right;" aria-hidden="true"></i> </span>
                                        </a>
                                    </div>
                                    <div class="line-80 m-0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal fade" id="change-address" tabindex="-1" role="dialog" aria-labelledby="change-address">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title">Choose Delivery Location</h6>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        @if($addresses->count() > 0)
                            @foreach($addresses as $address)
                                <div class="row m-0 address-list delivery_addr selected">
                                    <div class="col-1">
                                        <input type="radio" name="select_address" value="{{$address->id}}">
                                    </div>
                                    <div class="col-1">
                                        <img src="{{asset('assets/images/truck-with-location.svg')}}" />
                                    </div>
                                    <div class="col-10" style="max-width: 80%; margin-left: 5px;">
                                        <h6 class="align-middle">
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
                                    </div>
                                </div>
                            @endforeach
                        @endif
                        <div class="row m-0 pb-2">
                            <div class="col-12">
                                <a  href="{{ url('account-info/address') }}" target="_blank" class="btn btn-block theme-btn text-uppercase add_new_address">
                                    + ADD NEW ADDRESS
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
