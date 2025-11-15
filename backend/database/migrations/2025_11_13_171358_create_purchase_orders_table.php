<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id(); // id BIGINT AUTO_INCREMENT

            $table->unsignedBigInteger('supplier_id'); // Kotlin: supplierId
            $table->foreign('supplier_id')
                  ->references('supplierId') // Supplier model primary key
                  ->on('suppliers')
                  ->onDelete('cascade');
            $table->foreignId('request_id')->nullable()->constrained('purchase_requests')->onDelete('set null');
            $table->bigInteger('order_date'); // Kotlin: Long (timestamp)
            $table->string('status'); // draft, confirmed, received
            $table->double('total_amount', 15, 2); // Kotlin: Double

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};