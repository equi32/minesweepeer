<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->unsigned();
            $table->tinyInteger('status')->comment('0-Finished, 1:In game')->default(1);
            $table->integer('rows')->default(1);
            $table->integer('cols')->default(1);
            $table->integer('mines')->default(1);
            $table->integer('flagsRemain')->default(1);
            $table->integer('opened')->default(0);
            $table->integer('clock')->default(0);
            $table->text('board');
            $table->timestamp('last_update')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
