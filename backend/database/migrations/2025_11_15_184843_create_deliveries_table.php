<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('sales_order_id')->nullable();
            $table->unsignedBigInteger('customer_id');

            $table->timestamp('delivery_date')->useCurrent();
            $table->string('status');

            // Foreign keys
            $table->foreign('sales_order_id')
                  ->references('id')
                  ->on('sales_orders')
                  ->onDelete('cascade');

            $table->foreign('customer_id')
                  ->references('id')
                  ->on('customers')
                  ->onDelete('cascade');

            // Indexes
            $table->index('sales_order_id');
            $table->index('customer_id');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};