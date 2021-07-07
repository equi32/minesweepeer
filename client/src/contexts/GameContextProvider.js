import React, { useReducer } from 'react';
import { StatusCodes } from 'http-status-codes';
import { LIST_GAME, LOAD_GAME, NEW_GAME, RESET_GAME, SAVE_GAME } from '../types';
import api from '../helpers/api';
import apiMethods from '../constants/apiMethods';
import routes from '../constants/routes';
import { showErrorMessage, showSuccessMessage, waitingMessage } from '../components/Alert/Alert';
import en from '../lang/en';
import Swal from 'sweetalert2';

export const GameContext = React.createContext();

const initialState = {
    id: null,
    rows: '',
    cols: '',
    mines: '',
    flagsRemain: '',
    opened: '',
    clock: '',
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
                ...state,
                id: action.payload.id //Set the ID 
            }
        case LOAD_GAME:
            return {
                ...state,
                id: action.payload.id,
                rows: action.payload.rows,
                cols: action.payload.cols,
                mines: action.payload.mines,
                flagsRemain: action.payload.flagsRemain,
                opened: action.payload.opened,
                clock: action.payload.clock,
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
            waitingMessage(en.LOADING_GAMES);
            //Query
            const response = await api.get(apiMethods.GAMES);
            //Take the data
            const { data: { data, success, message } } = response;
            //Check response
            if(success){
                //Dispatch
                handleGame({
                    type: LIST_GAME,
                    payload: data
                })
                //Hide
                Swal.close();
            }else{
                //Show message
                showErrorMessage(message);
            }
        }catch(error){
            if (error.response && error.response.status === StatusCodes.NOT_FOUND) {
                showErrorMessage(error.response.data.message);
            }else{
                showErrorMessage();
            }
        }
    }

    //Handle the game store
    const saveGame = async gameData => {
        try{
            waitingMessage(en.SAVING_GAME);
            //Query
            let response;
            //Check
            if(gameData.id){
                //Update
                response = await api.put(`${apiMethods.GAMES}/${gameData.id}`, gameData);
            }else{
                //Create
                response = await api.post(apiMethods.GAMES, gameData);
            }
            //Take the data
            const { data: { data, success, message } } = response;
            //Check response
            if(success){
                //Dispatch
                handleGame({
                    type: SAVE_GAME,
                    payload: data
                })
                //hide
                Swal.close();
                //Show message
                showSuccessMessage(en.SAVED);
            }else{
                //Show message
                showErrorMessage(message);
            }
        }catch(error){
            if (error.response && error.response.status === StatusCodes.NOT_FOUND) {
                showErrorMessage(error.response.data.message);
            }else{
                showErrorMessage();
            }
        }
    }

    //Handle the game load
    const loadGame = async (id, history) => {
        try{
            waitingMessage(en.LOADING_GAME);
            //Query
            const response = await api.get(`${apiMethods.GAMES}/${id}`);
            //Take the data
            const { data: { data, success, message } } = response;
            //Check response
            if(success){
                //Dispatch
                handleGame({
                    type: LOAD_GAME,
                    payload: data
                })
                //Redirect
                history.push(routes.PLAY_GAME);
                //Hide
                Swal.close();
            }else{
                //Show message
                showErrorMessage(message);
            }
        }catch(error){
            if (error.response && error.response.status === StatusCodes.NOT_FOUND) {
                showErrorMessage(error.response.data.message);
            }else{
                showErrorMessage();
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