// Get the display and all the buttons
const display = document.querySelector('input');
const buttons = document.querySelectorAll('button');

// Variable to store the current input and the result
let currentInput = '';
let operatorPressed = false;

// Function to update the display
function updateDisplay(value) {
    display.value = value || '0';  // Default to '0' if input is empty
}

// Add event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Clear the display (AC)
        if (value === 'AC') {
            currentInput = '';
            operatorPressed = false;
            updateDisplay(currentInput);
        }
        // Delete the last digit (DEL)
        else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
        }
        // Evaluate the expression (equal button)
        else if (value === '=') {
            try {
                currentInput = eval(currentInput).toString();
                updateDisplay(currentInput);
                operatorPressed = false;
            } catch (error) {
                updateDisplay('Error');
                currentInput = '';
            }
        }
        // Handle operators and prevent consecutive operator presses
        else if (['+', '-', '*', '/', '%'].includes(value)) {
            if (!operatorPressed && currentInput.length > 0) {
                currentInput += value;
                operatorPressed = true;
            } else {
                // Prevent multiple operators in a row
                currentInput = currentInput.slice(0, -1) + value;
            }
            updateDisplay(currentInput);
        }
        // Append number or dot to the current input
        else {
            if (value === '.' && currentInput.includes('.')) {
                // Prevent multiple dots in the number
                return;
            }
            currentInput += value;
            operatorPressed = false;
            updateDisplay(currentInput);
        }
    });
});
