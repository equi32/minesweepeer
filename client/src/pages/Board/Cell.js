import React from 'react';

import { findMines, openNeighbours } from '../../helpers/functions';

const Cell = ({cell, board, setBoard}) => {
    //Handle the click
    const handleShow = e => {
        e.preventDefault();
        //Check for open and flag
        if(cell.isOpen || cell.hasFlag){
            return;
        }
        //Check for mines
        if(cell.hasMine){
            alert('Perdiste');
            return;
        }
        //Copy
        let newCells = [...board.cells];
        //Open and count mines around
        newCells[cell.x][cell.y].isOpen = true;
        newCells[cell.x][cell.y].count = findMines(cell, board);
        //Check te count
        if(newCells[cell.x][cell.y].count === 0){
            //Must open neighbours
            newCells = openNeighbours(cell, {
                ...board,
                cells: newCells
            });
        }
        //Update
        setBoard({
            ...board,
            cells: newCells
        });
    }

    const handleFlag = e => {
        e.preventDefault();
        //Check
        if(cell.isOpen || cell.hasFlag || cell.hasMine){
            return;
        }
        //Must check if reach the max
        if(board.flashRemain === 0){
            return;
        }
        //Copy
        let newCells = [...board.cells];
        //Set flag
        newCells[cell.x][cell.y].hasFlag = true;
        //Update board
        setBoard({
            ...board,
            cells: newCells
        });
    }
    //Render
    return (
        <button 
            type="button" 
            className="text-center items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={e => handleShow(e)}
            onContextMenuCapture={e => handleFlag(e)}
        >
            {
                cell.hasMine ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                ) : null
            }
            {
                cell.hasFlag ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                    </svg>
                ) : null
            }
            {
                !cell.hasFlag && !cell.hasMine && cell.isOpen ? (
                    cell.count
                ) : null
            }
        </button>
    );
};
 
export default Cell;