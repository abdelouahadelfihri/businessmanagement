<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id'); // Int AUTO_INCREMENT

            $table->integer('document_number');
            $table->string('type');

            $table->integer('reference_id'); 
            $table->string('reference_type');

            $table->string('date');
            $table->string('status');

            $table->text('notes')->nullable();

            $table->double('total_amount', 15, 2)->default(0);

            // Kotlin has createdAt & updatedAt strings — but Laravel has timestamps
            $table->string('created_at_str');
            $table->string('updated_at_str');

            $table->timestamps(); // Laravel created_at & updated_at (real timestamps)
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};