import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../Layout';
import GameTitle from '../../components/Common/GameTitle';
import Cell from './Cell';

import { createBoard } from '../../helpers/functions';
import routes from '../../constants/routes';

import { GameContext } from '../../contexts/GameContextProvider';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { useHistory } from 'react-router-dom';
import en from '../../lang/en';
import Swal from 'sweetalert2';
import { confirmMessage } from '../../components/Alert/Alert';

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
    const [ stopClock, setStopClock ] = useState(true);
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
    //Clock
    useEffect(() => {
        handleClock();
    });
    //Check clock changes
    // useEffect(() => {
    //     if(clock === 0){
    //         //Stop the clock
    //         setStopClock(true);
    //     }
    // }, [clock]);
    //Handle clock
    const handleClock = () => {
        if(!stopClock){
            setTimeout(() => {        
                setClock(clock + 1);
            }, 1000);
        }
    }
    //Generate board
    const generateBoard = () => {
        //Check if is loaded game
        if(game.cells){
            setBoard({
                rows: game.rows,
                cols: game.cols,
                mines: game.mines,
                flagsRemain: game.flagsRemain,
                opened: game.opened,
                cells: game.cells,
            })
            //Set the clock
            setClock(game.clock);
        }else{
            //Hide all
            setShowAll(false);
            //Is new game, must create board
            setBoard(createBoard(game.rows, game.cols, game.mines));
        }
        //Hide loading
        setLoading(false);
    }
    //Handle save
    const handleSave = () => {
        //Stop the clock
        setStopClock(true);
        //Data
        let gameData = {
            ...board,
            board: JSON.stringify(board.cells),
            timetracking: clock,
        }
        //Check the id
        if(game.id){
            gameData = {
                id: game.id,
                ...gameData
            }
        }
        //Save the game
        saveGame(gameData);
        //Restart the clock
        setStopClock(false);
    }
    //Handle restart
    const handleRestart = () => {
        //Confirm
        confirmMessage(
            en.RESTART_GAME,
            'Are you sure?',
            'Yes, restart!',
            () => {
                //Stop the clock
                setStopClock(true);
                //Hide
                setShowAll(false);
                //Restart the clock
                setTimeout(() => {
                    setClock(0);
                }, 500);
                //Generate board again
                setBoard(createBoard(game.rows, game.cols, game.mines))
            }
        )
    }
    //Control game
    const handleControl = () => {
        //Check if all opened
        if(board && board.opened > 0){
            const total = board.rows * board.cols;
            if(board.opened + board.mines === total && board.flagsRemain === 0){
                //Stop the clock
                setStopClock(true);
                //Message
                Swal.fire(
                    en.GOOD_JOB,
                    'You won the game!',
                    'success'
                )
            }
        }
    }
    //Render
    return (
        <Layout>
            <div className="box-content">
                <div>
                    <GameTitle />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                        <h2 data-cy="load-title" className="text-2xl font-extrabold text-gray-900">
                            { `${en.WELCOME} ${profile.name}` }
                        </h2>
                    </div>
                    <div className="text-right">
                        <Link
                            data-cy="play-home"
                            to={ routes.HOME } 
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2 mt-2">
                    <div className="text-left">
                        <h2 data-cy="play-title" className="text-3xl font-extrabold text-gray-900">
                            Let´s play { profile.name }
                        </h2>
                    </div>
                    
                    <div className="text-right">
                        <div 
                            data-cy="play-flags"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                            </svg>
                            { board ? board.flagsRemain : '-' }
                        </div>
                        <div 
                            data-cy="play-clock"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            { clock < 10 && clock < 100 ? `00${clock}` : clock < 100 ? `0${clock}` : clock }
                        </div>
                        <button 
                            data-cy="play-save"
                            type="button" 
                            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleSave}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            { en.SAVE.toUpperCase() }
                        </button>
                        <button 
                            data-cy="play-restart"
                            type="button" 
                            className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={handleRestart}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>
                {
                    loading ? (
                        <button type="button" className="mt-4 w-full inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-300 cursor-not-allowed" disabled>
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
                        <div className={`grid flex justify-center`} data-cy="play-cells">
                            {
                                board.cells.map((row, index) => (
                                    <div key={`row-${index}`} className="w-100" style={{ height: `calc(100% / ${ board.rows}`}}>
                                        {
                                            row.map(cell => (
                                                <Cell
                                                    key={`${cell.x}-${cell.y}`}
                                                    cell={cell}
                                                    board={board}
                                                    setBoard={setBoard}
                                                    showAll={showAll}
                                                    setShowAll={setShowAll}
                                                    stopClock={stopClock}
                                                    setStopClock={setStopClock}
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