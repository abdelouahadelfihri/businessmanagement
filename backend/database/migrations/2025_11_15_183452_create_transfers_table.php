<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transfers', function (Blueprint $table) {
            $table->increments('transfer_id');

            $table->timestamp('date')->useCurrent();
            $table->integer('quantity');

            $table->unsignedBigInteger('origin_warehouse_id');
            $table->unsignedBigInteger('destination_warehouse_id');
            $table->unsignedBigInteger('product_id');

            // Foreign keys
            $table->foreign('origin_warehouse_id')
                  ->references('id')
                  ->on('warehouses')
                  ->onDelete('cascade');

            $table->foreign('destination_warehouse_id')
                  ->references('id')
                  ->on('warehouses')
                  ->onDelete('cascade');

            $table->foreign('product_id')
                  ->references('id')
                  ->on('products')
                  ->onDelete('cascade');

            // Indexes
            $table->index('origin_warehouse_id');
            $table->index('destination_warehouse_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transfers');
    }
};