

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.buttons-container button');
let lastInput = '';
let allInputs = []; 
let operators = ['+', '-', '×', '÷', '%','='];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let funcBtns = ['AC', '⌫'];
let isStartingNum = true;
    

let decimalAdded = false;


buttons.forEach(button => {
    button.addEventListener('click', () => {


        lastInput = button.textContent; 
        // lastInput is the value of the button that was clicked

        if (button.id === 'Ac-btn') {
            allInputs = [];
            lastInput = '';
            display.textContent = '0';
            isStartingNum = true;
            decimalAdded = false;
            return;
        }
        // AC button logic
        

        if (button.id === 'delete-btn') {
            
            if (allInputs.length === 0) {
                return;
            }
            // prevents deleting when there is nothing to delete

            display.textContent = display.textContent.slice(0, -1);
            allInputs.pop();

            if (!allInputs.includes('.')) {
                decimalAdded = false;

            }
            // if decimal was deleted, allow adding another decimal

            if (allInputs.length === 0) {
                allInputs = [];
                lastInput = '';
                display.textContent = '0';
                isStartingNum = true;
                return;
            }
            // if all inputs is empty after deletion, reset everything


            console.log(allInputs.length);
            if (operators.includes(allInputs[allInputs.length -1])) {
                isStartingNum = true;
            }
            // if last displayed is an operator, set isStartingNum to true

            return;

        }
        // delete button logic



        
        
        if (button.id === 'decimal-btn') {
            if (decimalAdded) return;
            display.textContent += lastInput;
            decimalAdded = true;
            isStartingNum = false;
            
        }
        // decimal button logic




        if (operators.includes(lastInput)) {
            decimalAdded = false;
        }
        // decimals can only be added once per number
        
        
        
        
          
        if (operators.includes(lastInput)) {
            console.log('Last input was an operator');
            isStartingNum = true;

            if (operators.includes(allInputs[allInputs.length -1]) ) {
                console.log('Replacing last operator with new operator');
                display.textContent = display.textContent.slice(0, -1);
                allInputs.pop();
                
            }
            display.textContent += lastInput;
            allInputs.push(lastInput);
            // prevents number input after operator input
        }
        
        // prevents entering two operators in a row

        

         
        


        if(numbers.includes(lastInput)) {
            if (lastInput === '0' && isStartingNum) {
                return;
            }

            //prevents first input being 0 

            if (display.textContent === '0'){
                display.textContent = lastInput;
                isStartingNum = false;
            }

            // replaces initial 0 with first number 1-9 input

            else if (isStartingNum) {
                display.textContent += lastInput;
                isStartingNum = false;
            }

            // after an operator, allows all numbers to be added

            else {
                display.textContent += lastInput;
            }

            // all other number inputs

            allInputs.push(lastInput);


        }
        // numbers logic



        console.log('Button clicked (last input):', lastInput);
        console.log('All inputs so far:', allInputs);
    });
});
