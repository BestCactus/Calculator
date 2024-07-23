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

numberBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    pushNumberToOutput(btn.id);
  });
});
