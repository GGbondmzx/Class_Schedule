<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JwController;
use App\Http\Controllers\WeChatController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\timeTablePushController;
use App\Http\Controllers\DiffSchoolController;
use App\Http\Controllers\AdminController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// 健康检查接口，便于前后端连通性验证
Route::get('/health', function () {
  return response()->json(['status' => 'ok']);
});

// 数据库健康检查接口，尝试查询admin表记录数，异常则返回失败
Route::get('/health/db', function () {
  try {
    $count = \Illuminate\Support\Facades\DB::table('admin')->count();
    return response()->json(['db_status' => 'ok', 'admin_rows' => $count]);
  } catch (\Throwable $e) {
    return response()->json(['db_status' => 'fail', 'error' => $e->getMessage()], 500);
  }
});

// 一次性开发接口：将admin(id=0)密码重置为明文
Route::post('/admin/dev/resetPasswordPlain', function () {
  try {
    $pwd = request('password');
    if (!$pwd) {
      return response()->json(['code' => 400, 'message' => 'missing password']);
    }
    \Illuminate\Support\Facades\DB::table('admin')->where('id', 0)->update(['password' => $pwd]);
    return response()->json(['code' => 200, 'message' => 'ok']);
  } catch (\Throwable $e) {
    return response()->json(['code' => 500, 'message' => $e->getMessage()], 500);
  }
});

//getsetting

// Route::get('/myapp', function () {

//   return '这个是路由';
// });
Route::get('/PushTimeTable', [timeTablePushController::class, 'Push']);
Route::any('/OAserve', [timeTablePushController::class, 'serve']);


Route::any('/getAllUser', [timeTablePushController::class, 'getAllUser']);
// Route::get('/Getold', [timeTablePushController::class, 'old']);
Route::any('/getUnC', [timeTablePushController::class, 'getUnC']); //getAllUser
// Route::get('/test',[JwController::class,'jwlogin']);
Route::post('/login', [WeChatController::class, 'login']);
Route::post('/getPhone', [UserController::class, 'getPhone']);
Route::post('/checkPhone', [UserController::class, 'checkPhone']); //getPhone
Route::post('/checkToken', [WeChatController::class, 'checkToken']); //checkPhone
Route::post('/import', [UserController::class, 'import']);
Route::post('/getTable', [UserController::class, 'getTable']);
Route::post('/getAllPush', [timeTablePushController::class, 'getPush']); //getUnC
Route::post('/getSchoolId', [DiffSchoolController::class, 'getSchoolId']);
Route::post('/getSwpierList', [DiffSchoolController::class, 'getSwpierList']); //getInfoList
Route::post('/getInfoList', [DiffSchoolController::class, 'getInfoList']); //getTimeMap
Route::post('/getTimeMap', [DiffSchoolController::class, 'getTimeMap']); //getStartDay
Route::post('/getStartDay', [DiffSchoolController::class, 'getStartDay']); //openPush
Route::post('/openPush', [DiffSchoolController::class, 'isPush']); // getPush


Route::post('/getClassList', [DiffSchoolController::class, 'getClassList']); // getPush


Route::post('/init', [DiffSchoolController::class, 'init']); //jwlogin
Route::post('/getPush', [DiffSchoolController::class, 'getPush']); //jwlogin
Route::get('/webvpnLogin', [JwController::class, 'webvpnLogin']); //getVccode

Route::post('/getVccode', [UserController::class, 'getVccode']); //getErcode
Route::post('/getErcode', [DiffSchoolController::class, 'getErcode']); //logerror
Route::post('/logerror', [UserController::class, 'logerror']); //getId

Route::get('/getUserId', [DiffSchoolController::class, 'getUserId']);


Route::post('/ImportByClass', [UserController::class, 'ImportByClass']);
//forum apis 
Route::post('/getForumType', [UserController::class, 'getForumType']); //getMaJia
Route::post('/getMaJia', [UserController::class, 'getMaJia']); //PostForum
Route::post('/PostForum', [UserController::class, 'PostForum']); //saveUserInfo
Route::post('/saveUserInfo', [UserController::class, 'saveUserInfo']); //getForum


Route::post('/getForum', [UserController::class, 'getForum']); //getInfo
Route::post('/getInfo', [UserController::class, 'getInfo']); //getpassword
Route::any('/getpassword', [WeChatController::class, 'getpassword']);



Route::post('/getTableF', [UserController::class, 'getTableF']);



//admin api
Route::post('/admin/login', [AdminController::class, 'login']);

//getSchool
Route::post('/admin/getSchool', [AdminController::class, 'getSchool']);
//changeSetting
Route::post('/admin/changeSetting', [AdminController::class, 'changeSetting']);
Route::post('/admin/getsetting', [AdminController::class, 'getsetting']);
Route::post('/admin/getalllist', [AdminController::class, 'getalllist']);
Route::post('/admin/addlist', [AdminController::class, 'addlist']);
Route::post('/admin/changelist', [AdminController::class, 'changelist']);
Route::post('/admin/dellist', [AdminController::class, 'dellist']);


Route::post('/admin/getallinfo', [AdminController::class, 'getallinfo']);
Route::post('/admin/addnews', [AdminController::class, 'addnews']);
Route::post('/admin/changenews', [AdminController::class, 'changenews']);
Route::post('/admin/delnews', [AdminController::class, 'delnews']);

//checkToken
Route::post('/admin/checkToken', [AdminController::class, 'checkToken']);


//test
Route::any('/checkTable1', [UserController::class, 'dotest1']);


Route::any('/getToken', [timeTablePushController::class, 'getToken']);

//ImportByXH
Route::post('/ImportByXH', [UserController::class, 'ImportByXH']); //getInfo
//editTable
Route::post('/editTable', [UserController::class, 'editTable']); //getInfo