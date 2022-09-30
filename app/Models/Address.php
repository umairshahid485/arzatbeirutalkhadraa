<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $table = 'addresses';

    protected $fillable = [
        'address_type','user_id','data'
    ];

    protected $casts = [
        'data' => 'array',
    ];

    public function orders(){
        return $this->hasMany(Order::class);
    }
}
