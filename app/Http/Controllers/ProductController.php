<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Address;
use App\Models\User;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $data = Product::query();
        $data = $data->get();
        $categories = Category::all();
        return view('admin.products',compact('data','categories'));
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $product = new Product;
        $validatedData = $this->validate($request,[
            'brand_name'     => 'required|string',
            'category_id'     => 'required|integer',
            'quantity'  => 'required|integer',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $product->brand_name       = trim($request->brand_name);
        $product->generic_name     = trim($request->generic_name);
        $product->category_id      = $request->category_id;
        $product->quantity         = $request->quantity;
        $product->quantity_left    = $request->quantity;
        $product->sell_price       = $request->sell_price;
        $product->original_price   = $request->original_price;

        if ($request->file('image')) {
            $file = request()->file('image');
            $file->store('products', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $product->image = $imgName;
        }

        $product->save();
        return back()
            ->with('success','Product Added successfully.');
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $product = Product::where(['id'=>$id])->first();
        $categories = Category::all();

        if(empty($product)){
            abort(404);
        }
        $data = Product::query();
        $data = $data->get();

        return view('admin.products',compact('data','product','id','categories'));
    }

    public function update(Request $request)
    {
        $validatedData = $this->validate($request,[
            'brand_name'     => 'required|string',
            'category_id'     => 'required|integer',
            'quantity'  => 'required|integer'
        ]);

        $id = $request->id;
        $product = Product::where(['id'=>$id])->first();
        $product->brand_name       = trim($request->brand_name);
        $product->generic_name     = trim($request->generic_name);
        $product->category_id      = $request->category_id;
        $product->quantity         = $request->quantity;
        $product->quantity_left    = $request->quantity;
        $product->sell_price       = $request->sell_price;
        $product->original_price   = $request->original_price;

        if ($request->file('image')) {
            $file = request()->file('image');
            $file->store('products', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $product->image = $imgName;
        }

        if ($product->save()){
            return redirect()->route('products.index')->with('success','Product Updated successfully.');
        }else{
            return back()
                ->with('failure','Something went wrong during updation.');
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        $data = Product::find($id);
        $response = $data ->delete();
        if($response)
            echo "Product Deleted successfully.";
        else
            echo "There was a problem. Please try again later.";
    }

    public function checkout()
    {
        $current_user_id = Auth::id();
        $addresses = Address::where(['user_id'=>$current_user_id])->get();
        if($current_user_id > 0){
            $user = User::find($current_user_id);
        }
        return view('checkout',compact('user','addresses'));
    }

    public function addToCart($id)
    {
        $product = Product::findOrFail($id);
        $cart = session()->get('cart', []);

        if(isset($cart[$id])) {
            $cart[$id]['quantity']++;
        } else {
            $cart[$id] = [
                "name" => $product->brand_name,
                "quantity" => 1,
                "price" => $product->sell_price,
                "image" => $product->image
            ];
        }

        session()->put('cart', $cart);
        return redirect()->back()->with('success', 'Product added to cart successfully!');
    }

    public function updateCart(Request $request)
    {
        if($request->id && $request->quantity){
            $cart = session()->get('cart');
            $cart[$request->id]["quantity"] = $request->quantity;
            session()->put('cart', $cart);
            session()->flash('success', 'Cart updated successfully');
        }
    }

    public function remove(Request $request)
    {
        if($request->id) {
            $cart = session()->get('cart');
            if(isset($cart[$request->id])) {
                unset($cart[$request->id]);
                session()->put('cart', $cart);
            }
            session()->flash('success', 'Product removed successfully');
        }
    }

    public function clearCart(Request $request){
        $request->session()->forget('cart');
        return redirect()->back()->with('success', 'Your Cart is empty now!');
    }
}
