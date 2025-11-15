<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('delivery_lines', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('delivery_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warehouse_id');

            $table->double('quantity', 15, 2);

            // Foreign keys
            $table->foreign('delivery_id')
                  ->references('id')
                  ->on('deliveries')
                  ->onDelete('cascade');

            $table->foreign('product_id')
                  ->references('id')
                  ->on('products')
                  ->onDelete('cascade');

            $table->foreign('warehouse_id')
                  ->references('id')
                  ->on('warehouses')
                  ->onDelete('cascade');

            // Indexes
            $table->index('delivery_id');
            $table->index('product_id');
            $table->index('warehouse_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_lines');
    }
};