<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $orders = Order::query();
        $orders = $orders->get();
        return view('admin.orders',compact('orders'));
    }

    public function orderDetail($id){
        $order = Order::where(['id'=>$id])->with('address')->first();
        if (empty($order)){
            abort(404);
        }
        return view('admin.order-detail',compact('order'));
    }
}
