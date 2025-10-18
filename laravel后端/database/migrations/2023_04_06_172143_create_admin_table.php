<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('admin', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->string('username')->default('chengzhi');
      $table->string('password')->default('timetable915'); // 明文默认密码
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('admin');
  }
};
