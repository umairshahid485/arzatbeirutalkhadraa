<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\Sluggable;

class Product extends Model
{
    use SoftDeletes;
    use Sluggable;

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'brand_name'
            ]
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function orderItems(){
        return $this->hasMany(OrderItem::class);
    }
}
