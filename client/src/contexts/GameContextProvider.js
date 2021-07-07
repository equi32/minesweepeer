import React, { useReducer } from 'react';
import { StatusCodes } from 'http-status-codes';
import { LIST_GAME, LOAD_GAME, NEW_GAME, RESET_GAME, SAVE_GAME } from '../types';
import api from '../helpers/api';
import apiMethods from '../constants/apiMethods';
import routes from '../constants/routes';

export const GameContext = React.createContext();

const initialState = {
    rows: '',
    cols: '',
    mines: '',
    cells: null, //Is null for new games
    games: []
};

const reducer = (state, action) => {
    switch(action.type){
        case NEW_GAME:
            return {
                ...initialState,
                rows: action.payload.rows,
                cols: action.payload.cols,
                mines: action.payload.mines
            }
        case RESET_GAME:
            return initialState;
        case LIST_GAME:
            return {
                ...state,
                games: action.payload
            }
        case SAVE_GAME:
            return {
                ...state
            }
        case LOAD_GAME:
            return {
                ...state,
                rows: action.payload.rows,
                cols: action.payload.cols,
                mines: action.payload.mines,
                cells: JSON.parse(action.payload.board)
            }
        default:
            throw state;
    }
};

const GameContextProvider = ({ children }) => {
    
    const [ game, handleGame ] = useReducer(reducer, initialState);

    //Handle the game list
    const listGames = async () => {
        try{
            //Query
            const response = await api.get(apiMethods.GAMES);
            //Take the data
            const { data: { data, success } } = response;
            //Check response
            if(success){
                //Dispatch
                handleGame({
                    type: LIST_GAME,
                    payload: data
                })
                //Show message
            }else{
                //Show message
            }
        }catch(error){
            if (error.response && error.response.status === StatusCodes.NOT_FOUND) {
            }else{

            }
        }
    }

    //Handle the game store
    const saveGame = async gameData => {
        try{
            //Query
            const response = await api.post(apiMethods.GAMES, gameData);
            //Take the data
            const { data: { data, success } } = response;
            //Check response
            if(success){
                //Dispatch
                handleGame({
                    type: SAVE_GAME,
                    payload: data
                })
                //Show message
            }else{
                //Show message
            }
        }catch(error){
            if (error.response && error.response.status === StatusCodes.NOT_FOUND) {

            }else{

            }
        }
    }

    //Handle the game load
    const loadGame = async (id, history) => {
        try{
            //Query
            const response = await api.get(`${apiMethods.GAMES}/${id}`);
            //Take the data
            const { data: { data, success } } = response;
            //Check response
            if(success){
                //Dispatch
                handleGame({
                    type: LOAD_GAME,
                    payload: data
                })
                //Redirect
                history.push(routes.PLAY_GAME);
                //Show message

            }else{
                //Show message
            }
        }catch(error){
            if (error.response && error.response.status === StatusCodes.NOT_FOUND) {

            }else{

            }
        }
    }

    const value = {
        game,
        handleGame,
        saveGame,
        listGames,
        loadGame
    };

    return <GameContext.Provider value={value}>{ children }</GameContext.Provider>
};

export default GameContextProvider;