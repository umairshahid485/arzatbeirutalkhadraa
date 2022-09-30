@extends('layouts.front')

@section('content')
<div class="page-content">
    <!-- Page Content -->
    <section class="content-bg">
    <div class="row pt-3 m-0 justify-content-center login-page">
        <div class="col-sm-8 col-md-6 col-lg-5 mb-3">
            <div class="login-case">
                <h3 class="text-center">Forgot Password?</h3>
                <p class="text-center">Enter your e-mail address below to reset your password.</p>
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif
                @if (session('warning'))
                    <div class="alert alert-warning">
                        {{ session('warning') }}
                    </div>
                @endif
                <form method="POST" id="form_sample_2" class="forgest-form" action="{{ route('password.email') }}">
                    {{ csrf_field() }}
                    <div class="col-12 ck-input form-group pt-3">
                        <input id="email" type="email" placeholder="Email Address" class="form-control" name="email" value="{{ old('email') }}" required>
                        @if ($errors->has('email'))
                            <span class="help-block">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                    </div>
                    <div class="row m-0 mt-4">
                        <div class="col form-group">
                            <button type="submit" class="btn btn-block theme-btn text-uppercase">Reset Password</button>
                        </div>
                    </div>
                </form>

                <div class="row m-0">
                    <div class="col text-center">
                        <p><a href="/login" class="text-uppercase" style="color:var(--buttonColor);text-decoration:underline;">RETURN TO LOGIN</a> </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
    <!--END of Page Content-->
</div>
@endsection
