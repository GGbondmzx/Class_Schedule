<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

class UserToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if ($request->input('token') == null) {
            return response()->json(BaseController::Msg(201, 'error,without token', ''));
        } else {
            $token = request('token');
            try {
                $id = Crypt::decrypt($token);
                $result = explode(',', $id);
                $nowtime = $this->getMillisecond();
                if ($nowtime >= $result[1]) {
                    return response()->json(BaseController::Msg(203, 'error', 'The token has expired'));
                } else {
                    return $next($request);
                }

            } catch (DecryptException $e) {
                return response()->json(BaseController::Msg(202, 'error', 'untrue id'));
            }
        }
    }


    public  function getMillisecond()
    {

        list($msec, $sec) = explode(' ', microtime());

        $msectime = (float) sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);

        return $msectimes = substr($msectime, 0, 13);

    }
}
