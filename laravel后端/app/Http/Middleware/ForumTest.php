<?php

namespace App\Http\Middleware;
use App\Http\Controllers\WeChateController;
use Closure;
use Illuminate\Http\Request;
use App\Models\user;

class ForumTest
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
        $content=request('content');
        //$app=WeChateController::

        
        return $next($request);
    }
}
