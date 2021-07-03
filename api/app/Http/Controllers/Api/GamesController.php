<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Game;

use App\Http\Resources\GameResource;

use Validator;

class GamesController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //Get the user
        $user = auth()->user();
        //Find the user games
        $games = Game::where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->get();
        //Generate the resource
        $data = GameResource::collection($games);
        //Send data
        return $this->sendResponse($data, trans('api.success.data'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //Validation
        $validator = Validator::make($request->all(), [
            'rows' => 'required|numeric',
            'cols' => 'required|numeric',
            'mines' => 'required|numeric',
            'board' => 'required',
        ]);
        //Verification
        if($validator->fails())
        {
            //Error
            return $this->sendError(trans('api.invalid_data'));
        }
        //Create object
        $game = Game::create([
            'rows' => $request->rows,
            'cols' => $request->cols,
            'mines' => $request->mines,
            'board' => $request->board,
            'user_id' => auth()->user()->id
        ]);
        //Generate data
        $data = new GameResource($game);
        //Response
        return $this->sendResponse($data, trans('api.success.create'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Find resource
        $game = Game::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->first();
        //Check
        if(!$game){
            //Error
            return $this->sendError(trans('api.register_not_found'));
        }
        //Generate data
        $data = new GameResource($game);
        //Response
        return $this->sendResponse($data, trans('api.success.data'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //Find resource
        $game = Game::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->first();
        //Check
        if(!$game){
            //Error
            return $this->sendError(trans('api.register_not_found'));
        }
        //Validation
        $validator = Validator::make($request->all(), [
            'board' => 'required',
            'timetracking' => 'required|numeric'
        ]);
        //Verification
        if($validator->fails())
        {
            //Error
            return $this->sendError(trans('api.invalid_data'));
        }
        //Update object
        $game->update([
            'board' => $request->board,
            'timetracking' => $request->timetracking,
            'last_update' => date('Y-m-d H:i:s')
        ]);
        //Generate data
        $data = new GameResource($game);
        //Response
        return $this->sendResponse($data, trans('api.success.update'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //Find resource
        $game = Game::where('user_id', auth()->user()->id)
            ->where('id', $id)
            ->first();
        //Check
        if(!$game){
            //Error
            return $this->sendError(trans('api.register_not_found'));
        }
        //Delete object
        $game->delete();
        //Generate data
        $data = new GameResource($game);
        //Response
        return $this->sendResponse($data, trans('api.success.delete'));
    }
}
