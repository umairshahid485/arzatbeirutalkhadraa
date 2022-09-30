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
        <div class="row">
                        <div class="col-md-12 ">
                            <!-- BEGIN SAMPLE FORM PORTLET-->
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption font-dark">
                                        <i class="fa fa-pencil"></i>
                                        <span class="caption-subject bold uppercase"> Update Profile</span>
                                    </div>
                                </div>
              <div class="portlet-body form">
                  <form method="POST" action="{{ url('updateuser') }}" enctype="multipart/form-data">
              {{ csrf_field() }}
              <input type="hidden" name="uid" value="{{$data->id}}">
              <div class="form-group">
              <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                  <label for="name">Name</label>
                  <input id="name" type="text" class="form-control" name="name" value="{{$data->name}}" required autofocus>

                                @if ($errors->has('name'))
                                    <span>
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
               
              </div>

              <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                  <label for="email">Email</label>
                  <input id="email" type="email" class="form-control" name="email" value="{{ $data->email }}" required autofocus>

                                @if ($errors->has('email'))
                                    <span>
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
               
              </div>


              <div class="form-group">
                    <label for="avatar">Upload Avatar</label>
                    <input type="file" id="avatar" name="avatar" accept="image/*">
              </div>
              <?php
                if($data->photo != ""){
                      $img = "uploads/avatar/".$data->photo;
              ?>
              <div class="form-group">
                <img alt="" class="img-circle" src="{{asset($img)}}" width="100px" height="100px" />
              </div>  
              <?php        
                }
              ?>
              

              </div>
              <button type="submit" class="btn btn-success">Update</button>
            </form>
                                </div>
                            </div>


                        </div>

                    </div>

@endsection    