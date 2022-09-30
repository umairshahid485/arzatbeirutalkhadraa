@extends('layouts.default')
@section('content')
@php $address = [];
if ($order->address_id > 0){
    $address = $order->getRelations()['address'];
}
@endphp
<div class="row">
    <div class="col-md-12">
        <h2>Order Detail</h2>
        <table class="table table-bordered table-hover">
            <tr>
                <th>Order No:</th>
                <td><span class="label label-primary"><b>{{$order->order_number}}</b></span></td>
            </tr>
            <tr>
                <th>Customer Email:</th>
                <td>{{$order->user->email}}</td>
            </tr>
            @if(empty($address))
            <tr>
                <th>Firstname:</th>
                <td>{{$order->first_name}}</td>
            </tr>
            <tr>
                <th>Lastname:</th>
                <td>{{$order->last_name}}</td>
            </tr>
            <tr>
                <th>Address:</th>
                <td>{{$order->address}}</td>
            </tr>
            <tr>
                <th>City:</th>
                <td>{{$order->city}}</td>
            </tr>
            <tr>
                <th>Postal Code:</th>
                <td>{{$order->post_code}}</td>
            </tr>
            <tr>
                <th>Phone no:</th>
                <td>{{$order->phone_number}}</td>
            </tr>
            <tr>
                <th>Notes:</th>
                <td>{{$order->notes}}</td>
            </tr>
            @else
                @foreach($address['data'] as $k=>$add)
                    @if(!empty($add))
                        <tr>
                            <th>{{str_replace('_',' ',ucfirst($k))}}:</th>
                            <td>{{$add}}</td>
                        </tr>
                    @endif
                @endforeach
                <tr>
                    <th>Address Type:</th>
                    <td><span class="label label-primary"><b>{{ucfirst($address['address_type'])}}</b></span></td>
                </tr>
            @endif
            <tr>
                <th>Items Count:</th>
                <td>{{$order->item_count}}</td>
            </tr>
            <tr>
                <th>Grand Total:</th>
                <td>{{$order->grand_total}}</td>
            </tr>
            <tr>
                <th>Payment Status:</th>
                <td>
                    @if($order->status == "pending")
                        <span class='label label-sm label-default'><b>PENDING</b></span>
                    @elseif($order->status == "success")
                        <span class='label label-sm label-success'><b>Success</b></span>
                    @else
                        <span class='label label-sm label-primary'><b>{{$order->status}}</b></span>
                    @endif
                </td>
            </tr>
            <tr>
                <th>Created at</th>
                <td>{{ $order->created_at->format('d-M-Y') }}</td>
            </tr>
        </table>
        @if($order->items)
            <h3>Products</h3>
            <table class="table table-bordered table-hover table-striped ">
                <thead>
                    <tr>
                        <th>Product Id</th>
                        <th>Product name</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->items as $item)
                        <tr>
                            <td>{{$item->product_id}}</td>
                            <td>{{$item->product->brand_name}}</td>
                            <td>{{$item->quantity}}</td>
                            <td>{{$item->price}}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>


        @endif
    </div>

</div>


@endsection
