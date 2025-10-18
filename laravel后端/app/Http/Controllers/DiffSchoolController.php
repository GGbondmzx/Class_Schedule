<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Schema;
use Illuminate\Http\Request;
use App\Models\user;
use App\Models\info;
use App\Models\timemap;
use App\Models\swiperlist;
use App\Models\school;
use App\Models\college;
use App\Models\major;
use App\Models\banjiclass;
use App\Models\timetable;
use App\Models\ercode;
use App\Models\setting;

class DiffSchoolController extends Controller
{


  public function __construct()
  {
    $this->middleware('userToken', ['except' => ['getSchoolId', 'getInfoList', 'getTimeMap', 'getSwpierList', 'getStartDay', 'getErcode', 'init']]);
  }

  public function getStartDay()
  {
    $school_id = request('school_id');
    $swpier = school::where('id', $school_id)->get();
    return response()->json(BaseController::Msg(200, 'success', $swpier));
  }


  public function init()
  {
    try {
      $school_id = request('school_id');
      $school = Schema::hasTable('school') ? school::where('id', $school_id)->get() : collect([]);
      $info = Schema::hasTable('info') ? info::where('school_id', $school_id)->get() : collect([]);
      $timemap = Schema::hasTable('timemap') ? timemap::where('school_id', $school_id)->get() : collect([]);
      $swiper = Schema::hasTable('swiperlist') ? swiperlist::where('school_id', $school_id)->get() : collect([]);
      $schoollist = Schema::hasTable('school') ? school::all() : collect([]);
      $setting = Schema::hasTable('setting') ? setting::first() : null;
  
      $sr = [];
      $sr['appname'] = $setting ? $setting->appname : '';
      $sr['applogo'] = $setting ? $setting->applogo : '';
      $sr['wxname'] = $setting ? $setting->wxname : '';
      $sr['wxlogo'] = $setting ? $setting->wxlogo : '';
  
      $result = [
        "startday" => $school,
        "info" => $info,
        "timemap" => $timemap,
        "swiper" => $swiper,
        "schoollist" => $schoollist,
        "setting" => $sr
      ];
      return response()->json(BaseController::Msg(200, 'success', $result));
    } catch (\Throwable $e) {
      return response()->json(BaseController::Msg(500, 'server_error', [
        'error' => $e->getMessage(),
      ]));
    }
  }




  public function getClassList()
  {
    $school_id = request('school_id');
    $ac = college::where("school_id", $school_id)->get();
    $result = [];
    foreach ($ac as $key => $value) {
      $item = [];
      $item['text'] = $value['name'];
      $item['value'] = '0-' . $value['id'];

      $am = major::where("college_id", $value['id'])->get();
      foreach ($am as $key2 => $value2) {
        $item2 = [];
        $item2['text'] = $value2->name;
        $item2['value'] = '1-' . $value2->id;

        $lb = banjiclass::where('major_id', $value2['id'])->get();
        foreach ($lb as  $key3 => $value3) {
          $item3 = [];
          $item3['text'] = $value3->name;
          $item3['value'] = $value3->bh_id;

          $item2['children'][] = $item3;
        }
        $item['children'][] = $item2;
      }
      $result[] = $item;
    }
    return response()->json(BaseController::Msg(200, 'success', $result));
  }



  public function getSchoolId()
  {
    $token = request('token');
    $id = self::getId($token);
    $sb = user::find($id);
    if (empty($sb->school_id)) {
      return response()->json(BaseController::Msg(200, 'success', null));
    } else {
      return response()->json(BaseController::Msg(200, 'success', $sb->school_id));
    }
  }
  public function getInfoList()
  {
    $school_id = request('school_id');
    $swpier = info::where('school_id', $school_id)->get();
    return response()->json(BaseController::Msg(200, 'success', $swpier));
  }

  public function getTimeMap()
  {
    $school_id = request('school_id');
    $swpier = timemap::where('school_id', $school_id)->get();
    return response()->json(BaseController::Msg(200, 'success', $swpier));
  }
  public function getSwpierList()
  {
    $school_id = request('school_id');
    $swpier = swiperlist::where('school_id', $school_id)->get();
    return response()->json(BaseController::Msg(200, 'success', $swpier));
  }


  public  function getMillisecond()
  {

    list($msec, $sec) = explode(' ', microtime());

    $msectime =  (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);

    return $msectimes = substr($msectime, 0, 13);
  }


  public function getId($token)
  {
    $id = Crypt::decrypt($token);
    $result = explode(',', $id);
    return $result[0];
  }

  public function isPush()
  {
    $token = request('token');
    $id = self::getId($token);
    $sb = user::find($id);
    $openid = $sb->unionid;
    $timetable = timetable::where('openid', $openid)->get();
    if (count($timetable) > 0) {
      if ($timetable[0]->ispush == 1) {
        $timetable[0]->ispush = 0;
        $timetable[0]->save();
        return response()->json(BaseController::Msg(200, 'success', '关闭订阅成功'));
      } else {
        $timetable[0]->ispush = 1;
        $timetable[0]->save();
        return response()->json(BaseController::Msg(200, 'success', '开启订阅成功'));
      }
    } else {
      return response()->json(BaseController::Msg(201, 'success', '还未导入课表！'));
    }
  }



  public function getPush()
  {
    $token = request('token');
    $id = self::getId($token);
    $sb = user::find($id);
    $openid = $sb->unionid;
    $timetable = timetable::where('openid', $openid)->get();
    if (count($timetable) > 0) {
      if ($timetable[0]->ispush == 1) {
        return response()->json(BaseController::Msg(200, 'success', '已经开启订阅'));
      } else {
        return response()->json(BaseController::Msg(200, 'success', '已经关闭订阅'));
      }
    } else {
      return response()->json(BaseController::Msg(200, 'success', '还未导入课表！'));
    }
  }


  // public function getErcode()
  // {
  //   $school_id = request('school_id');
  //   $ercode = ercode::where('school_id', $school_id)->first();
  //   return response()->json(BaseController::Msg(200, 'success', $ercode));
  // }
  public function getUserId()
  {
    $token = request('token');
    $id = Crypt::decrypt($token);
    $result = explode(',', $id);
    return $result[0];
  }

  //
}
