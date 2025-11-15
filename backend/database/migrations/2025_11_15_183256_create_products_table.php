<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name');
            $table->string('code');
            $table->string('bar_code');

            $table->unsignedBigInteger('category');
            $table->unsignedBigInteger('unit');

            $table->integer('reorder_level')->default(0);
            $table->boolean('is_active')->default(true);

            // Foreign keys
            $table->foreign('category')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade');

            $table->foreign('unit')
                  ->references('unit_id')
                  ->on('measurement_units')
                  ->onDelete('cascade');

            // Indexes
            $table->index('category');
            $table->index('unit');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};