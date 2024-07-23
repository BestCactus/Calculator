//TODO: Make history with localStorage with button for deleting

const numberBtn = document.querySelectorAll(".number-btn");
const output = document.querySelector("#result");

const pushNumberToOutput = (num) => {
  let array = [];
  if (output.innerHTML) {
    array = output.innerHTML.split("");
  }
  if (output.innerHTML.length > 10) return;
  array.push(num);
  output.textContent = array.join("");
};

const clearCalculator = () => {
  output.innerHTML = "";
  //TODO: remove numbers from memory
  //TODO: make animations
};

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    pushNumberToOutput(btn.innerHTML);
  });
});

const cactusBtn = document.querySelector("#cactus-btn");
const infinityBtn = document.querySelector("#infinity-btn");

cactusBtn.addEventListener("click", () => {
  pushNumberToOutput(cactusBtn.innerHTML);
});

infinityBtn.addEventListener("click", () => {
  pushNumberToOutput(infinityBtn.innerHTML);
});
const clearBtn = document.querySelector("#c-btn");

clearBtn.addEventListener("click", clearCalculator);
