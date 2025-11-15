<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('supplier_return_lines', function (Blueprint $table) {
            $table->increments('line_id');

            $table->unsignedBigInteger('return_id');
            $table->unsignedBigInteger('item_id');

            $table->integer('quantity');

            // Foreign keys
            $table->foreign('return_id')
                  ->references('return_id')
                  ->on('supplier_returns')
                  ->onDelete('cascade');

            $table->foreign('item_id')
                  ->references('id') // Assuming 'Item' table primary key is 'id'
                  ->on('products')   // Adjust table name if different
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('supplier_return_lines');
    }
};