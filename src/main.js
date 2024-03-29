 let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function clearDisplay() {
  displayValue = '0';
  firstOperand = null;
  waitingForSecondOperand = false;
  operator = null;
  updateDisplay();
}

function toggleSign() {
  displayValue = parseFloat(displayValue) * -1;
  updateDisplay();
}

function calculatePercentage() {
  displayValue = parseFloat(displayValue) / 100;
  updateDisplay();
}

function appendToDisplay(value) {
  if (waitingForSecondOperand) {
    displayValue = value.toString();
    waitingForSecondOperand = false;
  } else if (displayValue === '0') {
    displayValue = value.toString();
  } else {
    displayValue += value.toString();
  }
  updateDisplay();
}

function appendDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
  }
  updateDisplay();
}

function operate(op) {
  if (operator !== null) {
    calculate();
  }
  firstOperand = parseFloat(displayValue);
  operator = op;
  waitingForSecondOperand = true;
}

function calculate() {
  if (waitingForSecondOperand) {
    return;
  }

  const secondOperand = parseFloat(displayValue);
  let result;

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      if (secondOperand === 0) {
        alert('Division by zero error'); 
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  const tempResult = result.toString();
  displayValue = tempResult;
  updateDisplay();
  firstOperand = parseFloat(tempResult);
  waitingForSecondOperand = true;
  operator = null;
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.innerText = displayValue;
}

// Keyboard support
document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (key >= '0' && key <= '9') {
    appendToDisplay(key);
  } else if (key === '.') {
    appendDecimal();
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    operate(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
        displayValue = displayValue.slice(0, -1); // Remove last character
        if (displayValue === '') { // Reset to '0' if empty
            displayValue = '0';
        }
        updateDisplay();
    }
});

