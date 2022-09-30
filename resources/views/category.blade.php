@extends('layouts.main')

@section('content')
    <div class="container" style="margin-top: 20px">
        @if(session('success'))
            <div class="alert alert-success">
                {{ session('success') }}
            </div>
        @endif
    </div>
    <div class="dynamic-product-list">
        <div class="row no-gutters content-bg category-list product-list-view home-section BO1opR0JN9">
            <div class="col-12 horizontal-category-list bg-white position-sticky et-hero-tabs d-flex">
                <div class="col-2 col-sm-1">
                    <i class="fa fa-bars bg-white" aria-hidden="true" data-toggle="modal" data-target="#category_list_modal" style="cursor: pointer;"></i>
                </div>
                <div class="col-10 col-sm-11">
                    <div class="et-hero-tabs-container mt-2">
                        <div class="owl-carousel owl-theme d-flex owl-loaded owl-drag">
                            <div class="owl-stage" style="transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 458px;">
                                @if(!empty($categories))
                                    @foreach($categories as $k=>$category)
                                        <div class="owl-item" style="width: auto; margin-right: 1px;">
                                            <div class="item" data-count="{{$k}}">
                                                <a class="et-hero-tab btn show-category-product {{($category->id == $single->id)?"active clicked":""}}" data-count="{{$category->id}}" data-id="{{$category->id}}" href="#tab-{{$category->id}}" data-order="1">{{$category->name}}</a>
                                            </div>
                                        </div>
                                    @endforeach
                                @endif
                            </div>

                            <div class="owl-dots disabled"></div>
                        </div>
                    </div>
                </div>
            </div>
            @if(!empty($categories))
                @foreach($categories as $k=>$category)
                    <div class="col-12 en category-product-list et-slide" id="tab-{{$category->id}}">
                        <div class="title">
                            <h5 class="m-0">
                                {{$category->name}}
                            </h5>
                        </div>
                        @if(!empty($category->products))
                            <ul class="list-product-view">
                            @foreach($category->products as $k=>$product)
                                <li class="product-case en" data-prod_id="{{$product->id}}">
                                <a href="{{ route('add.to.cart', $product->id) }}">
                                    <div class="info">
                                        <div class="d-flex show-product">
                                            <span class="product-count"> </span>
                                            <h3 class="pr-1">{{$product->brand_name}}</h3>
                                        </div>
                                        <div class="prod-desc show-product">
                                            <p class="show-product">
                                                معسل سلوم
                                            </p>
                                        </div>
                                        <div class="price-section">
                                            <span class="price">{{$product->sell_price}} KWD</span>
                                            <i class="fa fa-plus-circle direct-add-to-cart" aria-hidden="true" data-id="{{$product->id}}" data-qty="1" data-from="direct" data-language="en"></i>
                                        </div>
                                        <div class="delete-product en" data-prod_id="{{$product->id}}" data-from="product_list">
                                            <i class="fa fa-trash-o" aria-hidden="true" data-prod_id="{{$product->id}}" data-from="product_list"></i>
                                        </div>
                                    </div>
                                    <div class="prod-img show-product">
                                        <img src="{{ asset('uploads/products/'.$product->image) }}" alt="{{$product->brand_name}}">
                                    </div>
                                </a>
                                <em class="bottom-border"></em>
                            </li>
                            @endforeach
                        </ul>
                        @endif
                    </div>
                @endforeach
            @endif
        </div>
    </div>

    <div class="modal modal-left fade" id="category_list_modal" tabindex="-1" role="dialog" aria-labelledby="category_list_modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <div class="delivery-location-section delivery-location">
                        <div class="text-center delivery-location-header">
                            <img src="{{asset('assets/images/back-btn.svg')}}" class="float-left deli-loc-back-btn d-none d-lg-block" data-dismiss="modal" />
                            <span class="align-middle delivery-location-title">Categories</span>
                            <button type="button" class="close d-lg-none" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                    </div>
                    @if(!empty($categories))
                        @foreach($categories as $category)
                            <div class="d-flex justify-content-between inner-category-list show-category-product" data-count="0" data-dismiss="modal" style="cursor: pointer;">
                                <div class="modal-category-name">
                                    {{$category->name}}
                                </div>
                                <div>
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <div class="d-flex justify-content-between inner-category-list show-category-product">
                            <div class="modal-category-name">
                                No Record Found!
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        </div>
    </div>

@endsection
