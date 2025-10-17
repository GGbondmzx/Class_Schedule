<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use App\Models\admin;
use App\Models\swiperlist;
use App\Models\school;
use App\Models\setting;
use App\Models\info;

class AdminController extends Controller
{
  //
  public function __construct()
  {
    $this->middleware('AdminToken', ['except' => ['login']]);
  }


  public function getSchool()
  {
    $all = school::all();
    return response()->json(BaseController::Msg(200, 'success', $all));
  }




  public function getsetting()
  {
    $all = setting::all();
    return response()->json(BaseController::Msg(200, 'success', $all));
  }



  public function changeSetting()
  {
    $s = setting::first();
    $s->appname = request('appname');
    $s->applogo = request("applogo");
    $s->api = request('api');
    $s->isapi = request('isapi');
    $s->wxname = request('wxname');
    $s->wxlogo = request('wxlogo');
    $s->save();
    return response()->json(BaseController::Msg(200, 'success', $s));
  }



  public function login()
  {
    $username = request('username');
    $password = request('password');
    $admin = admin::where('username', $username)->first();
    if ($admin == null) {
      return response()->json(BaseController::Msg(205, 'fail', '账户或者密码错误'));
    }
    if ($admin->password === $password && $admin->id == 0) {
      $token = self::encryptString($admin->id);
      return response()->json(BaseController::Msg(200, 'success', $token));
    } else {
      return response()->json(BaseController::Msg(205, 'fail', '账户或者密码错误'));
    }
  }

  public function encryptString($id)
  {
    $timems = self::getMillisecond();
    $finaltimems = $timems + 3600000;
    $crypt = Crypt::encrypt($id . ',' . $finaltimems);
    return $crypt;
  }

  public  function getMillisecond()
  {

    list($msec, $sec) = explode(' ', microtime());
    $msectime =  (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
    return $msectimes = substr($msectime, 0, 13);
  }

  public function getalllist()
  {
    $all = swiperlist::all();
    return response()->json(BaseController::Msg(200, 'success', $all));
    # code...
  }

  public function getallinfo()
  {
    $all = info::all();
    return response()->json(BaseController::Msg(200, 'success', $all));
    # code...
  }


  public function addlist()
  {
    $img = request('img');
    $url = request('url');
    $schoolid = request('schoolid');
    $list = new swiperlist();
    $list->img = $img;
    $list->url = $url;
    $list->school_id = $schoolid;
    $list->save();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }
  public function changelist()
  {
    $listid = request('listid');
    $list = swiperlist::find($listid);
    $img = request('img');
    $url = request('url');
    $schoolid = request('schoolid');
    $list->img = $img;
    $list->url = $url;
    $list->school_id = $schoolid;
    $list->save();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }
  public function dellist()
  {
    $listid = request('id');
    $list = swiperlist::find($listid);
    $list->delete();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }


  public function addnews()
  {
    $title = request('title');
    $url = request('url');
    $schoolid = request('schoolid');
    $time = request('time');

    $info = new info();
    $info->title = $title;
    $info->url = $url;
    $info->school_id = $schoolid;
    $info->time = $time;
    $info->save();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }
  public function changenews()
  {
    $infoid = request('infoid');
    $title = request('title');
    $url = request('url');
    $schoolid = request('schoolid');
    $time = request('time');
    $info = info::find($infoid);
    $info->title = $title;
    $info->url = $url;
    $info->school_id = $schoolid;
    $info->time = $time;
    $info->save();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }
  public function delnews()
  {
    $infoid = request('id');
    $info = info::find($infoid);
    $info->delete();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }


  public function checkToken(Request $request)
  {
    if ($request->input('token') == null) {
      return response()->json(BaseController::Msg(201, 'error,without token', ''));
    } else {
      $token = request('token');
      try {
        $id = Crypt::decrypt($token);
        $result = explode(',', $id);
        $nowtime = $this->getMillisecond();
        if ($nowtime >= $result[1] || $result[0] != 0) {
          return response()->json(BaseController::Msg(203, 'error', 'The token has expired'));
        } else {
          return response()->json(BaseController::Msg(200, 'ok', ''));
        }
      } catch (DecryptException $e) {
        return response()->json(BaseController::Msg(202, 'error', 'untrue id'));
      }
    }
    # code...
  }
}
