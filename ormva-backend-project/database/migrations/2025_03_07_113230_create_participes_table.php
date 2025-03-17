<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('participes', function (Blueprint $table) {
            $table->unsignedBigInteger('formation_id');
            $table->unsignedBigInteger('employe_id');
            $table->foreign('formation_id')->references('id')->on('formations')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('employe_id')->references('id')->on('employes')->onUpdate('cascade')->onDelete('cascade');
            $table->string('note');
            $table->boolean('presence')->default(false);
            $table->primary(['formation_id','employe_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participes');
    }
};
