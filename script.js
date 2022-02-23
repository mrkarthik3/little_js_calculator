let buttonPress = document.getElementById("container");
let currentDisplay = document.getElementById("current");
let resetButton = document.getElementsByTagName("input")[0];

Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

let arr = [];
buttonPress.addEventListener("click", (event) => {
  const classes = event.target.className.split(" ");
  if (
    event.target.className == "digit" ||
    classes.includes("multi") ||
    classes.includes("minus") ||
    classes.includes("plus") ||
    classes.includes("modulo") ||
    classes.includes("division")
  ) {
    let current = event.target.innerText;
    arr.push(current);
  }

  try {
    if (classes.includes("recipro") || classes.includes("square") || classes.includes("sqrt")) {
      let op = event.target.innerText;
      if (op === "1/x") {
        let denom = eval(arr.join(""));
        result = 1 / denom;
        if (result.countDecimals() > 4) {
          result = result.toFixed(4);
        }
        arr = [result];
      }
      if (op === "x²") {
        let result = eval(arr.join("") * arr.join(""));
        if (result.countDecimals() > 4) {
          result = result.toFixed(4);
        }
        arr = [result];
      }
      if (op === "√") {
        let result = Math.sqrt(eval(arr.join("")));
        if (result.countDecimals() > 4) {
          result = result.toFixed(4);
        }
        arr = [result];
      }
    }
    if (event.target.innerText === "=") {
      let result = eval(arr.join(""));
      if (result.countDecimals() > 4) {
        result = result.toFixed(4);
      }
      arr = [result];
    }

    currentDisplay.innerText = arr.join("");
    // above line finally displays result
  } catch (err) {
    console.log(err);
    arr = []; // calculator reset
    currentDisplay.innerText = "Error! Invalid Input!";
  }
});
resetButton.addEventListener("click", () => {
  arr = [];
  currentDisplay.innerText = arr.join("");
});
