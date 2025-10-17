<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public static function Msg($code, $message = '', $data = array())
    {

        $result = [
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ];
        return $result;
    }
    //
}
