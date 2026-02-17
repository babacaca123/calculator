

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.buttons-container button');

let lastInput = '';
let allInputs = []; 
const operators = ['+', '×', '÷', '%','='];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const funcBtns = ['AC', '⌫'];
const plusMinusBtn = '±';
const decimal = ".";
const negativeSign = "-"
const plusSign = "+";
const zero = '0';
let isStartingNum = true;
let notNegative = true;
let firstIntIndexes = [];



    

let decimalAdded = false;


buttons.forEach(button => {
    button.addEventListener('click', () => {


        function getCurrentNumberStartIndex(){

            for (let i = allInputs.length - 1; i >= 0; i --){

                if (allInputs[i] === negativeSign){

                    if (numbers.includes(allInputs[i -1])){
                        return i + 1;
                    }
                }
                if (operators.includes(allInputs[i])){
                    return i + 1;
                }

            }
            return 0;
        }

        // counting from the end, if the current index is an operator or minus (minus with a number before it)
        // return the index after the operator,
        // if no operators, return 0



        function isStartingNewNum(){
            if (allInputs.length === 0) return true;

            const start = getCurrentNumberStartIndex();
            const current = allInputs.slice(start);

            if (current.length === 0) return true;        
            return false;
        }
        // if all inputs is 0 long or if the current number is 0 long 
        // new num is starting

        

        function currentNumHasDecimal(){
            const start = getCurrentNumberStartIndex();
            return allInputs.slice(start).includes(decimal);
        }
        function currentNumIsNegative(){
            const start = getCurrentNumberStartIndex();
            return allInputs[start] === negativeSign;
        }
        // if the current number includes decimal / negative sign, return true




        function replaceMinusesWithPlus(){

            for (let i = allInputs.length - 1; i >= 0; i --){

                if (allInputs[i] === negativeSign){

                    if ((allInputs[i -1]) === negativeSign){
                        
                        allInputs.splice(i -1, 2, plusSign)
                        
                        display.textContent = 
                            display.textContent.slice(0, i -1) + 
                            plusSign + 
                            display.textContent.slice(i + 1);

                        console.log(allInputs)
                    }
                }

        }
         }
        // replaces two minuses in a row with a plus


        lastInput = button.textContent; 
        // lastInput is the value of the button that was clicked

        function reset(){
            allInputs = [];
            lastInput = '';
            display.textContent = zero;
            return;
        }



        if (button.id === 'Ac-btn') {
           reset();
        }
        // AC button logic
        




        if (button.id === 'delete-btn') {

            
            
            if (allInputs.length === 0) {
                return;
            }
            // prevents deleting when there is nothing to delete

            display.textContent = display.textContent.slice(0, -1);
            allInputs.pop();


            if (allInputs.length === 0) {
                reset();
            }
            // if all inputs is empty after deletion, reset everything


            return;

        }
        // delete button logic



        
        
        if (button.id === 'decimal-btn') {

            const last = allInputs[allInputs.length - 1];

            if (currentNumHasDecimal()){
                return;
            }

            else if(isStartingNewNum()){
                allInputs.push(zero)
                allInputs.push(decimal)
                display.textContent += zero + decimal;
            }
            // if a decima
            
            else{
                display.textContent += lastInput;
                allInputs.push(lastInput);
            }


            
        }
        // decimal button logic




        
        if (lastInput === plusMinusBtn) {
           


            if(isStartingNewNum()) return;

            const startIndex = getCurrentNumberStartIndex();


            if(currentNumIsNegative()){

                allInputs.splice(startIndex, 1);

                display.textContent = 
                    display.textContent.slice(0, startIndex) + 
                    display.textContent.slice(startIndex + 1);
                
            }
            // if current num is negtive, take away the minus


            else{
                
                allInputs.splice(startIndex, 0, negativeSign)

                display.textContent = 
                    display.textContent.slice(0, startIndex) + 
                    negativeSign + 
                    display.textContent.slice(startIndex);
            }
            // if current num isnt negtive, add the minus

            replaceMinusesWithPlus();
        }
        // plus minus logic
        
        
        
        
          
        if (operators.includes(lastInput) || lastInput === negativeSign) {

            const last = allInputs[allInputs.length - 1];
            let secondLast = null;


            if (allInputs.length >= 2) {
                secondLast = allInputs[allInputs.length - 2];
            }
  

            if (last === negativeSign && operators.includes(secondLast)){
                return;
            }
            // prevents an operator replacing a negative sign


            if (operators.includes(last) || last === negativeSign ) {

                display.textContent = display.textContent.slice(0, -1);
                allInputs.pop();
                
            }

             // prevents entering two operators in a row


            display.textContent += lastInput;
            allInputs.push(lastInput);
            
        }
        
     

        // operators logic
        

         
        


        if(numbers.includes(lastInput)) {


            if (lastInput === zero && isStartingNewNum()) {
                return;
            }



            //prevents first input being 0 


            start = getCurrentNumberStartIndex();
            console.log("start is", start)


            if (display.textContent === zero || allInputs[start] === zero){

                display.textContent = display.textContent.slice(0, -1);
                allInputs.pop()
                display.textContent += lastInput;

            }

            // replaces initial 0 or leading zero with first number 1-9 input

            else if (isStartingNewNum()) {
                
                display.textContent += lastInput;
            }

            // after an operator, allows all numbers to be added

            else {
                display.textContent += lastInput;
            }

            // all other number inputs
            allInputs.push(lastInput);

        }
        // numbers logic

        if (button.id === "equals-btn"){

        }

        console.log('Button clicked (last input):', lastInput);
        console.log('All inputs so far:', allInputs);
    });
});
