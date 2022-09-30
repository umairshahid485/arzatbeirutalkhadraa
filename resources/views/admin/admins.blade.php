@extends('layouts.default')
@section('content')
    @if ($message = Session::get('success'))
      <div class="alert alert-success alert-block">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{{ $message }}</strong>
      </div>
    @endif

    @if ($message = Session::get('faliure'))
      <div class="alert alert-danger alert-block">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>{{ $message }}</strong>
      </div>
    @endif
    <div class="row formtoggle hide">
                        <div class="col-md-12 ">
                            <!-- BEGIN SAMPLE FORM PORTLET-->
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="icon-user"></i>
                                        <span class="caption-subject bold uppercase"> Add Admin</span>
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
                                    <form method="POST" action="{{ url('createadmin') }}" enctype="multipart/form-data">
                                      {{ csrf_field() }}
                                      <div class="form-group">
                                      <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                          <label for="name">Name</label>
                                          <input id="name" type="text" class="form-control" name="name" value="{{ old('name') }}" required autofocus>
                                      </div>

                                      <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                          <label for="email">Email</label>
                                          <input id="email" type="email" class="form-control" name="email" value="{{ old('email') }}" required autofocus>
                                      </div>

                                      <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                          <label for="password">Password</label>
                                          <input id="password" type="password" class="form-control" name="password" value="{{ old('password') }}" required autofocus>
                                      </div>

                                      <div class="form-group">
                                          <label for="password-confirm">Confirm Password</label>
                                          <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autofocus>

                                      </div>

                                      <div class="form-group hide">
                                          <label for="user_type">Staff Role</label>
                                          <select name="user_type" id="user_type" class="form-control" required>
                                              <option value="1" selected="selected">Admin</option>
                                              <option value="2">Super Admin</option>
                                          </select>

                                      </div>

                                      <div class="form-group">
                                            <label for="avatar">Upload Avatar</label>
                                            <input type="file" id="avatar" name="avatar">
                                      </div>

                                      </div>
                                      <button type="submit" class="btn btn-success">Add Staff</button>
                                    </form>
                                </div>
                            </div>


                        </div>

                    </div>

              <div class="row">

                        <div class="col-md-12">
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="icon-settings font-dark"></i>
                                        <span class="caption-subject bold uppercase"> Managed Staff</span>
                                    </div>

                                </div>
                                <div class="portlet-body">
                                    <div class="table-toolbar">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="btn-group">
                                                    <button id="sample_editable_1_new" class="btn sbold green openform" >Add New
                                                        <i class="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <table class="table table-striped table-bordered table-hover table-checkable order-column" id="sample_1">
                                        <thead>
                                            <tr>
                                                <th> Name   </th>
                                                <th> Email  </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        @foreach($data as $x)
                                            <tr class="odd gradeX">
                                                <td> {{$x -> name}}</td>
                                                 <td>
                                                    {{$x -> email}}
                                                </td>
                                                <td>
                                  <a href="{{url('userprofile/'.$x -> id)}}" class="btn sbold green" ><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    @if($x->orders->count() == 0)
                                  <button class="btn btn-sm btn-danger" onclick="user_delete('{{$x -> id}}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
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

<input type="hidden" name="user_delete" id="user_delete" value="{{url('users/delete')}}">



@endsection
