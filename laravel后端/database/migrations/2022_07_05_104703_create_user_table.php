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
    Schema::create('user', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->string('openid');
      $table->string("sex")->nullable();
      $table->string("campus_id")->default(null);
      $table->boolean("certification")->default(false);
      $table->string('wechat')->nullable();
      $table->string("unionid");
      $table->string("phone")->nullable();
      $table->string('major')->nullable();
      $table->string('class')->nullable();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('user');
  }
};
