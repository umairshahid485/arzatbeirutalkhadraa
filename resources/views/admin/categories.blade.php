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
    <div class="row formtoggle {{((!empty($category) && $id > 0) || $errors->any())?'':'hide'}}">
                        <div class="col-md-12 ">
                            <!-- BEGIN SAMPLE FORM PORTLET-->
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="icon-pencil"></i>
                                        <span class="caption-subject bold uppercase"> {{(!empty($category) && $id > 0)?'Edit':'Add'}} Category</span>
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
                                    @if(!empty($category) && $id > 0)
                                       <form method="POST" action="{{ url('updatecategory') }}" enctype="multipart/form-data">
                                        <input type="hidden" name="id" value="{{$id}}">
                                    @else
                                        <form method="POST" action="{{ route('categories.store') }}" enctype="multipart/form-data">
                                    @endif
                                      {{ csrf_field() }}
                                      <div class="form-group">
                                      <div class="form-group">
                                            <label for="name">Name</label>
                                            <input class="form-control" name="name" value="{{ (!empty($category) && $id > 0)?$category->name:old('name') }}">
                                      </div>

                                      <div class="form-group{{ $errors->has('description') ? ' has-error' : '' }}">
                                          <label for="description">Description</label>
                                          <textarea class="form-control" name="description">{{(!empty($category) && $id > 0)?$category->description:old('description') }}</textarea>
                                      </div>

                                      <div class="form-group">
                                          <label for="image">Upload Image</label>
                                          <input type="file" id="image" name="image">
                                      </div>

                                      </div>
                                      <button type="submit" class="btn btn-success">{{(!empty($category) && $id > 0)?'Edit':'Add'}} Category</button>
                                    </form>
                                </div>
                            </div>


                        </div>

                    </div>
    {{--@if(empty($category))--}}
              <div class="row">

                        <div class="col-md-12">
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject bold uppercase"> Managed Categories</span>
                                    </div>

                                </div>
                                <div class="portlet-body">
                                    <div class="table-toolbar">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="btn-group">
                                                    <button id="sample_editable_1_new" class="btn sbold green openform {{(!empty($category) && $id > 0)?'hide':''}}" >Add Category
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
                                                <th> Name </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($data as $x)
                                            <tr class="odd gradeX">
                                                <td> {{$x -> id}}</td>
                                                <td>{{$x -> name}}</td>
                                                <td>
                                                <a href="{{ url('categories/'.$x->id.'/edit') }}" class="btn sbold green" ><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    @if($x->products->count() == 0)
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
        <input type="hidden" name="code_delete" id="code_delete" value="{{url('deletecategory')}}">


@endsection
