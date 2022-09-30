<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\CreateAddress;
use App\Models\Address;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Request $request)
	{
        $data = User::query();

        $data = $data->where('is_admin','=',0)->get();
        return view('admin.users',compact('data'));
	}

	public function add(Request $request)
    {
        $user = new User;
        $validatedData = $this->validate($request,[
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user ->name = $request->name;
        $user ->email = $request->email;
        $user ->password = bcrypt($request->password);

        if ($request->file('avatar')) {
            $file = request()->file('avatar');
            $file->store('users', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $user->photo = $imgName;
        }

        $user->save();
            return back()
                    ->with('success','User Added successfully.');
    }

    public function single_user(Request $request)
    {
           $results = [];

            if($request->ajax()){
                $user_id = $request->id;
                $user = User::find($user_id);

                $results['id'] = $user->id;
                $results['name'] = $user->name;
                $results['email'] = $user->email;


                return response()->json($results);
            }
    }

    public function update(Request $request)
    {
        $id = $request->uid;
        $user = User::find($id);
        $validatedData = $this->validate($request,[
            'name' => 'required|string|max:255',
            'email' => 'string|email|max:255|unique:users,email,'.$id
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        if (isset($request->phone_number)){
            $user ->phone_number = $request->phone_number;
        }

        if ($request->file('avatar')) {
            $file = request()->file('avatar');
            $file->store('users', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $user->photo = $imgName;
        }

        $user->save();
        return back()
            ->with('success','Profile Updated successfully.');
    }

    public function deleteuser(Request $request)
    {
        $id = $request->id;
        $data = User::find($id);
        $response = $data ->delete();
        if($response)
            echo "User Deleted successfully.";
        else
            echo "There was a problem. Please try again later.";
    }

    //For Admin Site User Profile
    public function user_profile(Request $request){
        $id = $request->id;
        $data = User::find($id);
        return view('userprofile',compact('data'));
    }

    //For User Site User Profile
    public function profileupdate(Request $request){
        $id = $request->id;
        $data = User::find($id);
        dd($data);
    }

    public function accountInfo($type,Request $request){
        $current_user_id = Auth::id();
        $orders = Order::where(['user_id'=>$current_user_id])->get();
        $addresses = Address::where(['user_id'=>$current_user_id])->get();
        if($current_user_id > 0){
            $user = User::find($current_user_id);
        }
        return view('account-info',compact('type','user','addresses','orders'));
    }

    public function changePassword(Request $request){

        if (!(Hash::check($request->get('current-password'), Auth::user()->password))) {
            return redirect()->back()->with("failure","Your current password does not matches with the password you provided. Please try again.");
        }

        if(strcmp($request->get('current-password'), $request->get('new-password')) == 0){
            //Current password and new password are same
            return redirect()->back()->with("failure","New Password cannot be same as your current password. Please choose a different password.");
        }

        $validatedData = $request->validate([
            'current-password' => 'required',
            'new-password' => 'required|string|min:6|confirmed',
        ]);

        //Change Password
        $user = Auth::user();
        $user->password = bcrypt($request->get('new-password'));
        $user->save();

        return redirect()->back()->with("success","Password changed successfully !");

    }

    public function saveAddress(CreateAddress $request){
        $data = $request->except('_method', '_token','uid','address_type','aid');
        $msg = 'New address added successful!';
        if ($request->aid == 0) {
            $address = Address::create([
                "address_type" => $request->get('address_type'),
                "data" => $data,
                "user_id" => Auth::user()->id
            ]);
        }else{
            $address = Address::find($request->aid);
            $address->update([
                "address_type" => $request->get('address_type'),
                "data" => $data
            ]);

            $msg = "Address updated Successfully!";
        }

        if($address){
            return redirect()->back()->with('success',$msg);
        }else{
            return redirect()->back()->with("failure","Something went wrong. Please try again.");
        }
    }

    public function removeAddress(Request $request)
    {
        if($request->id) {
            $address = Address::find($request->id);
            if (count($address->orders) > 0){
                session()->flash('failure', 'You cannot delete this address because its already attached with an order.');
            }else{
                $address->delete();
                session()->flash('success', 'Address removed successfully');
            }
        }
    }
}
