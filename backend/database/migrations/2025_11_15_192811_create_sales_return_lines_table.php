<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales_return_lines', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('sales_return_id');
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('warehouse_id');

            $table->double('quantity', 15, 2);

            // Foreign keys
            $table->foreign('sales_return_id')
                  ->references('return_id')
                  ->on('sales_returns')
                  ->onDelete('cascade');

            $table->foreign('item_id')
                  ->references('id') // Adjust if Product table PK is different
                  ->on('products')
                  ->onDelete('cascade');

            $table->foreign('warehouse_id')
                  ->references('id')
                  ->on('warehouses')
                  ->onDelete('cascade');

            // Indexes
            $table->index('sales_return_id');
            $table->index('item_id');
            $table->index('warehouse_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_return_lines');
    }
};