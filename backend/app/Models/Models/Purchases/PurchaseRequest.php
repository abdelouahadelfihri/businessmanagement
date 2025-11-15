<?php

namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseRequest extends Model
{
    use HasFactory;

    // Optional: if table name matches 'purchase_requests', Laravel auto-detects it
    protected $table = 'purchase_requests';

    protected $fillable = [
        'description',
        'date',
        'status'
    ];
}