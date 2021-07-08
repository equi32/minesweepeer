import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

import en from '../lang/en';
import routes from '../constants/routes';
import HeaderButton from '../components/Common/HeaderButton';

import { GameContext } from '../contexts/GameContextProvider';
import { AuthContext } from '../contexts/AuthContextProvider';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const LoadGame = () => {
    //History
    const history = useHistory();
    //Context
    const { game, listGames, loadGame } = useContext(GameContext);
    const { profile } = useContext(AuthContext);
    //List games
    useEffect(() => {
        listGames();
    }, [])
    //Handle load
    const handleLoad = game => {
        loadGame(game.id, history);
    }
    //Render
    return (
        <Layout halfWidth>
            <div className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                        <h2 data-cy="load-title" className="text-3xl font-extrabold text-gray-900">
                            { `${en.WELCOME} ${profile.name}` }
                        </h2>
                        Select the game to load
                    </div>
                    <div className="text-right">
                        <Link
                            data-cy="load-home"
                            to={ routes.HOME } 
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            {
                game.games && game.games.length > 0 ? (
                    <div className="flex flex-col" data-cy="load-games">
                        {
                            game.games.map(game => (
                                <div className="mt-4" key={`game-${game.id}`}>
                                    <button 
                                        type="button" 
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => handleLoad(game)}
                                    >
                                        <span className="absolute text-lg left-0 inset-y-0 flex items-center pl-3">
                                            <b>#{ game.id }</b>
                                        </span>
                                        Date: { moment(game.created_at).format('DD/MM/YYYY HH:mm') }
                                        <br />
                                        Rows: { game.rows } - Cols: { game.cols } - Mines: { game.mines }
                                        <br />
                                        Time: { game.clock }
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="mt-4 w-full inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-black bg-gray-300 cursor-not-allowed">
                        You don´t have any game to load
                    </div>
                )
            }
        </Layout>
    );
}
 
export default LoadGame;