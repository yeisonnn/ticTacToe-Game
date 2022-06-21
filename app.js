const gameState = {
  players: ['x', 'o'],
  board: [
    ['o', '1', '3'],
    ['o', 'o', '2'],
    ['o', '3', '4']
  ]
}

/*========================================================
----------------------------------------------------------
=========================================================*/


function getRow(gameState, rowIndex) {
  const searchedRow = gameState.board[rowIndex];
  // console.log(searchedRow);
  return searchedRow;
}


/*========================================================
----------------------------------------------------------
=========================================================*/

function getColumn(gameState,columnIndex) {
  const searchedColumn = [];
  for (let column of gameState.board) {
    searchedColumn.push(column[columnIndex]);
  }
  // console.log(searchedColumn);
  return searchedColumn;
}


/*========================================================
----------------------------------------------------------
=========================================================*/

function getDiagonalLeftToRight(gameState){
  const diagonalLeftToRight = [];
  let count = 0;
  for (let item of gameState.board){
  diagonalLeftToRight.push(item[count])
  count ++;
}
  // console.log(diagonalLeftToRight);
  return diagonalLeftToRight
};

/*========================================================
----------------------------------------------------------
=========================================================*/

function getDiagonalRightToLeft(gameState){
  const diagonalLeftToRight = [];
  let count = 2;
  for (let item of gameState.board){
  diagonalLeftToRight.push(item[count])
  count --;
}
  // console.log(diagonalLeftToRight);
  return diagonalLeftToRight
};

/*========================================================
----------------------------------------------------------
=========================================================*/

function allCharacterAreEqual(gameArray){
  const areAllEqual = gameArray.every(setOfChars => setOfChars === gameArray[1]);
  // console.log(areAllEqual);
  return areAllEqual

}

/*========================================================
----------------------------------------------------------
=========================================================*/

// Validating Functions

// checking all the rows
function checkAllChars(gameState){
for(let i = 0; i<gameState.board.length; i++){
  const eachRow = getRow(gameState, i)
  const checkEachRow = allCharacterAreEqual(eachRow);

  const eachColumn = getColumn(gameState, i);
  const checkEachColumn = allCharacterAreEqual(eachColumn)

  if(checkEachRow || checkEachColumn){
    console.log('gameOver');
    return true
  }
}
return false
 
}


/*========================================================
----------------------------------------------------------
=========================================================*/

function checkAllDiagonals(gameState){
  const topLeft = getDiagonalLeftToRight(gameState);
  const topRight = getDiagonalRightToLeft(gameState);
  const checkTopLeft = allCharacterAreEqual(topLeft);
  const checkTopRight = allCharacterAreEqual(topRight);
  
if(checkTopLeft || checkTopRight){
  console.log('game over');
  return true;
}else{
  return false
}

}

checkAllDiagonals(gameState);