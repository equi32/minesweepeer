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
        'flagsRemain',
        'board',
        'clock',
        'opened',
        'last_update'
    ];

    /**
     * The reference to user
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
