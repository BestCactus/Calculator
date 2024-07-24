//TODO: Make history with localStorage with button for deleting

const numberBtn = document.querySelectorAll(".number-btn");
const output = document.querySelector("#result");
const previousNum = document.querySelector("#previous-num");

const historyContent = document.querySelector("#history-content");

let numTemp = [];
let currCalHistory = "";

const pushNumberToOutput = (num) => {
  let array = [];
  if (output.innerHTML.length > 10) return;
  if (output.innerHTML && output.innerHTML !== "0") {
    array = output.innerHTML.split("");
  }
  if (num === ".") {
    array = output.innerHTML.split("");
  }
  array.push(num);
  output.innerHTML = array.join("");
};

const clearCalculator = () => {
  output.innerHTML = "0";
  numTemp = [];
  previousNum.innerHTML = "";
  hasCactus = false;
  hasInfinity = false;
  //TODO: make animations
};

const saveNum = (num, operation) => {
  // Dealing with mixed operations, denying it
  if (
    numTemp.length > 0 &&
    Object.keys(numTemp[numTemp.length - 1])[0] !== operation
  ) {
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "+" &&
      operation !== "-"
    ) {
      clearCalculator();
      previousNum.innerHTML = "Cannot combine operations.";
      return;
    }
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "-" &&
      operation !== "+"
    ) {
      clearCalculator();
      previousNum.innerHTML = "Cannot combine operations.";
      return;
    }
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "×" &&
      operation !== "÷"
    ) {
      clearCalculator();
      previousNum.innerHTML = "Cannot combine operations.";
      return;
    }
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "÷" &&
      operation !== "×"
    ) {
      clearCalculator();
      previousNum.innerHTML = "Cannot combine operations.";
      return;
    }
  }
  numTemp.push({ [operation]: parseFloat(num) });
  previousNum.innerHTML = `${num}\t${operation}`;
  output.innerHTML = "0";
  currCalHistory += `${num}\t${operation}\t`;
};

const calculate = (cactus, infinity) => {
  if (cactus) return "🌵🌵🌵";
  if (infinity) return "bro, it's infinite!";
  const outputNum = parseFloat(output.innerHTML);
  let result = Object.values(numTemp[0])[0];
  for (let i = 0; i < numTemp.length; i++) {
    if (numTemp[i].hasOwnProperty("+")) {
      if (i === numTemp.length - 1) {
        result += outputNum;
        continue;
      }
      result += Object.values(numTemp[i + 1])[0];
    }
    if (numTemp[i].hasOwnProperty("-")) {
      if (i === numTemp.length - 1) {
        result -= outputNum;
        continue;
      }
      result -= Object.values(numTemp[i + 1])[0];
    }
    if (numTemp[i].hasOwnProperty("×")) {
      if (i === numTemp.length - 1) {
        result *= outputNum;
        continue;
      }
      result *= Object.values(numTemp[i + 1])[0];
    }
    if (numTemp[i].hasOwnProperty("÷")) {
      if (i === numTemp.length - 1) {
        result /= outputNum;
        continue;
      }
      result /= Object.values(numTemp[i + 1])[0];
    }
  }
  numTemp = [];
  previousNum.innerHTML = "";
  currCalHistory += `${outputNum}\t=\t${result}`;
  localStorage.setItem(currCalHistory, currCalHistory);
  currCalHistory = "";
  updateHistoryUI();
  return result;
};

const updateHistoryUI = () => {
  const allCalculations = { ...localStorage };
  if (!Object.keys(allCalculations).length) {
    historyContent.innerHTML = `
    <div class="history-calculation">
    <div class="history-calculation-header">
      <h4>No Calculations</h4>
      <p>Calculate something...</p>
    </div>
  </div>
    `;
    return;
  }
  historyContent.innerHTML = "";
  for (let calculation in allCalculations) {
    historyContent.innerHTML += `
    <div class="history-calculation">
      <div class="history-calculation-header">
        <h4>${calculation}</h4>
      </div>
      <img src="/x.svg" alt="x-svg" />
    </div>
    `;
  }
  const deleteItemBtn = document.querySelectorAll(".history-calculation img");
  deleteItemBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.removeItem(btn.parentElement.querySelector("h4").innerHTML);
      updateHistoryUI();
    });
  });
};

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    pushNumberToOutput(btn.innerHTML);
  });
});

const cactusBtn = document.querySelector("#cactus-btn");
const infinityBtn = document.querySelector("#infinity-btn");

let hasCactus = false;

cactusBtn.addEventListener("click", () => {
  hasCactus = true;
  pushNumberToOutput(cactusBtn.innerHTML);
});

let hasInfinity = false;

infinityBtn.addEventListener("click", () => {
  hasInfinity = true;
  pushNumberToOutput(infinityBtn.innerHTML);
});

const clearBtn = document.querySelector("#c-btn");
clearBtn.addEventListener("click", clearCalculator);

const plusBtn = document.querySelector("#plus");
plusBtn.addEventListener("click", () => {
  saveNum(output.innerHTML, "+");
});

const minusBtn = document.querySelector("#minus");
minusBtn.addEventListener("click", () => {
  saveNum(output.innerHTML, "-");
});

const timesBtn = document.querySelector("#times");

timesBtn.addEventListener("click", () => {
  saveNum(output.innerHTML, "×");
});

const divideBtn = document.querySelector("#divide");

divideBtn.addEventListener("click", () => {
  saveNum(output.innerHTML, "÷");
});

const calculateBtn = document.querySelector("#calculate");

calculateBtn.addEventListener("click", () => {
  output.innerHTML = calculate(hasCactus, hasInfinity);
});

const clearHistoryBtn = document.querySelector("#clear-history-btn");

clearHistoryBtn.addEventListener("click", () => {
  localStorage.clear();
  updateHistoryUI();
});
updateHistoryUI();
