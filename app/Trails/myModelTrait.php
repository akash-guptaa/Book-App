<?php

namespace App\Helpers;

use Illuminate\Http\Request;
use App\LogActivity;
use DB;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Scopes\UserGroupScope;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use App\Models\ReferenceMaster;
use App\Models\Activitylog;

trait myModelTrait
 {
    

    public function scopeSearch($query,$search_params){
        return $query->where(function ($query) use ($search_params) {
            $search_start = false;
            foreach ($search_params as $key=>&$columns) foreach ($columns as  $relation => &$column) {
                if (!$search_start) {
                    $query->where($column, 'LIKE', "%".$key."%");
                    $search_start = true;
                }
                else if(gettype($relation) == 'string') {
                    $query->orWhereHas($relation, function ($q) use($column,$key){
                        return $q->where($column, 'LIKE', "%".$key."%");
                    });
                }
                else
                {
                    $query->orWhere($column, 'LIKE', '%'.$key.'%');
                }
            }
            return $query;
        });
    }
    public function scopeCustomPaginate($query){
        return $query->orderBy(request('order_by','id'),request('order_by','DESC'))
        ->paginate(request('limit',10));
    }


    public function Activitylog()
    {
        return $this->hasMany(Activitylog::class, 'subject_id','id')->where('subject_type',getclass($this->getModel()));
    }

    public function scopetoRawSql($query) {
        $query = clone $query;// Get the generated SQL query
        $sqlQuery = $query->toSql(); // Get the generated SQL query
        $bindings = $query->getBindings(); // Get the parameter bindings
        return (vsprintf(str_replace(['%', '?'], ['%%', "'%s'"], $sqlQuery), $bindings));
    }


}
