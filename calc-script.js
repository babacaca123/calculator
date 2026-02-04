

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
            
        }



        // decimal button logic
        
        if (button.id === 'decimal-btn') {
            if (decimalAdded) return;
            display.textContent += lastInput;
            decimalAdded = true;
            isStartingNum = false;
            
        }





        if (operators.includes(lastInput)) {
            decimalAdded = false;
        }
        // decimals can only be added once per number
        
        
        
        // display the button text on the calculator display
          
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
            if (display.textContent === '0'){
                display.textContent = lastInput;
                isStartingNum = false;
            }
            else if (isStartingNum) {
                display.textContent += lastInput;
                isStartingNum = false;
            }
            else {
                display.textContent += lastInput;
            }

            allInputs.push(lastInput);


        }




        // if (isStartingNum && lastInput === '0') {
        //     return;
        // }
        // else if (numbers.includes(lastInput) && isStartingNum && allInputs.length === 1) {
        //     isStartingNum = false;
        //     display.textContent = lastInput;
        // }
        // else if (!isStartingNum && allInputs.length > 1){
        //     display.textContent += lastInput;
        //     isStartingNum = false;
        // }
        // else if(isStartingNum && allInputs.length > 1){
        //     display.textContent += lastInput;
        //     isStartingNum = false;
        // }
        

        
            // replaces initial 0 with first number input

            // ensures that 0 can be first input if followed by an operator;

            // and after that all numbers can be added

        console.log('Button clicked (last input):', lastInput);
        console.log('All inputs so far:', allInputs);
    });
});
