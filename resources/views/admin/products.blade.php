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
    <div class="row formtoggle {{((!empty($product) && $id > 0) || $errors->any())?'':'hide'}}">
                        <div class="col-md-12 ">
                            <!-- BEGIN SAMPLE FORM PORTLET-->
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="icon-pencil"></i>
                                        <span class="caption-subject bold uppercase"> {{(!empty($product) && $id > 0)?'Edit':'Add'}} Product</span>
                                    </div>
                                </div>
                                <div class="portlet-body form">
                                    @if ($errors->any())
                                          <div class="row">
                                            <div class="alert alert-danger">
                                                <ul>
                                                    @foreach ($errors->all() as $error)
                                                        <li>{{ $error }}</li>
                                                    @endforeach
                                                </ul>
                                            </div>
                                        </div>
                                    @endif
                                    @if(!empty($product) && $id > 0)
                                       <form method="POST" action="{{ url('updateproduct') }}" enctype="multipart/form-data">
                                        <input type="hidden" name="id" value="{{$id}}">
                                    @else
                                        <form method="POST" action="{{ route('products.store') }}" enctype="multipart/form-data">
                                    @endif
                                      {{ csrf_field() }}
                                      <div class="form-group">
                                            <label for="name">Brand Name</label>
                                            <input  type="text" class="form-control" name="brand_name" value="{{ (!empty($product) && $id > 0)?$product->brand_name:old('brand_name') }}">
                                      </div>
                                        <div class="form-group">
                                            <label for="name">Generic Name</label>
                                            <input type="text" class="form-control" name="generic_name" value="{{ (!empty($product) && $id > 0)?$product->generic_name:old('generic_name') }}">
                                        </div>
                                        <div class="form-group">
                                            <label for="name">Category</label>
                                            <select class="form-control" name="category_id">
                                                <option value="">Select Category</option>
                                                @if(!empty($categories))
                                                    @foreach($categories as $cat)
                                                        @if(!empty($product) && $id > 0)
                                                            <option value="{{$cat->id}}" {{($cat->id == $product->category_id)?"selected":""}}>{{$cat->name}}</option>
                                                        @else
                                                            <option value="{{$cat->id}}">{{$cat->name}}</option>
                                                        @endif
                                                    @endforeach
                                                @endif
                                            </select>
                                        </div>
                                            <div class="form-group">
                                                <label for="name">Sell Price</label>
                                                <input type="text" class="form-control" name="sell_price" value="{{ (!empty($product) && $id > 0)?$product->sell_price:old('sell_price') }}">
                                            </div>
                                            <div class="form-group">
                                                <label for="name">Original Price</label>
                                                <input type="text" class="form-control" name="original_price" value="{{ (!empty($product) && $id > 0)?$product->original_price:old('original_price') }}">
                                            </div>
                                            <div class="form-group">
                                                <label for="name">Quantity</label>
                                                <input type="number" min="1" class="form-control" name="quantity" value="{{ (!empty($product) && $id > 0)?$product->quantity:old('quantity') }}">
                                            </div>
                                            <div class="form-group">
                                                <label for="image">Upload Image</label>
                                                <input type="file" id="image" name="image">
                                            </div>


                                      <button type="submit" class="btn btn-success">{{(!empty($product) && $id > 0)?'Edit':'Add'}} Product</button>
                                    </form>
                                </div>
                            </div>


                        </div>

                    </div>
    {{--@if(empty($product))--}}
              <div class="row">

                        <div class="col-md-12">
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject bold uppercase"> Managed Products</span>
                                    </div>

                                </div>
                                <div class="portlet-body">
                                    <div class="table-toolbar">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="btn-group">
                                                    <button id="sample_editable_1_new" class="btn sbold green openform {{(!empty($product) && $id > 0)?'hide':''}}" >Add Product
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="sample_1">
                                        <thead>
                                            <tr>
                                                <th> ID </th>
                                                <th> Brand Name </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($data as $x)
                                            <tr class="odd gradeX">
                                                <td> {{$x -> id}}</td>
                                                <td>{{$x -> brand_name}}</td>
                                                <td>
                                                <a href="{{ url('products/'.$x->id.'/edit') }}" class="btn sbold green" ><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                               @if($x->orderItems->count() == 0)
                                                <button class="btn btn-sm btn-danger" onclick="code_delete('{{$x -> id}}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                               @endif
                                                </td>
                                            </tr>
                                         @endforeach
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>
    {{--@endif--}}
        <input type="hidden" name="code_delete" id="code_delete" value="{{url('deleteproduct')}}">


@endsection
