<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('brand_name')->nullable();
            $table->string('generic_name')->nullable();
            $table->string('category_id');
            $table->double('original_price')->nullable();
            $table->double('sell_price')->nullable();
            $table->integer('quantity')->nullable();
            $table->integer('quantity_left')->nullable();
            $table->string('image')->nullable();
            $table->double('total')->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
