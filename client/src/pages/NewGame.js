import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from './Layout';

import en from '../lang/en';
import routes from '../constants/routes';
import HeaderButton from '../components/Common/HeaderButton';

import { GameContext } from '../contexts/GameContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';
import { NEW_GAME } from '../types';

const initialGame = {
    rows: '',
    cols: '',
    mines: ''
}

const maxParams = {
    rows: 100,
    cols: 100
}

const NewGame = () => {
    //History
    const history = useHistory();
    //Context
    const { handleGame } = useContext(GameContext);
    const { profile } = useContext(AuthContext);
    //Local state
    const [ game, setGame ] = useState(initialGame)
    //Form changes
    const handleChange = e => {
        setGame({
            ...game,
            [e.target.name]: e.target.value
        })
    }
    //Form submit
    const handleSubmit = e => {
        e.preventDefault();
        //Validate
        if(isNaN(parseInt(game.rows)) || game.rows > maxParams.rows){
            alert('error row');
            return;
        }
        if(isNaN(game.cols) || game.cols > maxParams.cols){
            alert('error cols');
            return;
        }
        if(isNaN(game.mines) || game.mines > (game.rows * game.cols)){
            alert('error mines');
            return;
        }
        //Set the data
        handleGame({
            type: NEW_GAME,
            payload: {
                rows: parseInt(game.rows),
                cols: parseInt(game.cols),
                mines: parseInt(game.mines)
            }
        });
        //Redirect to game
        history.push(routes.PLAY_GAME);
    }
    //Render
    return (
        <Layout halfWidth>
            <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                        <h2 data-cy="new-title" className="text-3xl font-extrabold text-gray-900">
                            { `${en.WELCOME} ${profile.name}` }
                        </h2>
                        Configure your game
                    </div>
                    <div className="text-right">
                        <Link
                            data-cy="new-home"
                            to={ routes.HOME } 
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <form 
                data-cy="new-form"
                className="mt-8 space-y-6 flex content-center justify-center" 
                onSubmit={handleSubmit}
            >
                <div className="w-1/2">
                    <div className="rounded-md shadow-sm -space-y-px mb-2">
                        <div>
                            <label htmlFor="rows-number" className="sr-only">Rows</label>
                            <input 
                                data-cy="new-rows"
                                name="rows" 
                                type="number" 
                                autoComplete="off" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder={ en.PLACEHOLDER.ROWS }
                                autoFocus
                                onChange={handleChange}
                                value={game.rows}
                            />
                        </div>
                        <div>
                            <label htmlFor="cols-number" className="sr-only">Columns</label>
                            <input 
                                data-cy="new-cols"
                                name="cols" 
                                type="number" 
                                autoComplete="off" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder={ en.PLACEHOLDER.COLS } 
                                onChange={handleChange}
                                value={game.cols}
                            />
                        </div>
                        <div>
                            <label htmlFor="mines-number" className="sr-only">Mines</label>
                            <input 
                                data-cy="new-mines"
                                name="mines" 
                                type="number" 
                                autoComplete="off" 
                                required 
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                                placeholder={ en.PLACEHOLDER.MINES }
                                onChange={handleChange}
                                value={game.mines}
                            />
                        </div>
                    </div>
                    <div className="mb-2">
                        <button 
                            data-cy="new-submit"
                            type="submit" 
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </span>
                            { en.START_GAME.toUpperCase() }
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
 
export default NewGame;