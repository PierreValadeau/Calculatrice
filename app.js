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