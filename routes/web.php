<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/unauthorized', function () {
    return view('unauthorized');
});

Route::get('/home', [HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::group(['middleware' => 'App\Http\Middleware\AdminMiddleware'], function() {
    Route::get('/dashboard', [AdminController::class, 'index'])->name('dashboard');

    /*Users's Routes Start*/
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::post('createuser', [UserController::class, 'add']);
    Route::get('users/delete', [UserController::class, 'deleteuser']);
    Route::get('userprofile/{id}', [UserController::class, 'user_profile']);

    /*Admin's Routes Start*/
    Route::get('/admins', [AdminController::class, 'adminView'])->name('admins');
    Route::post('createadmin', [AdminController::class, 'add']);

    Route::resources([
        'products' => ProductController::class,
        'categories' => CategoryController::class,
    ]);

    Route::post('updatecategory', [CategoryController::class, 'update']);
    Route::get('deletecategory', [CategoryController::class, 'destroy']);

    Route::post('updateproduct', [ProductController::class, 'update']);
    Route::get('deleteproduct', [ProductController::class, 'destroy']);

    Route::get('orders', [OrderController::class, 'index'])->name('order.index');
    Route::get('order-detail/{id}', [OrderController::class, 'orderDetail'])->name('order.detail');
});

Route::post('updateuser', [UserController::class, 'update']);
Route::post('changePassword',[UserController::class, 'changePassword'])->name('change.password');

Route::get('/category/{param}', [CategoryController::class, 'show']);

Route::get('checkout', [ProductController::class, 'checkout'])->name('checkout');
Route::get('add-to-cart/{id}', [ProductController::class, 'addToCart'])->name('add.to.cart');
Route::patch('update-cart', [ProductController::class, 'updateCart'])->name('update.cart');
Route::delete('remove-from-cart', [ProductController::class, 'remove'])->name('remove.from.cart');
Route::get('empty-cart', [ProductController::class, 'clearCart'])->name('empty.cart');

Route::get('logout', [LoginController::class, 'logout'])->name('user.logout');

Route::post('disclose-ok', [PaymentController::class, 'discloseOK'])->name('payment.disclose');
Route::get('after-payment', [PaymentController::class, 'afterPaymentRedirection'])->name('payment.redirection');

Route::post('place-order', [CheckoutController::class, 'placeOrder'])->name('place.order');

Route::get('account-info/{type}', [UserController::class, 'accountInfo'])->name('user.account.info');
Route::post('save-address', [UserController::class, 'saveAddress'])->name('user.save.address');

Route::delete('remove-address', [UserController::class, 'removeAddress'])->name('remove.address');
