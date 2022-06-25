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
=========================================================*/
// these are initial conditions for the game. gameState board will hold inner text for each square when a player clicks while gameHtmlElements board has the HTML elements in their corresponding position.
// winningset will hold the three consecutive HTML elements when a player wins.
// score contains player 1 points and player 2 points respectively.

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
=========================================================*/
// this function updates the marking for each player. When a player clicks it checks if there is a winner and then updates the DOM.

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

// every click triggers call UpdatingAndCheckingGame function
board.addEventListener('click', (e) => {
  const event = e;
  UpdatingAndCheckingGame(event);
});

/*========================================================
=========================================================*/
// retart the game but keeping the score
btnRestart.addEventListener('click', () => {
  resetConditions();
});

/*========================================================
=========================================================*/
//reset the game and the score
btnStart.addEventListener('click', () => {
  resetConditions();
  gameState.score = [0, 0];
  scoreP1.textContent = 0;
  scoreP2.textContent = 0;
});

/*========================================================
=========================================================*/
// reset to the initial condition of the game.
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
=========================================================*/
// it decides what player wins and then updates the image of the winner for use in a message.
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
=========================================================*/
//it updates the score when a player wins.
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
=========================================================*/
// it updates the images at the bottom of the game depending on player's turn.
function updatePlayer(player) {
  let playerAvatar = 'player2';
  if (player === 'X') {
    playerAvatar = 'player1';
  }
  const html = ` <p>Play:</p>
  <img src="./images/avatar-${playerAvatar}.svg" class="current-avatar" />`;
  currentPlayer.insertAdjacentHTML('afterbegin', html);
}

/*========================================================
=========================================================*/
// converts HTML elements into board game array.  one board holds HTML elements text while other holds only the html elements in order to manipulate the DOM and use classes.

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
=========================================================*/
// It will create a board array that is filled with null values with specific rows and columns.
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
=========================================================*/
// returns an array with the row for an specific index
function getRow(gameState, rowIndex) {
  const searchedRow = gameState.board[rowIndex];
  return searchedRow;
}

/*========================================================
=========================================================*/
// returns an array with column for an specific index
function getColumn(gameState, columnIndex) {
  const searchedColumn = [];
  for (let column of gameState.board) {
    searchedColumn.push(column[columnIndex]);
  }
  return searchedColumn;
}

/*========================================================
=========================================================*/
// returns an array with the diagonal from top left to right bottom
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
=========================================================*/
// returns an array with the diagonal from top right to left bottom
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
=========================================================*/
// returns true if all characters in an array are equal. if all are equal that means a player wins
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
=========================================================*/

// Validating Functions
// checking all the Rows and Columns to see if all their marks are equal. if happens it updates the winnerSet array with the winning HTML elements.
function checkAllRowsAndColumns(objState) {
  for (let i = 0; i < objState.board.length; i++) {
    const eachRow = getRow(objState, i);
    const eachRowHtml = getRow(gameHtmlElements, i);
    const checkEachRow = allCharacterAreEqual(eachRow);

    const eachColumn = getColumn(objState, i);
    const eachColumnHmtl = getColumn(gameHtmlElements, i);
    const checkEachColumn = allCharacterAreEqual(eachColumn);

    if (checkEachRow) {
      gameState.winningSet = eachRowHtml;
      return true;
    }

    if (checkEachColumn) {
      gameState.winningSet = eachColumnHmtl;
      return true;
    }
  }
  return false;
}

/*========================================================
=========================================================*/
// checking the two diagonal to see if all their marks are equal. if happens it updates the winnerSet array with the winning HTML elements.
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
