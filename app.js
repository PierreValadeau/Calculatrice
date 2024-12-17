// Variables to store current state
let currentOperand = '';
let previousOperand = '';
let operator = null;

// Select the display
const display = document.getElementById('display');

// Function to update the display
function updateDisplay(value) {
  display.textContent = value || '0';
}

// Handle button clicks
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-key');
    handleInput(key);
  });
});

// Main input handler
function handleInput(key) {
  if (isNumber(key) || key === '.') {
    handleNumber(key);
  } else if (isOperator(key)) {
    handleOperator(key);
  } else if (key === '=') {
    handleEquals();
  } else if (key === 'AC') {
    clearAll();
  } else if (key === '+/-') {
    toggleSign();
  } else if (key === '%') {
    applyPercentage();
  }
}

// Handle numbers and decimals
function handleNumber(key) {
  if (key === '.' && currentOperand.includes('.')) return;
  currentOperand += key;
  updateDisplay(currentOperand);
}

// Handle operators (+, -, *, /)
function handleOperator(key) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    handleEquals();
  }
  operator = key;
  previousOperand = currentOperand;
  currentOperand = '';
}

// Perform calculation when "=" is pressed
function handleEquals() {
  if (previousOperand === '' || currentOperand === '' || !operator) return;
  const num1 = parseFloat(previousOperand);
  const num2 = parseFloat(currentOperand);

  let result;
  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num2 !== 0 ? num1 / num2 : 'Error';
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  previousOperand = '';
  operator = null;
  updateDisplay(currentOperand);
}

// Clear everything
function clearAll() {
  currentOperand = '';
  previousOperand = '';
  operator = null;
  updateDisplay('0');
}

// Toggle between positive and negative
function toggleSign() {
  if (currentOperand) {
    currentOperand = (-parseFloat(currentOperand)).toString();
    updateDisplay(currentOperand);
  }
}

// Apply percentage
function applyPercentage() {
  if (currentOperand) {
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay(currentOperand);
  }
}

// Helper functions
function isNumber(key) {
  return !isNaN(key);
}

function isOperator(key) {
  return ['+', '-', '*', '/'].includes(key);
}
