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
        Schema::create('forum', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('cotents');
            $table->string("type_id");
            $table->string("post_id");
            $table->text('imgs')->nullable();
            $table->longText('likes_lists')->nullable();
            $table->string('view_count');
            $table->boolean('is_show');
            $table->string('last_comment_id');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('forum');
    }
};
