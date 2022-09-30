@extends('layouts.front')

@section('content')
<div class="page-content">
<section class="content-bg">
<div class="row pt-3 m-0 justify-content-center login-page">
    <div class="col-sm-8 col-md-8 col-lg-5">
        <div class="login-case">
            <h3 class="text-center">Welcome</h3>
            <p class="text-center">Create An Account</p>
            <form method="POST" action="{{ route('register') }}">
                {{ csrf_field() }}
                <div class="col-12 ck-input form-group pt-3">
                    <input type="text" id="name" name="name" placeholder="Name" value="{{ old('name') }}" class="form-control" required/>
                    @if ($errors->has('name'))
                    <span class="help-block">
                        <strong>{{ $errors->first('name') }}</strong>
                    </span>
                    @endif
                </div>

                <div class="col-12 ck-input form-group pt-3">
                    <input type="text" id="email" name="email" placeholder="Email" value="{{ old('email') }}" class="form-control" required/>
                    @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                    @endif
                </div>
                <div class="col-12 ck-input form-group pt-3">
                    <input type="password" id="password" name="password" placeholder="Password" class="form-control" required/>
                    @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                    @endif
                </div>
                <div class="col-12 ck-input form-group pt-3">
                    <input id="password-confirm" type="password" class="form-control" placeholder="Confirm Password" name="password_confirmation" required>
                </div>

                <div class="row m-0 mt-4">
                    <div class="col form-group">
                        <button type="submit" class="btn btn-block theme-btn text-uppercase" id="register-submit-btn">Register</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</section>
</div>
@endsection
