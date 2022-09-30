@extends('layouts.front')

@section('content')
<div class="page-content">
    <!-- Page Content -->
    <section class="content-bg">
        <div class="row pt-3 m-0 justify-content-center login-page">
            <div class="col-sm-8 col-md-8 col-lg-5">
                <div class="login-case">
                    <h3 class="text-center">Welcome</h3>
                    <p class="text-center">Login to continue</p>
                    <form method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}
                        <div class="col-12 ck-input form-group pt-3">
                            <input id="email" type="email" placeholder="Email Address" class="form-control" name="email" value="{{ old('email') }}" required>
                            @if ($errors->has('email'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="col-12 ck-input form-group">
                            <input id="password" type="password" placeholder="Password" name="password" class="form-control" required>
                            @if ($errors->has('password'))
                                <span class="help-block">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                            @endif
                        </div>
                        <div class="row m-0">
                            <div class="col-6 form-group text-left">
                                <label class="remember-label align-middle">
                                    <input type="checkbox" name="remember" class="theme-checkbox align-middle" {{ old('remember') ? 'checked' : '' }}><span class="align-middle"> Remember Me</span>
                                </label>
                            </div>
                            <div class="col-6 form-group text-right">
                                <a href="{{ route('password.request') }}">Forgot your password</a>
                            </div>
                        </div>
                        <div class="row m-0 mt-4">
                            <div class="col form-group">
                                <button type="submit" class="btnLogin btn btn-block theme-btn text-uppercase">Login</button>
                            </div>
                        </div>
                    </form>

                    <div class="row m-0">
                        <div class="col text-center new-to-ustore">
                            <p> New to store? <a href="/register" class="text-uppercase" style="color:var(--buttonColor);text-decoration:underline;">Create An Account</a> </p>
                        </div>
                    </div>
                </div>

                <div class="row m-0 my-3">
                    <div class="col text-center">
                        <a href="terms" class="login_terms_and_condition" target="_blank" style="color:var(--buttonColor);text-decoration:none;">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--END of Page Content-->
</div>
@endsection
