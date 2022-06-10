<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
/** @OA\Info(title="Authentication API", version="0.1") */
class AuthController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:api', ['only' => ['me']]);
    }

    /**
    * @OA\Get(

    *  path="/api/me",

    *  summary="validates jwt token with private claim data",

    *  @OA\Parameter(name="email",

    *    in="query",

    *    required=true,

    *    @OA\Schema(type="string")

    *  ),

    *  @OA\Response(response="200",

    *    description="Validation Response",

    *  )

    * )

    */


    public function me() {
        return response()->json(auth()->user());
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'nik' => ['required', 'unique:users', 'min:16'],
            'password' => ['required', 'min:6'],
            'role' => ['required', Rule::in(['user', 'admin'])],
        ]);

        $new_user = User::create([
            'nik' => $validated['nik'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return response()->json($new_user);
        
    }

    public function login(Request $request) 
    {
        $validated = $request->validate([
            'nik' => ['required', 'min:16'],
            'password' => ['required', 'min:6'],
        ]);
        $credentials = request(['nik', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token, $credentials);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $credentials)
    {

        $user = User::where('nik', $credentials['nik'])->firstOrFail();
        return response()->json([
            'id' => $user['id'],
            'nik' => $user['nik'],
            'role' => $user['role'],
            'token'=> [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        ]);
    }
}
