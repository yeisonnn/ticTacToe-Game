// VARIABLES AND DOM MANIPULATION.

const board = document.querySelector('.game');
const spaces = document.querySelectorAll('.eachSpace');
const modal = document.querySelector('.modal');
const roundWinner = document.querySelector('.round-winner');
const btnRestart = document.querySelector('.btn-restart');
const btnStart = document.querySelector('.btn-start');
const scoreP1 = document.querySelector('.score-p1');
const scoreP2 = document.querySelector('.score-p2');
const currentPlayer = document.querySelector('.current-player');

/*========================================================
----------------------------------------------------------
=========================================================*/
const gameState = {
  players: ['X', 'O'],
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  winningSet: [],
  score: [0, 0],
};

const gameHtmlElements = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

let initialPlayer = gameState.players[1];
updatePlayer(initialPlayer);

/*========================================================
----------------------------------------------------------
=========================================================*/
function UpdatingAndCheckingGame(e) {
  if (
    initialPlayer === gameState.players[1] &&
    e.target.innerText !== initialPlayer[0] &&
    e.target.innerText === ''
  ) {
    e.target.innerText = initialPlayer;

    initialPlayer = gameState.players[0];
  }

  if (e.target.innerText === '') {
    e.target.innerText = initialPlayer;
    initialPlayer = gameState.players[1];
  }
  convertElementsIntoBoardArray(spaces);
  checkAllRowsAndColumns(gameState);
  checkAllDiagonals();
  currentPlayer.innerHTML = '';
  updatePlayer(initialPlayer);

  if (gameState.winningSet.length > 0) {
    gameState.winningSet.forEach((elem) => elem.classList.add('winner'));
    modal.classList.remove('hidden');
    roundWinner.classList.remove('hidden');
    choosingTheWinner(gameState.winningSet);
    updateCounter(gameState.winningSet);
  }
}

board.addEventListener('click', (e) => {
  const event = e;
  UpdatingAndCheckingGame(event);
});

/*========================================================
----------------------------------------------------------
=========================================================*/

btnRestart.addEventListener('click', () => {
  resetConditions();
});

/*========================================================
----------------------------------------------------------
=========================================================*/
btnStart.addEventListener('click', () => {
  resetConditions();
  gameState.score = [0, 0];
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
});

/*========================================================
----------------------------------------------------------
=========================================================*/
function resetConditions() {
  for (let element of spaces) {
    element.innerText = '';
  }
  modal.classList.add('hidden');
  roundWinner.classList.add('hidden');
  gameState.winningSet.forEach((elem) => elem.classList.remove('winner'));
  gameState.board = createBoard(3, 3);
  gameHtmlElements.board = createBoard(3, 3);
  gameState.winningSet = [];
  roundWinner.innerHTML = '';
}

/*========================================================
----------------------------------------------------------
=========================================================*/
function choosingTheWinner(winnerArr) {
  let winnerPlayer = 'player1';
  if (winnerArr[0].textContent === 'O') {
    winnerPlayer = 'player2';
  }

  let html = `<img src="./images/avatar-${winnerPlayer}.svg" class="avatar-winner" />
  <span>Won this Round</span>`;
  roundWinner.insertAdjacentHTML('afterbegin', html);
}

/*========================================================
----------------------------------------------------------
=========================================================*/

function updateCounter(winnerArr) {
  let counter = 1;
  if (winnerArr[0].textContent === 'X') {
    gameState.score[0] += counter;
    scoreP1.textContent = gameState.score[0];
  }
  if (winnerArr[0].textContent === 'O') {
    gameState.score[1] += counter;
    scoreP2.textContent = gameState.score[1];
  }
}

/*========================================================
----------------------------------------------------------
=========================================================*/

function updatePlayer(player) {
  let playerAvatar = 'player2';
  // if (player === 'O') {
  //   console.log('el jugador es X');
  // }
  if (player === 'X') {
    playerAvatar = 'player1';
    console.log('el jugador es O');
  }
  const html = ` <p>Play:</p>
  <img src="./images/avatar-${playerAvatar}.svg" class="current-avatar" />`;
  currentPlayer.insertAdjacentHTML('afterbegin', html);
}

/*========================================================
----------------------------------------------------------
=========================================================*/
// function top convert div element into board game

function convertElementsIntoBoardArray(arrayHtmlElements) {
  const boardOfHtmlInnerText = [];
  const boardOfHtmlElements = [];
  const arrayFromNodeList = [...arrayHtmlElements];
  for (let i = 0; i < arrayFromNodeList.length; i += 3) {
    const rowDivs = arrayFromNodeList.slice(i, i + 3);
    const transformedRow = rowDivs.map((ele) => ele.innerText);
    boardOfHtmlInnerText.push(transformedRow);
    boardOfHtmlElements.push(rowDivs);
  }
  gameState.board = boardOfHtmlInnerText;
  gameHtmlElements.board = boardOfHtmlElements;
  return;
}

/*========================================================
----------------------------------------------------------
=========================================================*/

function createBoard(rows, cols) {
  const board = [];
  const column = new Array(cols);
  column.fill(null);
  for (let i = 0; i < rows; i++) {
    board.push(column);
  }

  return board;
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

function getColumn(gameState, columnIndex) {
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

function getDiagonalLeftToRight(objState) {
  const diagonalLeftToRight = [];
  let count = 0;
  for (let item of objState.board) {
    diagonalLeftToRight.push(item[count]);
    count++;
  }

  return diagonalLeftToRight;
}

/*========================================================
----------------------------------------------------------
=========================================================*/

function getDiagonalRightToLeft(objState) {
  const getDiagonalRightToLeft = [];
  let count = 2;
  for (let item of objState.board) {
    getDiagonalRightToLeft.push(item[count]);
    count--;
  }
  return getDiagonalRightToLeft;
}

/*========================================================
----------------------------------------------------------
=========================================================*/

function allCharacterAreEqual(gameArray) {
  if (gameArray.includes('')) {
    return;
  }
  const areAllEqual = gameArray.every(
    (setOfChars) => setOfChars === gameArray[1]
  );

  return areAllEqual;
}

/*========================================================
----------------------------------------------------------
=========================================================*/

// Validating Functions

// checking all the rows and Columns
function checkAllRowsAndColumns(objState) {
  for (let i = 0; i < objState.board.length; i++) {
    const eachRow = getRow(objState, i);
    const eachRowHtml = getRow(gameHtmlElements, i);
    const checkEachRow = allCharacterAreEqual(eachRow);

    const eachColumn = getColumn(objState, i);
    const eachColumnHmtl = getColumn(gameHtmlElements, i);
    const checkEachColumn = allCharacterAreEqual(eachColumn);

    if (checkEachRow) {
      // console.log('gameOver row');
      gameState.winningSet = eachRowHtml;
      return true;
    }

    if (checkEachColumn) {
      // console.log('gameOver column');
      gameState.winningSet = eachColumnHmtl;
      return true;
    }
  }
  return false;
}

/*========================================================
----------------------------------------------------------
=========================================================*/

function checkAllDiagonals() {
  const topLeft = getDiagonalLeftToRight(gameState);
  const topLeftHtml = getDiagonalLeftToRight(gameHtmlElements);

  const topRight = getDiagonalRightToLeft(gameState);
  const topRightHtml = getDiagonalRightToLeft(gameHtmlElements);

  const checkTopLeft = allCharacterAreEqual(topLeft);
  const checkTopRight = allCharacterAreEqual(topRight);

  if (checkTopLeft) {
    gameState.winningSet = topLeftHtml;
    return true;
  }
  if (checkTopRight) {
    gameState.winningSet = topRightHtml;
    return true;
  }

  return false;
}
