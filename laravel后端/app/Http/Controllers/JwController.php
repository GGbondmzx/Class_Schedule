<?php

namespace App\Http\Controllers;

use App\Http\Controllers\BaseController;
use phpseclib3\Crypt\PublicKeyLoader;
use phpseclib3\Math\BigInteger;
use phpseclib3\Crypt\RSA;
use App\Models\user;
use App\Models\timetable;
use App\Models\jwcode;

use Illuminate\Http\Request;

class JwController extends Controller
{


  public function webvpnLogin()
  {
  }

  public function jwlogin($jwUsername, $jwPassword, $userId)
  {
  }
}
