<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        if (Auth::guest()){
            return redirect()->route('login');
        }
        else
        {
           return view('admin.dashboard');
        }
    }

    public function adminView(Request $request){
        if (Auth::guest()){
            return redirect()->route('login');
        } else
        {
            $loggedInUser = Auth::id();
            $data = User::query();
            $data = $data->where('is_admin','>',0)->where('id', '!=', $loggedInUser)->get();
            return view('admin.admins',compact('data'));
        }
    }

    public function add(Request $request)
    {
        $user = new User;
        $validatedData = $this->validate($request,[
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'required|string|min:6|confirmed'
        ]);

        $user ->name     = $request->name;
        $user ->email    = $request->email;
        $user ->password = bcrypt($request->password);
        $user ->is_admin = $request->user_type;

        if ($request->file('avatar')) {
            $file = request()->file('image');
            $file->store('users', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $user->photo = $imgName;
        }

        $user->save();
            return back()
                    ->with('success','Admin Added successfully.');
    }
}
