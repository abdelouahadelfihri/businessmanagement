<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('warehouses', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->boolean('is_refrigerated')->default(false);

            $table->unsignedBigInteger('location_owner_id');
            $table->foreign('location_owner_id')
                  ->references('location_id')
                  ->on('locations')
                  ->onDelete('cascade');

            // Index for location_owner_id
            $table->index('location_owner_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('warehouses');
    }
};