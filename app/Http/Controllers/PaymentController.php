<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class PaymentController extends Controller
{
    public function discloseOK(Request $request){
        $data = $request->all();
        if (!empty($data)){
            $order_number = $data->order_no;
            $order = Order::where(['order_number' => $order_number])->first();
            if (!empty($order)) {
                $order->gateway_reponse = $data;
                $order->save();
            }
        }
    }

    public function afterPaymentRedirection(){
        $order_number = isset($_GET['order_no'])?$_GET['order_no']:"";
        $reference_number = isset($_GET['reference_number'])?$_GET['reference_number']:"";

        if(!empty($order_number) && !empty($reference_number)) {
            $order = Order::where(['order_number' => $order_number])->first();
            if (!empty($order)) {
                $order->reference_number = $reference_number;
                $order->save();
            }
            echo "payment process is successful";
        }else{
            echo "payment process is unsuccessful";
        }
    }
}
