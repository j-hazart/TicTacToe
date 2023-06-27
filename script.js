let sign = "X";
let computer = false;

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
    }
  }
};

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
  }
};

const checkMoves = (move = "best") => {
  let possibleMoves = [];
  let letter = "O";

  if (move !== "best") {
    letter = "X";
  }

  for (let [a, b, c] of winCases) {
    const cells = [rowCases[a], rowCases[b], rowCases[c]];
    const [innerTextA, innerTextB, innerTextC] = cells.map(
      (cell) => cell.innerText
    );

    if (
      (innerTextA === letter && innerTextB === letter && innerTextC === "") ||
      (innerTextA === letter && innerTextB === "" && innerTextC === letter) ||
      (innerTextA === "" && innerTextB === letter && innerTextC === letter)
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

const computerPlay = () => {
  let computerPlayCase = rowCases[Math.floor(Math.random() * rowCases.length)];

  if (checkMoves().length !== 0) {
    computerPlayCase =
      checkMoves()[Math.floor(Math.random() * checkMoves().length)];
  } else if (checkMoves("counter").length !== 0) {
    computerPlayCase =
      checkMoves("counter")[
        Math.floor(Math.random() * checkMoves("counter").length)
      ];
  } else {
    while (computerPlayCase.innerText !== "" && checkEmptyCase() !== 0) {
      computerPlayCase = rowCases[Math.floor(Math.random() * 9)];
    }
  }
  if (checkEmptyCase() !== 0) {
    computerPlayCase.innerText = "O";
  }
};
