import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import Layout from '../Layout';
import Cell from './Cell';

import { createBoard } from '../../helpers/functions';
import HeaderButton from '../../components/Common/HeaderButton';
import routes from '../../constants/routes';

import { GameContext } from '../../contexts/GameContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useHistory } from 'react-router-dom';
import en from '../../lang/en';

const Board = () => {
    //History
    const history = useHistory();
    //Context
    const { game, saveGame } = useContext(GameContext);
    const { profile } = useContext(AuthContext);
    //Local State
    const [ loading, setLoading ] = useState(true);
    const [ board, setBoard ] = useState(null);
    const [ clock, setClock ] = useState(0);
    const [ showAll, setShowAll ] = useState(false);
    //Board
    useEffect(() => {
        if(game.rows && game.cols && game.mines){
            generateBoard();
        }else{
            history.push(routes.HOME);
        }
    }, []);
    //Take board changes
    useEffect(() => {
        handleControl();
    }, [board])
    //Generate board
    const generateBoard = () => {
        //Check if is loaded game
        if(game.cells){
            setBoard({
                rows: game.rows,
                cols: game.cols,
                mines: game.mines,
                flagsRemain: game.mines,
                cells: game.cells,
            })
            //Set the clock
            setClock(game.clock);
        }else{
            //Is new game, must create board
            setBoard(createBoard(game.rows, game.cols, game.mines));
        }
        //Hide loading
        setLoading(false);
    }
    // useEffect(() => {
    //     setTimeout(() => {
    //         setClock(clock + 1);
    //     }, 1000);
    // });

    //Handle save
    const handleSave = () => {
        saveGame({
            ...board,
            board: JSON.stringify(board.cells),
            timetracking: clock
        });
    }
    //Control game
    const handleControl = () => {
        //Check if all opened
        if(board && board.opened > 0){
            const total = board.rows * board.cols;
            if(board.opened + board.mines === total && board.flagsRemain === 0){
                alert('ganaste');
            }
        }
    }
    //Render
    return (
        <Layout>
            <div className="box-content">
            <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                <h2 className="text-2zxl font-extrabold text-gray-900">
                    { process.env.REACT_APP_NAME }
                </h2>
                </div>
                <div className="text-right">
                    <HeaderButton to={ routes.HOME }>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </HeaderButton>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-2 mt-2">
                <div className="text-left">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Let´s play { profile.name }
                    </h2>
                </div>
                
                <div className="text-right">
                    <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                        { board ? board.flagsRemain : '-' }
                    </div>
                    <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        { clock < 10 && clock < 100 ? `00${clock}` : clock < 100 ? `0${clock}` : clock }
                    </div>
                    <button 
                        type="button" 
                        className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleSave}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        { en.SAVE.toUpperCase() }
                    </button>
                </div>
            </div>
            {
                loading ? (
                    <button type="button" class="mt-4 w-full inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-300 cursor-not-allowed" disabled>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        { en.LOADING }
                    </button>
                ) : null
            }
            {
                board ? (
                    <div className={`grid flex justify-center`}>
                        {
                            board.cells.map(row => (
                                <div className="w-100" style={{ height: `calc(100% / ${ board.rows}`}}>
                                    {
                                        row.map(cell => (
                                            <Cell
                                                key={`${cell.x}-${cell.y}`}
                                                cell={cell}
                                                board={board}
                                                setBoard={setBoard}
                                                showAll={showAll}
                                                setShowAll={setShowAll}
                                            />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                ) : null
            }
            </div>
        </Layout>
    );
}
 
export default Board;