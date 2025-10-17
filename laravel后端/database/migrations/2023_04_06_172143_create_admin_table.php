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
      $table->string('password')->default('7c3196322feddfd0c74e7c8f88843fc1'); //timetable915
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
