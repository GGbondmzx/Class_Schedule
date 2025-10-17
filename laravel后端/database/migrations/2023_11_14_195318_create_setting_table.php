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
    Schema::create('setting', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->string('appname');
      $table->string('applogo');
      $table->string('api');
      $table->string('wxname');
      $table->string('wxlogon');
      $table->boolean('isapi');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('setting');
  }
};
