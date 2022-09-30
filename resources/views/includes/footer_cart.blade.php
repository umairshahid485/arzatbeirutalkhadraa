<input type="hidden" id="updatecart" value="{{ route('update.cart') }}">
<input type="hidden" id="removefromcart" value="{{ route('remove.from.cart') }}">
</div>

<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="{{asset('assets/js/jquery-3.4.1.min.js')}}"></script>
<script src="{{asset('assets/js/popper.min.js')}}" type="text/javascript"></script>
<script src="{{asset('assets/js/bootstrap4.0.0.min.js')}}" type="text/javascript"></script>
<!-- Bootstrap toster file -->
<script src="{{asset('assets/js/toastr.min.js')}}" type="text/javascript"></script>
<!-- Validation PLugin -->
<script src="{{asset('assets/js/jquery.validate.min.js')}}"></script>
<script src="{{asset('assets/js/model.js')}}"></script>
<script src="{{asset('assets/js/include-html.min.js')}}"></script>
<script src="{{asset('assets/js/theme.js')}}"></script>
{{--<script src="{{asset('assets/js/intlTelInput.js')}}"></script>--}}
<script class="{{asset('assets/js/utils.js')}}"></script>
<script src="{{asset('assets/js/bootbox5.4.min.js')}}"></script>
{{--<script src="{{asset('assets/js/fileinput.js')}}"></script>
<script src="{{asset('assets/js/region.js')}}"></script>--}}
<script src="{{asset('assets/js/newAddress.js')}}"></script>
{{--<script src="{{asset('assets/js/countryCodeManager.js')}}"></script>--}}
<script src="{{asset('assets/js/custom.js')}}"></script>

</body>
</html>
