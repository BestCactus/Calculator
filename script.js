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
  currCalHistory = "";
  //TODO: make animations
};

let isColliding = false;
const saveNum = (num, operation) => {
  // Dealing with mixed operations
  if (
    numTemp.length > 0 &&
    Object.keys(numTemp[numTemp.length - 1])[0] !== operation
  ) {
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "+" &&
      operation !== "-"
    ) {
      isColliding = true;
    }
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "-" &&
      operation !== "+"
    ) {
      isColliding = true;
    }
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "×" &&
      operation !== "÷"
    ) {
      isColliding = true;
    }
    if (
      Object.keys(numTemp[numTemp.length - 1])[0] == "÷" &&
      operation !== "×"
    ) {
      isColliding = true;
    }
  }
  numTemp.push({ [operation]: parseFloat(num) });
  previousNum.innerHTML = `${num}\t${operation}`;
  output.innerHTML = "0";
  currCalHistory += `${num}\t${operation}\t`;
};

const calculate = (cactus, infinity) => {
  if (cactus && infinity) {
    previousNum.innerHTML = "🌵🌵🌵🌵🌵🌵🌵🌵🌵";
    return "🌵🌵🌵🌵🌵🌵🌵🌵🌵";
  }
  if (cactus) return "🌵🌵🌵";
  if (infinity) return "bro, it's infinite!";

  const outputNum = parseFloat(output.innerHTML);
  let priorityOperationResult = 0;
  let hasCountedOutput = false;
  if (isColliding) {
    for (let i = 0; i < numTemp.length; i++) {
      if (numTemp[i].hasOwnProperty("×")) {
        if (i === numTemp.length - 1) {
          priorityOperationResult = Object.values(numTemp[i])[0] * outputNum;
          hasCountedOutput = true;
        } else {
          priorityOperationResult =
            Object.values(numTemp[i])[0] * Object.values(numTemp[i + 1])[0];
          if (numTemp[i + 1].hasOwnProperty("+")) {
            numTemp[i + 1] = { "+": 0 };
          }
          if (numTemp[i + 1].hasOwnProperty("-")) {
            numTemp[i + 1] = { "-": 0 };
          }
        }
        if (i === 0) {
          numTemp[i] = { "+": priorityOperationResult };
          continue;
        }
        if (Object.keys(numTemp[i - 1])[0] === "-") {
          numTemp[i] = { "-": priorityOperationResult };
          continue;
        }
        numTemp[i] = { "+": priorityOperationResult };
      }
    }
  }
  let result = Object.values(numTemp[0])[0];
  const outputNumCheck = hasCountedOutput ? 0 : outputNum;
  console.log(numTemp);
  for (let i = 0; i < numTemp.length; i++) {
    if (numTemp[i].hasOwnProperty("+")) {
      if (i === numTemp.length - 1) {
        result += outputNumCheck;
        continue;
      }
      result += Object.values(numTemp[i + 1])[0];
    }
    if (numTemp[i].hasOwnProperty("-")) {
      if (i === numTemp.length - 1) {
        result -= outputNumCheck;
        continue;
      }
      result -= Object.values(numTemp[i + 1])[0];
    }
    if (numTemp[i].hasOwnProperty("×")) {
      if (i === numTemp.length - 1) {
        result *= outputNumCheck;
        continue;
      }
      result *= Object.values(numTemp[i + 1])[0];
    }
    if (numTemp[i].hasOwnProperty("÷")) {
      if (i === numTemp.length - 1) {
        result /= outputNumCheck;
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
      <p>Cmon, calculate something...</p>
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
      <img src="/svg/close.svg" alt="close btn svg" />
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
