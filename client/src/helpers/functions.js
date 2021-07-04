export const createBoard = (rows, cols, mines) => {
    //Verifying bombs amount is not superior to cells
    if(mines > rows * cols){
        //Recalculate
        mines = Math.random() * (rows * cols);
    }
    //First, create the empty board
    let board = [];
    //Row iteration
    for(let r = 0; r < rows; r++){
        //Array of row
        let rowArray = [];
        //Col iteration
        for(let c = 0; c < cols; c++){
            //Add an item
            rowArray.push({
                x: r,
                y: c,
                count: 0,
                isOpen: false,
                hasMine: false,
                hasFlag: false
            });
        }
        //Add the row
        board.push(rowArray);
    }

    //Now, i place the mines
    let mineCount = 0;
    while(mineCount < mines){
        //Calculate a random position
        const x = Math.floor(Math.random() * rows);
        const y = Math.floor(Math.random() * cols);
        //Check if position has mine
        if(!board[x][y].hasMine){
            //Add the mine
            board[x][y].hasMine = true;
            //Increment mine count
            mineCount++;
        }
    }
    //Return the board
    return {
        rows,
        cols,
        mines,
        flagsRemain: mines,
        board
    };
}

export const findMines = (cell, board) => {    
    const totalRows = board.rows;
    const totalCols = board.cols;
    //Initialize
    let minesCount = 0;
    //Look mines around the cell, first around de rows
    for(let row = -1; row <= 1; row++){
        //Around the cols
        for(let col = -1; col <= 1; col++){
            //Take the position
            const x = cell.x + row;
            const y = cell.y + col;
            //Skip the cell
            if(row !== 0 || col !== 0){
                //Check borders
                if(x < totalRows && x >= 0 && y < totalCols && y >= 0){
                    //Check if has mine
                    if(board.board[x][y].hasMine){
                        minesCount++;
                    }
                }
            }
        }
    }
    //Return
    return minesCount;
}

