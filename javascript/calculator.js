const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent.trim();

    if (value === "C") {
      currentInput = "";
      display.value = "0";
    } else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput || "0";
    } else if (value === "=") {
      try {
        // Replace x and % symbols before evaluating
        let expression = currentInput.replace(/×/g, "*").replace(/−/g, "-");
        expression = expression.replace(/%/g, "/100");
        display.value = eval(expression);
        currentInput = display.value;
      } catch (err) {
        display.value = "Error";
        currentInput = "";
      }
    } else if (value.includes("x²")) {
      if (currentInput !== "") {
        currentInput = Math.pow(parseFloat(currentInput), 2).toString();
        display.value = currentInput;
      }
    } else {
      // Prevent invalid input like multiple operators in a row
      if (
        ["+", "−", "×", "/", "%"].includes(value) &&
        ["+", "−", "×", "/", "%"].includes(currentInput.slice(-1))
      ) {
        return;
      }
      currentInput += value;
      display.value = currentInput;
    }
  });
});
