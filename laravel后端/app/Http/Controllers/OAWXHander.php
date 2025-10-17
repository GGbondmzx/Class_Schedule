<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\wxuser;
use App\Http\Controllers\timeTablePushController;
// use App\Http\Controllers\timeTablePushController;

class OAWXHander extends Controller
{
  public function __invoke($message, \Closure $next)
  {
    if ($message->Event === 'subscribe') {
      // return '$message->FromUserName';
      $openid = $message->FromUserName;
      // $app = timeTablePushController::init_OAwx();


      $t = new timeTablePushController;
      $app = $t->init_OAwx();
      $api = $app->getClient();
      $accessToken = $app->getAccessToken(); // string
      $res = $api->get('/cgi-bin/user/info', [
        'access_token' => $accessToken->getToken(),
        "openid" => $openid
      ]);
      $data = $res->getContent();
      $data = json_decode($data, true);
      // return $data;



      wxuser::updateOrCreate(['openid' => $openid], ['unionid' => $data['unionid']]);
      return  '欢迎关注~~~~柏学于扬';
      // return 'fff';
    }
    if ($message->Event === 'unsubscribe') {
      $openid = $message->FromUserName;
      wxuser::where(['openid' => $openid])->delete();
    }
    return $next($message);
  }
  //
}
