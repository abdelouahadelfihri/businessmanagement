<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_returns', function (Blueprint $table) {
            $table->increments('return_id');

            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('warehouse_id');

            $table->timestamp('return_date')->useCurrent();
            $table->text('reason')->nullable();

            // Foreign keys
            $table->foreign('supplier_id')
                  ->references('provider_id')
                  ->on('suppliers')
                  ->onDelete('cascade');

            $table->foreign('warehouse_id')
                  ->references('id')
                  ->on('warehouses')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_returns');
    }
};