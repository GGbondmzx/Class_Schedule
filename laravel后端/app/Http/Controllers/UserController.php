<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\JwController;
use App\Http\Controllers\WeChatController;
use App\Models\officedata;
use App\Models\allclasses;
use App\Models\timetable;
use GuzzleHttp\Client;
use App\Models\jwcode;
use App\Models\user;
use App\Models\logerror;
use App\Models\forumtype;
use App\Models\forum;
use App\Models\majia;


class UserController extends Controller
{
  public function __construct()
  {
    $this->middleware('userToken', ['except' => []]);
  }



  public function editTable()
  {
    $token = request('token');
    $table = request('table');
    $id = Crypt::decrypt($token);
    $result = explode(',', $id);
    $user = user::find($result[0]);
    $openid = $user->unionid;
    $tb = timetable::updateOrCreate(['openid' => $openid], [
      'table' => $table
    ]); //改进
    return response()->json(BaseController::Msg(200, 'success', '导入成功'));
  }

  public function ImportByClass()
  {


    $bh_id = request('bh_id');
    $school_id = request('school_id');


    $token = request('token');
    $table = officedata::where("bh", $bh_id)->first()->table;

    $id = Crypt::decrypt($token);
    $result = explode(',', $id);
    $user = user::find($result[0]);
    $openid = $user->unionid;
    $user->school_id = $school_id;
    $user->certification = 1;
    $user->save();
    $tb = timetable::updateOrCreate(['openid' => $openid], [
      'table' => $table
    ]); //改进
    return response()->json(BaseController::Msg(200, 'success', '导入成功'));
  }


  public function import(Request $request)
  {
    $jwu = request('username');
    $jwp = request('password');
    $token = request('token');
    $school_id = request('school_id');
    $id = Crypt::decrypt($token);
    $result = explode(',', $id);
    if ((int)$school_id == 1) {

      // $table = self::getTableF($result[0], $jwu, $jwp);
      $table = self::getTableF2($jwu, $jwp);//这里为课表数据配置位置，底下同理
      // $table = file_get_contents('http://10X.XX.XXX.102/index.php?id=' . $result[0] . '&username=' . $jwu . '&password=' . $jwp);
      $table = json_decode($table, true);
      if (is_array($table) == false) {
        return response()->json(BaseController::Msg(205, 'fail', '请检查账户密码是否正确'));
      }
      if (count($table) != 0) {
        $jwuser = jwcode::where(['user_id' => $result[0]])->get();
        if (count($jwuser) == 0) {
          $jw = new jwcode;
          $jw->user_id = $result[0];
          $jw->user = $jwu;
          $jw->password = Crypt::encrypt($jwp);
          $jw->save();
        } else {
          $ojw = jwcode::where('user_id', $result[0])->first();
          // var_dump($ojw);
          $ojw->user = $jwu;
          $ojw->password = Crypt::encrypt($jwp);
          $ojw->save();
        }
        $user = user::find($result[0]);
        $user->certification = 1;
        $user->school_id = 1;
        $user->save();
        $openid = $user->unionid;
        $tb = timetable::updateOrCreate(['openid' => $openid], [
          'table' => json_encode($table)
        ]); //改进
        return response()->json(BaseController::Msg(200, 'success', '导入成功'));
      }
      if (count($table) == 0) {
        return response()->json(BaseController::Msg(205, 'fail', '请检查账户密码是否正确'));
      }
    }
    if ((int)$school_id == 2) {
      $vccode = request('vccode');
      $table = file_get_contents('http://gxy.wisdomnet.cn/index.php?id=' . $result[0] . '&username=' . $jwu . '&password=' . $jwp . '&vccode=' . $vccode);
      $table = json_decode($table, true);
      if ($table == null) {
        return response()->json(BaseController::Msg(205, 'fail', '请检查账户密码是否正确'));
      }
      if (count($table) != 0) {
        $jwuser = jwcode::where(['user_id' => $result[0]])->get();
        if (count($jwuser) == 0) {
          $jw = new jwcode;
          $jw->user_id = $result[0];
          $jw->user = $jwu;
          $jw->password = Crypt::encrypt($jwp);
          $jw->save();
        } else {
          $ojw = jwcode::where('user_id', $result[0])->first();
          // var_dump($ojw);
          $ojw->user = $jwu;
          $ojw->password = Crypt::encrypt($jwp);
          $ojw->save();
        }
        $user = user::find($result[0]);
        $user->certification = 1;
        $user->school_id = 2;
        $user->save();
        $openid = $user->unionid;
        $tb = timetable::updateOrCreate(['openid' => $openid], [
          'table' => json_encode($table)
        ]);
        return response()->json(BaseController::Msg(200, 'success', '导入成功'));
      }
      if (count($table) == 0) {
        return response()->json(BaseController::Msg(205, 'fail', '请检查账户密码是否正确'));
      }
    }
    if ((int)$school_id == 3) {
      $table = file_get_contents('http://jsyy.apiicu.com/index.php?id=' . $result[0] . '&username=' . $jwu . '&password=' . $jwp);
      $table = json_decode($table, true);
      if (count($table) != 0) {
        $jwuser = jwcode::where(['user_id' => $result[0]])->get();
        if (count($jwuser) == 0) {
          $jw = new jwcode;
          $jw->user_id = $result[0];
          $jw->user = $jwu;
          $jw->password = Crypt::encrypt($jwp);
          $jw->save();
        } else {
          $ojw = jwcode::where('user_id', $result[0])->first();
          $ojw->user = $jwu;
          $ojw->password = Crypt::encrypt($jwp);
          $ojw->save();
        }

        $user = user::find($result[0]);
        $user->certification = 1;
        $user->school_id = 3;
        $user->save();
        $openid = $user->unionid;
        $tb = timetable::updateOrCreate(['openid' => $openid], [
          'table' => json_encode($table)
        ]);
        return response()->json(BaseController::Msg(200, 'success', '导入成功'));
      }
      if (count($table) == 0) {
        return response()->json(BaseController::Msg(205, 'fail', '请检查账户密码是否正确'));
      }
    }
  }



  public function ImportByXH()
  {
    $school_id = request('school_id');
    $xh = request('xh');
    $token = request('token');
    $id = Crypt::decrypt($token);
    $result = explode(',', $id);
    $uid = $result[0];
    $user = user::find($uid);
    $table = allclasses::where('xh', $xh)->get();
    if (count($table) == 0) {
      return response()->json(BaseController::Msg(205, 'fail', '请检查账户是否正确'));
    }
    $utable = allclasses::where('xh', $xh)->first()->table;
    $user->certification = 1;
    $user->school_id = $school_id;
    $user->save();
    $openid = $user->unionid;
    $tb = timetable::updateOrCreate(['openid' => $openid], [
      'table' => $utable
    ]);
    return response()->json(BaseController::Msg(200, 'success', '导入成功'));
  }



  public  function getMillisecond()
  {
    list($msec, $sec) = explode(' ', microtime());
    $msectime =  (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
    return $msectimes = substr($msectime, 0, 13);
  }


  public function getTable()
  {
    $token = request('token');
    $result = Crypt::decrypt($token);
    $id = explode(',', $result)[0];
    $user = user::find($id);
    $unionid = $user->unionid;
    $table = timetable::where('openid', $unionid)->get();
    if (count($table) == 0) {
      return response()->json(BaseController::Msg(201, 'fail', '未导入数据！'));
    } else {
      return response()->json(BaseController::Msg(200, 'success', $table[0]->table));
    }
  }

  public function  getVccode()
  {
    $token = request('token');
    $result = Crypt::decrypt($token);
    $id = explode(',', $result)[0];
    $code = file_get_contents('http://gxy.wisdomnet.cn/getvccode.php?id=' . $id);
    return response()->json(BaseController::Msg(200, 'success', $code));
  }

  public function logerror()
  {
    $token = request('token');
    $result = Crypt::decrypt($token);
    $id = explode(',', $result)[0];
    $errors = request('error');
    $logerror = new logerror;
    $logerror->user_id = $id;
    $logerror->logs = $errors;
    $logerror->save();
    return response()->json(BaseController::Msg(200, 'success', ''));
  }

  public function checkPhone()
  {
    $token = request('token');
    $result = Crypt::decrypt($token);
    $id = explode(',', $result)[0];
    $sb = user::find($id);
    if ($sb->phone == null) {
      return response()->json(BaseController::Msg(201, 'fail', 'fuck'));
    } else {
      return response()->json(BaseController::Msg(200, 'success', 'yes'));
    }
  }
  public function getPhone()
  {

    $token = request('token');
    $code = request('code');
    $result = Crypt::decrypt($token);
    $id = explode(',', $result)[0];
    $app = WeChatController::init_wx();
    $accessToken = $app->getAccessToken();
    $api = $app->getClient();
    $response = $api->postJson('/wxa/business/getuserphonenumber?access_token=' . $accessToken->getToken(), [
      "code" => $code
    ]);
    $c = $response->getContent();
    $ca = json_decode($c, true);
    // var_dump($ca);
    if ($ca['phone_info']['phoneNumber'] != null) {
      // $uu = user::find($id);
      // $uu->phone = $ca['phone_info']['phoneNumber'];
      // $uu->save();
      return response()->json(BaseController::Msg(200, 'success', $ca['phone_info']['phoneNumber']));
    } else {
      return response()->json(BaseController::Msg(201, 'fail', 'no'));
    }
  }

  // session()->put('key2','value2');

  // echo session->get('key2');
  public function getTableF($id, $username, $password)
  {
    // $id = request('id');
    // $username = request('username');
    // $password = request('password');
   
    $kb = json_encode(self::uniqueList2($kbdata), JSON_UNESCAPED_UNICODE);
    // $kb = json_encode(self::uniqueList2($arraydata), JSON_UNESCAPED_UNICODE);
    return $kb;
  }





 




  
}
