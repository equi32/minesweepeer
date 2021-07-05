import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Cell from './Cell';

import { createBoard } from '../../helpers/functions';
import HeaderButton from '../../components/Common/HeaderButton';
import routes from '../../constants/routes';

const initialRows = 5;
const initialCols = 5;
const initialMines = 5;

const Board = () => {
    //State inicial
    const [ totalRows, setTotalRows ] = useState(initialRows);
    const [ totalCols, setTotalCols ] = useState(initialCols);
    const [ totalMines, setTotalMines ] = useState(initialMines);
    const [ board, setBoard ] = useState(null);
    const [ clock, setClock ] = useState(new Date());
    //Board
    useEffect(() => {
        setBoard(createBoard(totalRows, totalCols, totalMines));
    }, []);
    //Render
    return (
        <Layout>
            <div class="grid grid-cols-2 gap-4">
                <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
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
            <div class="grid grid-cols-3 gap-4 mb-2 mt-2">
                <div>
                    { clock }
                </div>
                <div className="text-center">
                    MineCounter
                </div>
                <div className="text-right">
                    <HeaderButton to={ routes.LOGIN } className="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                    </HeaderButton>
                </div>
            </div>
            <div className="grid grid-flow-col grid-cols-5 grid-rows-5">
                {
                    board ? (
                        board.cells.map(row => (
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