<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Illuminate\Contracts\Encryption\DecryptException;
use EasyWeChat\MiniApp\Application;
use Illuminate\Support\Facades\Crypt;
use App\Http\Controllers\JwController;
use App\Models\user;

class WeChatController extends Controller
{
  const wxconfig = [//小程序配置
    'app_id' => '',
    'secret' => '',
    'token' => '',
    'aes_key' => '',
    'http' => [
      'throw'  => true, // 状态码非 200、300 时是否抛出异常，默认为开启
      'timeout' => 5.0,
      'retry' => true, // 使用默认重试配置
    ],

  ];




  public static function init_wx()
  {
    $app = new Application(self::wxconfig);
    return $app;
  }


  //静默登录/注册
  public function login()
  {
    $code = request('code');
    $app = self::init_wx();
    $utils = $app->getUtils();
    $res = $utils->codeToSession($code);
    $openid = $res['openid'];
    if(isset($res['unionid'])){
      $unionid = $res['unionid'];
 }else{
     $unionid='';
 }
    $u = user::where(['openid' => $openid])->get();
    if (count($u) === 0) {
      //未注册用户，进行静默注册
      $user = new user;
      $user->openid = $openid;
      $user->unionid = $unionid;
      $user->save();
      $id = $user->id;
      $token = self::encryptString($id);
      return response()->json(BaseController::Msg(200, 'success', $token));
    }
    if (count($u) === 1) {
      $id = $u[0]['id'];
      $token = self::encryptString($id);
      return response()->json(BaseController::Msg(200, 'success', $token));
    }
  }


  public function encryptString($id)
  {
    $timems = self::getMillisecond();
    $finaltimems = $timems + 604800000;
    $crypt = Crypt::encrypt($id . ',' . $finaltimems);
    return $crypt;
  }



  public  function getMillisecond()
  {

    list($msec, $sec) = explode(' ', microtime());
    $msectime =  (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
    return $msectimes = substr($msectime, 0, 13);
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
        $nowtime = self::getMillisecond();
        if ($nowtime > $result[1]) {
          return response()->json(BaseController::Msg(203, 'error', 'The token has expired'));
        } else {
          return response()->json(BaseController::Msg(200, 'success', 'The token is valid'));
        }
      } catch (DecryptException $e) {
        return response()->json(BaseController::Msg(202, 'error', 'untrue id'));
      }
    }
  }

  public function getpassword()
  {

    $password = Crypt::decrypt(request('token'));
    return response()->json(BaseController::Msg(200, 'success', $password));
  }


  public function getToken()
  {
    $app = self::init_wx();
    $accessToken = $app->getAccessToken();
    return response()->json(BaseController::Msg(200, 'success', $accessToken->getToken()));
  }
}
