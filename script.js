let sign = "X";
let computer = false;

/**
 * The function toggles the computer player on and off and updates the corresponding button text.
 */
const switchPlayer = () => {
  const computerButton = document.querySelector("#computer > span");
  computer = !computer;
  computerButton.innerText = `${computer ? "activé" : "désactivé"}`;
  reset();
};

const handleSign = () => {
  if (sign === "X") {
    sign = "O";
  } else {
    sign = "X";
  }
};

const rowCases = document.querySelectorAll(".row-case");

/* This code is adding a click event listener to each element in the `rowCases` array. When a row case
is clicked, the function checks if the inner text of the clicked element is empty. If it is, it sets
the inner text of the clicked element to the current `sign` value, then calls `setTimeout` to check
for a win and a draw. Finally, if the `computer` variable is false, it calls `handleSign()` to
switch the `sign` value, otherwise it calls `computerPlay()` to make a move for the computer player. */
for (let rowCase of rowCases) {
  rowCase.addEventListener("click", (e) => {
    if (rowCase.innerText === "") {
      rowCase.innerText = sign;
      setTimeout(checkWin, 0);
      setTimeout(checkDraw, 0);
      !computer ? handleSign() : computerPlay();
    }
  });
}

const reset = () => {
  for (let rowCase of rowCases) {
    rowCase.innerText = "";
  }
  sign = "X";
};

const winCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/**
 * The function checks if any of the winning combinations in a tic-tac-toe game have been achieved and
 * alerts the winner's name if so.
 */
const checkWin = () => {
  for (let [a, b, c] of winCases) {
    const cells = [rowCases[a], rowCases[b], rowCases[c]];
    const [innerTextA, innerTextB, innerTextC] = cells.map(
      (cell) => cell.innerText
    );
    if (
      innerTextA === innerTextB &&
      innerTextB === innerTextC &&
      innerTextA !== ""
    ) {
      alert(`${innerTextA} gagne`);
      reset();
      return true;
    }
  }
};

/**
 * The function checks the number of empty cases in a set of row cases.
 * @returns The function `checkEmptyCase` is returning the number of empty cases in the `rowCases`
 * array.
 */
const checkEmptyCase = () => {
  let emptyCases = 0;
  for (let rowCase of rowCases) {
    if (rowCase.innerText === "") {
      emptyCases++;
    }
  }
  return emptyCases;
};

const checkDraw = () => {
  if (checkEmptyCase() === 0) {
    alert("Match nul");
    reset();
    return true;
  }
};

/**
 * The function checks for possible moves in a tic-tac-toe game based on the current symbol and returns
 * an array of empty cells that could lead to a win.
 * @param [move=best] - The parameter `move` is optional and has a default value of "best". It is used
 * to determine which symbol to check for possible moves - "O" if `move` is "best" and "X" if `move` is
 * not "best".
 * @returns The function `checkMoves` returns an array of HTML elements that represent the possible
 * moves that can be made in a game of tic-tac-toe. These moves are determined based on the current
 * state of the game board and the symbol (either "X" or "O") that represents the player whose turn it
 * is. If the `move` parameter is not "best", then the function assumes
 */
const checkMoves = (move = "best") => {
  let possibleMoves = [];
  let symbol = "O";

  if (move !== "best") {
    symbol = "X";
  }

  for (let [a, b, c] of winCases) {
    const cells = [rowCases[a], rowCases[b], rowCases[c]];
    const [innerTextA, innerTextB, innerTextC] = cells.map(
      (cell) => cell.innerText
    );

    if (
      (innerTextA === symbol && innerTextB === symbol && innerTextC === "") ||
      (innerTextA === symbol && innerTextB === "" && innerTextC === symbol) ||
      (innerTextA === "" && innerTextB === symbol && innerTextC === symbol)
    ) {
      cells.forEach((cell) => {
        if (cell.innerText === "") {
          possibleMoves.push(cell);
        }
      });
    }
  }

  return possibleMoves;
};

/**
 * The function generates a random move for the computer player in a tic-tac-toe game, prioritizing
 * best moves then defensive moves and empty spaces.
 */
const computerPlay = () => {
  let computerPlayCase = getRandomElement(rowCases);

  if (checkMoves().length !== 0) {
    computerPlayCase = getRandomElement(checkMoves());
  } else if (checkMoves("counter").length !== 0) {
    computerPlayCase = getRandomElement(checkMoves("counter"));
  } else {
    while (computerPlayCase.innerText !== "" && checkEmptyCase() !== 0) {
      computerPlayCase = getRandomElement(rowCases);
    }
  }
  if (checkEmptyCase() !== 0) {
    computerPlayCase.innerText = "O";
  }
};

const getRandomElement = (tbl) => {
  return tbl[Math.floor(Math.random() * tbl.length)];
};
