<input type="hidden" name="address_form" id="address_form" value="{{($errors->any() && $type == "address")?1:0}}">
<input type="hidden" name="addressType" id="addressType" value="{{old('address_type')?old('address_type'):''}}">
<div class="modal fade" id="regular_modal" tabindex="-1" role="dialog" aria-labelledby="regular_modal" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title">Add New Address</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="post" action="{{ route('user.save.address') }}" id="save-addresss">
                    <input type="hidden" value="0" name="aid" id="aid">
                    {{ csrf_field() }}
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <input type="text" id="full_name" name="full_name" placeholder="Full Name" value="{{!empty($user)?$user->name:''}}" class="text-capitalized form-control theme-input">
                            @if ($errors->has('full_name'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('full_name') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group">
                            <input type="email" name="email" placeholder="Email Address" id="email" value="{{!empty($user)?$user->email:''}}" class="text-capitalized form-control theme-input">
                            @if ($errors->has('email'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                            @endif
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-4">
                                    <span class="btn btn-block delivery-button active" data-type="house" onclick="changeType('house')" id="locationHouse">
                                        <i class="fa fa-home" aria-hidden="true"></i>
                                        <div>House</div>
                                    </span>
                        </div>
                        <div class="col-4">
                                    <span class="btn btn-block delivery-button" data-type="apartment" onclick="changeType('apartment')" id="locationApartment">
                                        <i class="fa fa-building" aria-hidden="true"></i>
                                        <div class="text-truncate">Apartment</div>
                                    </span>
                        </div>
                        <div class="col-4">
                                    <span class="btn btn-block delivery-button" data-type="office" onclick="changeType('office')" id="locationOffice">
                                        <i class="fa fa-briefcase" aria-hidden="true"></i>
                                        <div>Office</div>
                                    </span>
                        </div>
                    </div>
                    <input type="hidden" name="address_type" class="address_type" value="house">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            <input type="text" name="mobile_number" id="mobile_number" placeholder="Mobile Number" value="{{!empty($user)?$user->phone_number:''}}" class="text-capitalized form-control theme-input">
                            @if ($errors->has('mobile_number'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('mobile_number') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group">
                            <select class="text-capitalized form-control theme-input" data-id="0" id="country_code" name="country_code">
                                <option value="">Country</option>
                                <option value="Kuwait" data-id="kuwait">Kuwait</option>
                                <option value="Qatar" data-id="Qatar">Qatar</option>
                                <option value="ANDORRA" data-id="AD">ANDORRA</option>
                                <option value="UAE" data-id="AE">UNITED ARAB EMIRATES</option>
                            </select>
                            @if ($errors->has('country_code'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('country_code') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group">
                            <select class="text-capitalized form-control theme-input" id="area" name="area" data-id="0">
                                <option value="">Area</option>
                                <option value="dasman">Dasman</option>
                                <option value="sharq">Sharq</option>
                                <option value="murgab">Mirqab</option>
                                <option value="qibla">Qibla</option>
                            </select>
                            @if ($errors->has('area'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('area') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group">
                            <input type="text" name="block" id="block" placeholder="Block" class="text-capitalized form-control theme-input">
                            @if ($errors->has('block'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('block') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group">
                            <input type="text" name="street" id="street" placeholder="Street" class="text-capitalized form-control theme-input">
                            @if ($errors->has('street'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('street') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group house-address" id="house">
                            <input type="text" name="house" placeholder="House" class="text-capitalized form-control theme-input">
                            @if ($errors->has('house'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('house') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group appt-off-address" id="building" style="display: none;">
                            <input type="text" name="building" placeholder="Building" class="text-capitalized form-control theme-input">
                            @if ($errors->has('building'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('building') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group appt-off-address" id="floor" style="display: none;">
                            <input type="text" name="floor" placeholder="Floor" class="text-capitalized form-control theme-input">
                            @if ($errors->has('floor'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('floor') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group appt-address" id="apartment_no" style="display: none;">
                            <input type="text" name="apartment_no" placeholder="Apartment No" class="text-capitalized form-control theme-input">
                            @if ($errors->has('apartment_no'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('apartment_no') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group off-address" id="office_no" style="display: none;">
                            <input type="text" name="office_no" placeholder="Office No" class="text-capitalized form-control theme-input">
                            @if ($errors->has('office_no'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('office_no') }}</strong>
                                        </span>
                            @endif
                        </div>
                        <div class="col-md-6 form-group">
                            <input type="text" name="avenue" id="avenue" placeholder="Avenue" class="text-capitalized form-control theme-input">
                            @if ($errors->has('avenue'))
                                <span class="help-block">
                                            <strong>{{ $errors->first('avenue') }}</strong>
                                        </span>
                            @endif
                        </div>
                    </div>

                    <div class="row m-0 my-3">
                        <div class="col p-0">
                            <div class="line-80 m-0"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-6">
                            <button type="button" class="btn btn-block theme-btn theme-btn-outline text-uppercase" data-dismiss="modal">Cancel</button>
                        </div>
                        <div class="col-6">
                            <button type="submit" class="btn btn-block theme-btn text-uppercase save-addresss-btn">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

