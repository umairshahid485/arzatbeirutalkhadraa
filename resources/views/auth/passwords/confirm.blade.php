@extends('layouts.front')

@section('content')
<div class="page-content">
<section class="content-bg">
<div class="row pt-3 m-0 justify-content-center login-page">
    <div class="col-sm-8 col-md-8 col-lg-5">
        <div class="login-case">
            <h3 class="text-center">{{ __('Confirm Password') }}</h3>
            <p class="text-center">{{ __('Please confirm your password before continuing.') }}</p>
            <form method="POST" action="{{ route('password.update') }}">
                @csrf

                <input type="hidden" name="token" value="{{ $token }}">

                <div class="col-12 ck-input form-group pt-3">
                    <input type="text" id="email" name="email" placeholder="Email" value="{{ old('email') }}" class="form-control" required/>
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="col-12 ck-input form-group pt-3">
                    <input type="password" id="password" name="password" placeholder="Password" class="form-control" required/>
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
                <div class="col-12 ck-input form-group pt-3">
                    <input id="password-confirm" type="password" class="form-control" placeholder="Confirm Password" name="password_confirmation" required>
                </div>

                <div class="row m-0 mt-4">
                    <div class="col form-group">
                        <button type="submit" class="btn btn-block theme-btn text-uppercase" id="register-submit-btn">{{ __('Confirm Password') }}</button>
                        @if (Route::has('password.request'))
                            <a class="btn btn-block theme-btn text-uppercase pt3" href="{{ route('password.request') }}">
                                {{ __('Forgot Your Password?') }}
                            </a>
                        @endif
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</section>
</div>
@endsection
