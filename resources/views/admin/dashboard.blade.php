@extends('layouts.default')
@section('content')
<?php
    $users      = DB::table('users')->where('is_admin','=',0)->count();
    $admins     = DB::table('users')->where('is_admin','>',0)->count();
    $products   = DB::table('products')->count();
    $categories = DB::table('categories')->count();
    $orders     = DB::table('orders')->count();
?>
    <h4 class="page-title"> Dashboard
        <small> &amp; statistics</small>
    </h4>
    <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="dashboard-stat blue">
                <div class="visual">
                    <i class="fa fa-users"></i>
                </div>
                <div class="details">
                    <div class="number">
                        <span data-counter="counterup" data-value="{{$users}}">{{$users}}</span>
                    </div>
                    <div class="desc">Users </div>
                </div>
                <a class="more" href="{{ route('users') }}"> View more
                    <i class="m-icon-swapright m-icon-white"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="dashboard-stat red">
                <div class="visual">
                    <i class="fa fa-user"></i>
                </div>
                <div class="details">
                    <div class="number">
                        <span data-counter="counterup" data-value="{{$admins}}">{{$admins}}</span>
                    </div>
                    <div class="desc">Admins</div>
                </div>
                <a class="more" href="{{ route('admins') }}"> View more
                    <i class="m-icon-swapright m-icon-white"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="dashboard-stat yellow">
                <div class="visual">
                    <i class="fa fa-globe"></i>
                </div>
                <div class="details">
                    <div class="number">
                        <span data-counter="counterup" data-value="{{$categories}}">{{$categories}}</span>
                    </div>
                    <div class="desc">Categories</div>
                </div>
                <a class="more" href="{{ route('categories.index') }}"> View more
                    <i class="m-icon-swapright m-icon-white"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="dashboard-stat purple">
                <div class="visual">
                    <i class="fa fa-globe"></i>
                </div>
                <div class="details">
                    <div class="number">
                        <span data-counter="counterup" data-value="{{$products}}">{{$products}}</span>
                    </div>
                    <div class="desc">Products</div>
                </div>
                <a class="more" href="{{ route('products.index') }}"> View more
                    <i class="m-icon-swapright m-icon-white"></i>
                </a>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div class="dashboard-stat grey">
                <div class="visual">
                    <i class="fa fa-globe"></i>
                </div>
                <div class="details">
                    <div class="number">
                        <span data-counter="counterup" data-value="{{$orders}}">{{$orders}}</span>
                    </div>
                    <div class="desc">Orders</div>
                </div>
                <a class="more" href="{{ route('order.index') }}"> View more
                    <i class="m-icon-swapright m-icon-white"></i>
                </a>
            </div>
        </div>
    </div>

@endsection
