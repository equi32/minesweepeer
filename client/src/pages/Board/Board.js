import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';

import Layout from '../Layout';
import Cell from './Cell';

import { createBoard } from '../../helpers/functions';
import HeaderButton from '../../components/Common/HeaderButton';
import routes from '../../constants/routes';

import { GameContext } from '../../contexts/GameContextProvider';

const Board = () => {
    //Context
    const { game } = useContext(GameContext);
    //State inicial
    const [ board, setBoard ] = useState(null);
    const [ clock, setClock ] = useState(0);
    //Board
    useEffect(() => {
        if(game.rows && game.cols && game.mines){
            setBoard(createBoard(game.rows, game.cols, game.mines));
        }
    }, []);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setClock(clock + 1);
    //     }, 1000);
    // });
    //Render
    return (
        <Layout>
            <div className="box-content">
            <div class="grid grid-cols-2 gap-4">
                <div className="text-left">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    { process.env.REACT_APP_NAME }
                </h2>
                </div>
                <div className="text-right">
                    <HeaderButton to={ routes.HOME } className="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </HeaderButton>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-2 mt-2">
                <div className="text-left">
                    <div className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        { clock < 10 && clock < 100 ? `00${clock}` : clock < 100 ? `0${clock}` : clock }
                    </div>
                    <div className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        { board ? board.flagsRemain : '-' }
                    </div>
                </div>
                
                <div className="text-right">
                    <HeaderButton to={ routes.LOGIN } className="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                    </HeaderButton>
                </div>
            </div>
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