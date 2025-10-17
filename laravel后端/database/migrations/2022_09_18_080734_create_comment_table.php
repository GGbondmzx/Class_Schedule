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
        Schema::create('comment', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->longText('likes_list')->nullable();;
            $table->string('last_comment_id');
            $table->text("content");
            $table->string("receiver_id");
            $table->string("forum_id");
            $table->boolean('is_show');
            $table->string('post_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comment');
    }
};
