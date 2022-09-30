<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;

class CheckoutController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function placeOrder(Request $params){
        if (!session('cart')){
            return redirect()->back()->with('failure', 'Your cart is empty! Add some products in the cart.');
        }

        if ($params['address_id'] == 0) {
            $validatedData = $this->validate($params, [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'address' => 'required|string',
                'city' => 'required|string',
                'postal_code' => 'required|string',
                'phone_number' => 'required',
                //'notes'     => 'required|string',
            ]);
        }

        $params = $params->toArray();

        $items = session()->get('cart', []);
        if (!session('cart')){
            return redirect()->back()->with('failure', 'Your cart is empty! Add some products in the cart.');
        }

        $order = Order::create([
            'order_number'      =>  'ORDER-'.strtoupper(uniqid()),
            'user_id'           => auth()->user()->id,
            'status'            =>  'pending',
            'grand_total'       =>  $this->getInfoFromCart(),
            'item_count'        =>  $this->getInfoFromCart(false),
            'payment_status'    =>  0,
            'payment_method'    =>  $params['payment_type'],
            'first_name'        =>  $params['first_name'],
            'last_name'         =>  $params['last_name'],
            'address'           =>  $params['address'],
            'city'              =>  $params['city'],
            'country'           => '',
            'post_code'         =>  $params['postal_code'],
            'phone_number'      =>  $params['phone_number'],
            'notes'             =>  $params['special_notes'],
            'address_id'        =>  $params['address_id'],
            "reference_number"  => ''
        ]);

        if ($order && !empty($items)) {
            foreach ($items as $product_id=>$item)
            {
                $product = Product::where('id',$product_id)->first();

                $orderItem = new OrderItem([
                    'product_id'    =>  $product->id,
                    'quantity'      =>  $item['quantity'],
                    'price'         =>  $item['quantity']*$item['price'],
                ]);

                $order->items()->save($orderItem);
            }
        }else{
            return redirect()->back()->with('failure', 'Something Went wrong while placing the order. Please try again after sometime.');
        }

        if (!empty($params['payment_type'])){
            $response = $this->redirectToOttuPaymentUrl($order);
            if (!empty($response) && isset($response->url)){
                session()->forget('cart');
                return redirect()->away($response->url);
            }else{
                $order->items()->delete();
                $order->delete();
                return redirect()->back()->with('failure', 'Something Went wrong at payment gateway side.');
            }
        }
        return redirect()->back()->with('success', 'Your order placed successfully');
    }

    public function getInfoFromCart($total = true){
        $cart = session()->get('cart', []);
        $subTotal = $item_count = 0;

        if(!empty($cart)){
            foreach ($cart as $c){
                $item_count += $c['quantity'];
                $subTotal += $c['price'] * $c['quantity'];
            }
        }
        if ($total){
            return $subTotal;
        }else{
            return $item_count;
        }
    }

    public function redirectToOttuPaymentUrl($order){
        if (!empty($order)){
            $curl = curl_init();
            $data = array(
                "amount"=> $order->grand_total,
                "currency_code"=> "KWD",
                "gateway_code"=> $order->payment_method,
                "order_no"=> $order->order_number,
                "customer_email"=> $order->user->email,
                "disclosure_url"=>"https://arzatbeirutalkhadraa.com/disclose-ok",
                "redirect_url"=>"https://arzatbeirutalkhadraa.com/after-payment"
            );

            curl_setopt_array($curl, array(
                CURLOPT_URL => 'https://payment.arzatbeirutalkhadraa.com/pos/crt/',
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_ENCODING => '',
                CURLOPT_MAXREDIRS => 10,
                CURLOPT_TIMEOUT => 0,
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => json_encode($data),
                CURLOPT_HTTPHEADER => array(
                    'Content-Type: application/json'
                ),
            ));

            $response = curl_exec($curl);

            curl_close($curl);
            $response = json_decode($response);

            return $response;

        }
    }
}
