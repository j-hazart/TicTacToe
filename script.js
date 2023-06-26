let sign = "X";

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
    handleSign();
  });
}
