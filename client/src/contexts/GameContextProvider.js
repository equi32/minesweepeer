import React, { useReducer } from 'react';
import { NEW_GAME, RESET_GAME } from '../types';

export const GameContext = React.createContext();

const initialState = {
    rows: '',
    cols: '',
    mines: ''
};

const reducer = (state, action) => {
    switch(action.type){
        case NEW_GAME:
            return {
                ...state,
                rows: action.payload.rows,
                cols: action.payload.cols,
                mines: action.payload.mines
            }
        case RESET_GAME:
            return initialState;
        default:
            throw state;
    }
};

const GameContextProvider = ({ children }) => {
    
    const [ game, handleGame] = useReducer(reducer, initialState);

    const value = {
        game,
        handleGame
    };

    return <GameContext.Provider value={value}>{ children }</GameContext.Provider>
};

export default GameContextProvider;