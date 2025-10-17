<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
// use App\Http\Controllers\WeChatController;
use EasyWeChat\OfficialAccount\Application;
use App\Http\Controllers\OAWXHander;
use App\Models\wxuser; //公众号关注的用户
use GuzzleHttp\Client;
use App\Models\timetable;
use App\Models\user;

class timeTablePushController extends Controller
{

  const wxconfig = [//微信公众号配置
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




  public static function init_OAwx()
  {
    $app = new Application(self::wxconfig);
    return $app;
  }

  public function serve()
  {
    $app = $this->init_OAwx();
    $server = $app->getServer();
    $response = $server->with(OAWXHander::class)->serve();

    return $response;
  }








  public function getToken()
  {
    $app = self::init_OAwx();
    $accessToken = $app->getAccessToken();
    return response()->json(BaseController::Msg(200, 'success', $accessToken->getToken()));
  }



  //课表推送
  public function Push()
  {

    // $timemap = [
    //   ["8:00", "8:45"], ["8:50", "9:35"], ["9:50", "10:35"], ["10:40", "11:25"], ["11:30", "12:15"], ["13:40", "14:25"], ["14:30", "15:15"], ["15:35", "16:20"], ["16:25", "17:10"], ["19:00", "19:40"], ["19:40", "20:20"], ["20:20", "21:00"]
    // ];

    $startday = strtotime("2023-09-04 16:00:00");



    $startdayM = strtotime('Monday', $startday);
    $nowdayM = strtotime('Next Monday', time());
    $week = self::daysDiff($startdayM, $nowdayM);
    $weekarr = [7, 1, 2, 3, 4, 5, 6];
    $weekarr2 = ['七', '一', '二', '三', '四', '五', '六'];
    $day = $weekarr[date('w', strtotime("+1 day"))];


    $t = timetable::all();




    $alltable = $t; //课表的数据
    // var_dump($alltable);
    $responses = [];
    foreach ($alltable as $onetable) {
      // var_dump($onetable['openid']);
      $unionid = $onetable['openid'];
      $opid = wxuser::where('unionid', $unionid)->first();
      // var_dump($onetable['openid']);
      $realtable = $onetable['table'];
      if (empty($opid)) {
        //no people
      } else {
        $daytable = [];
        $realtable = json_decode($realtable, true);

        foreach ($realtable as  $item) {
          // var_dump($item);
          // break;
          $attend = $item['attend'];
          foreach ($attend as $inday) {
            if ($inday == $week && $item['day'] == $day) {
              $daytable[] = $item;
            }
          }
        }
        $count = count($daytable);
        if ($count !== 0) {

          $app = $this->init_OAwx();
          $api = $app->getClient();
          $accessToken = $app->getAccessToken(); // string
          $response = $api->postJson('/cgi-bin/message/template/send?access_token=' . $accessToken->getToken(), [
            "touser" => $opid->openid,
            "template_id" => "4rRvR7lhV2pw536snKiLKHbRPfzdiLR5ipzjWztCcoY",
            "url" => "http://weixin.qq.com/download",
            "miniprogram" => [
              "appid" => "wx7056e694657fbcd8",
              "pagepath" => "pages/index/index"
            ],
            "data" => [
              "keyword1" => [
                "value" => date("Y年m月d日", strtotime("+1 day")) . '  星期' . $weekarr2[date("w", strtotime("+1 day"))],
                "color" => "#173177"
              ],
              "keyword2" => [
                "value" => "明天共有" . $count . "门课，详情点击小程序进行查看",
                "color" => "#173177"
              ]
            ]

          ]);
          $responses[] = $response;
          // $response->getContent();
          // var_dump(implode(',', $jieci));
        }

        //var_dump($daytable);
        // var_dump($response->getContent());






      }
    }
    foreach ($responses as $response) {
      $content = $response->getContent();
      // var_dump($content);
      // ...
    }
    // var_dump($responses);
    return 'ok';
  }




  public function old()
  {
    $app = $this->init_OAwx();
    // $app = (new WeChatController)->init_wx();
    $api = $app->getClient();
    $accessToken = $app->getAccessToken(); // string

    $res = $api->get('/cgi-bin/user/get', [
      'access_token' => $accessToken->getToken(),
      'next_openid' => ''
    ]);
    foreach ($res['data']['openid'] as $item) {
      // $app = WeChatController::init_wechat();
      // $api = $app->getClient();
      // $accessToken = $app->getAccessToken(); // string
      $res = $api->get('/cgi-bin/user/info', [
        'access_token' => $accessToken->getToken(),
        "openid" => $item
      ]);
      $data = $res->getContent();
      $data = json_decode($data, true);

      $wxu = new wxuser;
      $wxu->openid = $item;
      $wxu->unionid = $data['unionid'];
      $wxu->save();
    }
  }


  function daysDiff($first, $second)

  {

    if ($first > $second) {

      $diff_seconds = $first - $second;
    } else {

      $diff_seconds = $second - $first;
    }

    $time = floor(($diff_seconds) / 86400 / 7);

    return $time;
  }




  public function PushTwo()
  {

    $timemap = [
      ["8:00", "8:45"], ["8:50", "9:35"], ["9:50", "10:35"], ["10:40", "11:25"], ["11:30", "12:15"], ["13:40", "14:25"], ["14:30", "15:15"], ["15:35", "16:20"], ["16:25", "17:10"], ["19:00", "19:40"], ["19:40", "20:20"], ["20:20", "21:00"]
    ];

    $startday = strtotime("2023-02-13 16:00:00");



    $startdayM = strtotime('Monday', $startday);
    $nowdayM = strtotime('Next Monday', time());
    $week = self::daysDiff($startdayM, $nowdayM);
    $weekarr = [7, 1, 2, 3, 4, 5, 6];
    $weekarr2 = ['七', '一', '二', '三', '四', '五', '六'];
    $day = $weekarr[date('w', strtotime("+1 day"))];


    $t = timetable::all();

    $alltable = $t; //课表的数据
    // var_dump($alltable);
    $responses = [];
    foreach ($alltable as $onetable) {
      // var_dump($onetable['openid']);
      $unionid = $onetable['openid'];
      $opid = wxuser::where('unionid', $unionid)->first();
      // var_dump($onetable['openid']);
      $realtable = $onetable['table'];
      if (empty($opid)) {
        //no people
      } else {
        $daytable = [];
        $realtable = json_decode($realtable, true);

        foreach ($realtable as  $item) {
          // var_dump($item);
          // break;
          $attend = $item['attend'];
          foreach ($attend as $inday) {
            if ($inday == $week && $item['day'] == $day) {
              $daytable[] = $item;
            }
          }
        }
        $count = count($daytable);
        if ($count !== 0) {
          $jieci = [];
          $kcarr = [];
          foreach ($daytable as $kb) {
            // var_dump($daytable);

            // var_dump($kb);
            if ($kb['nums'] == $kb['enum']) {
              $jieci[] = '第' . $kb['enum'];
            } else {
              $jieci[] = implode('~', [$kb['nums'], $kb['enum']]);
            }
            $kcarr[] = implode("\r\n", [$kb['name'], '@' . $timemap[(int)$kb['nums'] - 1][0] . '~' . $timemap[(int)$kb['enum'] - 1][1] . ' ' . '@' . $kb['room']]);
          }
          // var_dump($jieci);
          $jieciart = implode(',', $jieci);
          // var_dump($opid[0]->openid);


          $kcbarr = implode("\r\n\r\n", $kcarr);
          // var_dump($kcarr);
          // var_dump(implode("\r\n",$kcarr));
          // $opid=user::where('unionid','ohpYR569wUUNhzdAl_FbVZbmEpBE')->first();
          $app = $this->init_OAwx();
          $api = $app->getClient();
          $accessToken = $app->getAccessToken(); // string
          $response = $api->postJson('/cgi-bin/message/template/send?access_token=' . $accessToken->getToken(), [
            "touser" => $opid->openid,
            "template_id" => "GdhKpVelZ8mR9sc4rMYRKgmrjclB7kCbA9cjayTCNa8",
            "url" => "http://weixin.qq.com/download",
            "miniprogram" => [
              "appid" => "wx7056e694657fbcd8",
              "pagepath" => "pages/index/index"
            ],
            "data" => [
              "first" => [
                "value" => "您明天共有" . $count . "门课，请注意上课时间~\r\n\r\n" . $kcbarr,
                "color" => "#173177"
              ],
              "keyword1" => [
                "value" => date("Y年m月d日", strtotime("+1 day")) . '  星期' . $weekarr2[date("w", strtotime("+1 day"))],
                "color" => "#173177"
              ],
              "keyword2" => [
                "value" => $jieciart,
                "color" => "#173177"
              ],
              "remark" => [
                "value" => "点击进入小程序可查看全部课表，个人中心可开启/关闭课表推送功能。课表如果不准确，请及时手动更新。\r\n\r\n",
                "color" => "#173177"
              ]
            ]

          ]);
          $responses[] = $response;
          // $response->getContent();
          // var_dump(implode(',', $jieci));
        }

        //var_dump($daytable);
        // var_dump($response->getContent());






      }
    }
    foreach ($responses as $response) {
      $content = $response->getContent();
      // var_dump($content);
      // ...
    }
    // var_dump($responses);
    return 'ok';
  }
}
