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
    rowCase.innerText = sign;
    !computer ? handleSign() : computerPlay();
    setTimeout(checkWin, 0);
    setTimeout(checkDraw, 0);
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
  for (let winCase of winCases) {
    if (
      rowCases[winCase[0]].innerText === rowCases[winCase[1]].innerText &&
      rowCases[winCase[1]].innerText === rowCases[winCase[2]].innerText &&
      rowCases[winCase[0]].innerText !== ""
    ) {
      alert(`${rowCases[winCase[0]].innerText} gagne`);
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

const computerPlay = () => {
  let computerPlayCase = rowCases[Math.floor(Math.random() * 9)];
  while (computerPlayCase.innerText !== "" && checkEmptyCase() !== 0) {
    computerPlayCase = rowCases[Math.floor(Math.random() * 9)];
  }
  if (checkEmptyCase() !== 0) {
    computerPlayCase.innerText = "O";
  }
};
