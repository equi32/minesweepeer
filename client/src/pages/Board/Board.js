import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Cell from './Cell';

import { createBoard } from '../../helpers/functions';

const initialRows = 5;
const initialCols = 5;
const initialMines = 5;

const Board = () => {
    //State inicial
    const [ totalRows, setTotalRows ] = useState(initialRows);
    const [ totalCols, setTotalCols ] = useState(initialCols);
    const [ totalMines, setTotalMines ] = useState(initialMines);
    const [ board, setBoard ] = useState(null);
    //Board
    useEffect(() => {
        setBoard(createBoard(totalRows, totalCols, totalMines));
    }, []);
    //Render
    return (
        <Layout>
            <div className="lg:flex lg:items-center lg:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        MineSweeper
                    </h2>
                </div>
                <div className="mt-5 flex lg:mt-0 lg:ml-4">
                    <span className="hidden sm:block">
                    <button type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                    </button>
                    </span>
                </div>
            </div>
            <div className="grid grid-flow-col grid-cols-5 grid-rows-5">
                {
                    board ? (
                        board.board.map(row => (
                            row.map(cell => (
                                <Cell
                                    key={`${cell.x}-${cell.y}`}
                                    cell={cell}
                                    board={board}
                                    setBoard={setBoard}
                                />
                            ))
                        ))
                    ) : null
                }
            </div>
        </Layout>
    );
}
 
export default Board;