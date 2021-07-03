<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'status',
        'rows',
        'cols',
        'mines',
        'last_update',
        'board'
    ];

    /**
     * The reference to user
     */
    public function user()
    {
        retur $this->belongsTo(User::class, 'user_id');
    }
}
