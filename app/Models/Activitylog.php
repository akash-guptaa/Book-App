<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
class Activitylog extends Activity
{
    use HasFactory;

    public function user() {
        return $this->hasOne(User::class, 'id' , 'causer_id');
    }
}
