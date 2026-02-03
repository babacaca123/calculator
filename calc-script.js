

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.buttons-container button');
let lastInput = '';
let allInputs = []; 
let operators = ['+', '-', '×', '÷', '%','='];
let decimalAdded = false;


buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'decimal-btn') {
            if (decimalAdded) return;
            decimalAdded = true;
            
        }
        if (operators.includes(button.textContent)) {
            decimalAdded = false;
        }
        // decimals can only be added once per number
        
        
        
        // display the button text on the calculator display
          
        if (operators.includes(lastInput)) {
            if (operators.includes(allInputs[allInputs.length -1]) ) {
                display.textContent = display.textContent.slice(0, -1);
            }
        }
        // prevents entering two operators in a row

        lastInput = button.textContent;  
        allInputs.push(lastInput);
        display.textContent += lastInput;

        console.log('Button clicked (last input):', lastInput);
        console.log('All inputs so far:', allInputs);
    });
});
