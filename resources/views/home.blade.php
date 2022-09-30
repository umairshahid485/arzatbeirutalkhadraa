@extends('layouts.main')

@section('content')
    <div class="row no-gutters py-3 content-bg category-list category-list-view home-category-section">
        @if(!empty($categories))
            @foreach($categories as $category)
                <a href="{{ URL::to('/') . '/category/' . $category->slug }}" class="show-category-product" style="text-decoration: none;">
                    <div class="text-truncate cate-title category_position_top" style="display: none;">
                        {{$category->name}}
                    </div>
                    <div class="category-showcase">
                        <div class="info">
                            <div class="title text-truncate cate-title category_position_center" style="display: none;">
                                {{$category->name}}
                            </div>
                        </div>
                        <img src="{{ asset('uploads/category/'.$category->image) }}" alt="{{$category->name}}" class="case-img">
                    </div>
                    <div class="text-truncate cate-title category_position_bottom" style="display: none;">
                        {{$category->name}}
                    </div>
                </a>
            @endforeach
        @endif

    </div>
@endsection
