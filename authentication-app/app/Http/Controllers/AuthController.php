<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;

class AuthController extends Controller
{
    //
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'nik' => ['required', 'unique:users', 'min:16'],
            'password' => ['required', 'min:6'],
            'role' => ['required', Rule::in(['user', 'admin'])],
        ]);

        $new_user = User::create($validated);

        return response()->json($new_user);
        
    }
}
