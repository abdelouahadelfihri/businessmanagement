<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_receipt_lines', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('purchase_receipt_id');
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('warehouse_id');

            $table->double('quantity', 15, 2);

            // Foreign keys
            $table->foreign('purchase_receipt_id')
                  ->references('id')
                  ->on('purchase_receipts')
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
            $table->index('purchase_receipt_id');
            $table->index('product_id');
            $table->index('warehouse_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_receipt_lines');
    }
};