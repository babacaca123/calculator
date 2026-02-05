

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.buttons-container button');
let lastInput = '';
let allInputs = []; 
let operators = ['+', '-', '×', '÷', '%','='];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let funcBtns = ['AC', '⌫'];
let plusMinusBtn = '±';
let isStartingNum = true;
let notNegative = true;
let firstIntIndexes = [];
    

let decimalAdded = false;


buttons.forEach(button => {
    button.addEventListener('click', () => {


        lastInput = button.textContent; 
        // lastInput is the value of the button that was clicked

        function reset(){
            allInputs = [];
            lastInput = '';
            display.textContent = '0';
            isStartingNum = true;
            decimalAdded = false;
            firstIntIndexes = [];
            return;
        }

        if (button.id === 'Ac-btn') {
           reset();
        }
        // AC button logic
        




        if (button.id === 'delete-btn') {


            if (operators.includes(allInputs[allInputs.length -1])) {
                isStartingNum = false;
            }
            // if last displayed that was deleted is an operator, set isStartingNum to true

            
            
            if (allInputs.length === 0) {
                return;
            }
            // prevents deleting when there is nothing to delete

            display.textContent = display.textContent.slice(0, -1);
            allInputs.pop();


            if (!allInputs[firstIntIndexes[firstIntIndexes.length -1]]){
                firstIntIndexes.pop(firstIntIndexes[firstIntIndexes.length -1]);

            }


            if (!allInputs.includes('.')) {
                decimalAdded = false;

            }
            // if decimal was deleted, allow adding another decimal

            if (allInputs.length === 0) {
                reset();
            }
            // if all inputs is empty after deletion, reset everything


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



        
        if (lastInput === plusMinusBtn) {
            
                if (notNegative && !isStartingNum) {
                    if(!allInputs.some(input => operators.includes(input))){
                        display.textContent = "-" + display.textContent;
                        allInputs.unshift("-");
                        notNegative = !notNegative;
                    }
                if (notNegative){
                        display.textContent = display.textContent.slice(0, firstIntIndexes[firstIntIndexes.length -1]) + "-" + display.textContent.slice(firstIntIndexes[firstIntIndexes.length -1]);
                        allInputs.splice(firstIntIndexes[firstIntIndexes.length -1], 0,"-")
                        notNegative = !notNegative;
                    }
                }
                if(!notNegative){

                }

            }

        
        
        
        
          
        if (operators.includes(lastInput)) {

            isStartingNum = true;

            if (operators.includes(allInputs[allInputs.length -1]) ) {

                display.textContent = display.textContent.slice(0, -1);
                allInputs.pop();
                
            }
            display.textContent += lastInput;
            allInputs.push(lastInput);
            // prevents number input after operator input
        }
        
        // prevents entering two operators in a row

        // operators logic
        

         
        


        if(numbers.includes(lastInput)) {
            if (lastInput === '0' && isStartingNum) {
                return;
            }

            allInputs.push(lastInput);

            //prevents first input being 0 

            if (display.textContent === '0'){
                display.textContent = lastInput;
                isStartingNum = false;
                firstIntIndexes.push(allInputs.length -1);
            }

            // replaces initial 0 with first number 1-9 input

            else if (isStartingNum) {
                
                display.textContent += lastInput;
                isStartingNum = false;
                firstIntIndexes.push(allInputs.length -1);  
            }

            // after an operator, allows all numbers to be added

            else {
                display.textContent += lastInput;
            }

            // all other number inputs

            


        }
        // numbers logic


        // ADD IF RESULT IS NEGATIVE , is NEGATIVE = TRUE !!MUST BE BEFORE +- LOGIC
        // add if any num button is pressed, decimal or plusminus, ac -> C


        console.log('Button clicked (last input):', lastInput);
        console.log('All inputs so far:', allInputs);
        console.log("all first int indexes ", firstIntIndexes);
    });
});
