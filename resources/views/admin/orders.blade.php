@extends('layouts.default')
@section('content')
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

    <div class="row">
        <div class="col-md-12 ">
            <div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption font-dark">
                        <i class="icon-settings font-dark"></i>
                        <span class="caption-subject bold uppercase">Orders</span>
                    </div>
                </div>
                <div class="portlet-body">
                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="sample_1">
                        <thead>
                        <tr>
                            <th> Id </th>
                            <th> User Email </th>
                            <th> Total Price</th>
                            <th> Item Count </th>
                            <th> Payment Status </th>
                            <th> Action </th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($orders as $order)
                            @if($order->user && $order -> item_count > 0 && $order -> grand_total > 0)
                                <tr class="odd gradeX">
                                    <td> {{$order -> id}}</td>
                                    <td> {{$order->user->email}}</td>
                                    <td> {{$order -> grand_total}}</td>
                                    <td> {{$order -> item_count}}</td>
                                    <td> {{$order -> status}}</td>
                                    <td>
                                        <a href="{{ route('order.detail', $order->id) }}" target="_blank" class="btn sbold green" title="View order Detail"><i class="fa fa-eye" aria-hidden="true"></i></a>
                                    </td>
                                </tr>
                            @endif
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection
