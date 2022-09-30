<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $data = Category::query();
        $data = $data->get();
        return view('admin.categories',compact('data'));
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
        $cat = new Category;
        $validatedData = $this->validate($request,[
            'name'     => 'required|string',
            'description'  => 'string',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $cat->name               = trim($request->name);
        $cat->description        = htmlentities($request->description);

        if ($request->file('image'))
        {
            $file = request()->file('image');
            $file->store('category', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $cat->image = $imgName;
        }

        $cat->save();
        return back()
            ->with('success','Category Added successfully.');
    }

    public function show($param)
    {
        $single = Category::where('id', $param)->orWhere('slug', $param)->firstOrFail();
        if (empty($single)){
            abort(404);
        }

        $categories = Category::all();

        return view('category',compact('categories','single'));
    }

    public function edit($id)
    {
        $category = Category::where(['id'=>$id])->first();
        if(empty($category)){
            abort(404);
        }
        $data = Category::query();
        $data = $data->get();

        return view('admin.categories',compact('data','category','id'));
    }

    public function update(Request $request)
    {
        $validatedData = $this->validate($request,[
            'name'     => 'required|string',
            'description'  => 'string',
            'image' => 'image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        $id = $request->id;
        $category = Category::where(['id'=>$id])->first();
        $category->name = $request->name;
        $category->description = $request->description;

        if ($request->file('image')) {
            $file = request()->file('image');
            $file->store('category', ['disk' => 'my_files']);
            $imgName = $file->hashName();
            $category->image = $imgName;
        }

        if ($category->save()){
            return redirect()->route('categories.index')->with('success','Category Updated successfully.');
        }else{
            return back()
                ->with('failure','Something went wrong during updation.');
        }
    }

    public function destroy(Request $request)
    {
        $id = $request->id;
        $data = Category::find($id);
        $response = $data ->delete();
        if($response)
            echo "Category Deleted successfully.";
        else
            echo "There was a problem. Please try again later.";
    }
}
