

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.buttons-container button');
const previousDisplay = document.querySelector('.previous-operand');

let lastInput = '';
let allInputs = ['0']; 

const operators = ['+', '×', '÷', '%','='];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const funcBtns = ['AC', '⌫'];
const plusMinusBtn = '±';
const decimal = ".";
const negativeSign = "-"
const plusSign = "+";
const zero = '0';

let currentNumber = '';
let tokens = [];
let result = null;
let equalsPressed = false;

let isDragging = false;





// functions


function enableDragScroll(el) {
    let startX = 0;
    let startScroll = 0;

    el.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX;
        startScroll = el.scrollLeft;
        el.style.cursor = 'grabbing';
    });

    el.addEventListener('mouseup', () => {
        isDragging = false;
        el.style.cursor = 'grab';
    });

    el.addEventListener('mouseleave', () => {
        isDragging = false;
        el.style.cursor = 'grab';
    });

    el.addEventListener('mousemove', e => {
        if (!isDragging) return;
        e.preventDefault();
        el.scrollLeft = startScroll - (e.pageX - startX);
    });
}

function scrollToEnd() {
    if (isDragging) return;
    const el = document.querySelector('.current-operand');
    el.scrollLeft = el.scrollWidth;
    previousDisplay.scrollLeft = previousDisplay.scrollWidth;   
}


enableDragScroll(document.querySelector('.current-operand'));
enableDragScroll(document.querySelector('.previous-operand'));


function adjustFontSize() {
    const current = document.querySelector('.current-operand');
    const container = current.parentElement; // display-container
    const minFont = 47; // minimum font size
    const maxFont = 60; // original font size

    // start from current font size
    let fontSize = parseFloat(getComputedStyle(current).fontSize);

    // SHRINK only if text is overflowing
    while (current.scrollWidth > container.clientWidth && fontSize > minFont) {
        fontSize -= 1;
        current.style.fontSize = fontSize + 'px';
    }

    // GROW only if text is smaller than container and smaller than max
    while (current.scrollWidth <= container.clientWidth && fontSize < maxFont) {
        fontSize += 1;
        current.style.fontSize = fontSize + 'px';
        if (current.scrollWidth > container.clientWidth) {
            fontSize -= 1;
            current.style.fontSize = fontSize + 'px';
            break;
        }
    }
}


function checkResultLimits(result) {
    const MAX_DIGITS = 16;           // Max digits for large numbers
    const MIN_VALUE = 1e-9;          // Min positive value before precision issues

    // Handle extremely large numbers
    if (Math.abs(result) >= Math.pow(10, MAX_DIGITS)) {
        display.textContent = "Error";
       
        
        equalsPressed = true;
        return true; // signal that evaluation should stop
    }

    // Handle extremely small numbers (except zero)
    if (Math.abs(result) > 0 && Math.abs(result) < MIN_VALUE) {
        display.textContent = "Error";
        
        
        return true; // stop further processing
    }

    return false; // result is safe to continue
}






function isBinaryMinus(index){
    return(
        allInputs[index] === negativeSign &&
        index > 0 &&
        !operators.includes(allInputs[index - 1])
    );
}
// returns true if the minus is an operator and not a negative sign




function getCurrentNumberStartIndex(){

      if (allInputs.length === 1) {
         return 0;
      }
     // If allInputs contains only the result, the current number starts at index 0



    for (let i = allInputs.length - 1; i >= 0; i --){

        if (allInputs[i] === negativeSign &&
            (i === 0 || operators.includes(allInputs[i - 1]))) 
            {
            return i;
        }
        if (isBinaryMinus(i)){
            return i + 1;
        }


        if (operators.includes(allInputs[i])){
            return i + 1;
        }

        

    }
    return 0;
}

// counting from the end, 
// if the current index is a negative sign, return that index
// if the current index is an operator
// return the index after the operator,
// if the current index is a minus, return  i  + 1 like an operator
// if no operators, return 0






function isStartingNewNum(){
    if (allInputs.length === 1 && allInputs[0] === zero) return true;

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







 function preventLeadingZeros(){


    start = getCurrentNumberStartIndex();


    if (display.textContent === zero || 

        (allInputs[start] === zero) && allInputs[start +1] !== decimal ||

        (allInputs[start] === negativeSign) && allInputs[start + 1] === zero &&
        
        allInputs[start + 2] !== decimal){

        display.textContent = display.textContent.slice(0, -1);
        allInputs.pop()
        display.textContent += lastInput;

        allInputs.push(lastInput);
        
        return true;

    }

   return false;

    // replaces initial 0 or leading zero with first number 1-9 input, in the cases 0 or -0
 }







function reset(){
    allInputs = ['0'];
    lastInput = '';
    display.textContent = zero;
    currentNumber = '';
    tokens = [];
    equalsPressed = false;
    display.style.fontSize = '60px';
    return;
}


function formatResult(num){

    if(isNaN(num) || !isFinite(num)){
        return "Error";
    }

 
      const maxSignificantDigits = 10;

     
      if (Math.abs(num) >= 1e9 || (Math.abs(num) > 0 && Math.abs(num) <= 1e-9)) {
             return num.toExponential(5).replace("e+", "e");
       }
         // Use scientific notation for very large or very small numbers
     
            return Number(num.toPrecision(maxSignificantDigits)).toLocaleString('en-US', {
               maximumFractionDigits: 10, // Limit to 10 decimal places
               useGrouping: false,       // Disable commas in the raw result

                // Round to the maximum number of significant digits
         });



}

// formats the result to 8 significant figures, removes trailing zeros


function addCommas(inputArray) {
    let expression = inputArray.join('');

    // Only add commas to the integer parts of numbers, WITHOUT converting to Number
    return expression.replace(/-?\d+(\.\d+)?/g, function(match) {
        if (match.includes('.')) {
            const [integerPart, decimalPart] = match.split('.');
            // keep integer part as string and insert commas manually
            return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + decimalPart;
        }
        return match.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
}



function storeResultInAllInputs(result) {

        const MAX_DIGITS = 16;


        let rawResultStr = Math.abs(result) < 1e-15 ? "0" : result.toString();


        if (rawResultStr.includes("e")) {

            const digitsBeforeDecimal = Math.floor(Math.log10(Math.abs(result))) + 1;
            const precision = Math.max(MAX_DIGITS - digitsBeforeDecimal, 0);
            rawResultStr = result.toFixed(precision);
        }


        if (rawResultStr.replace("-", "").replace(".", "").length > MAX_DIGITS) {
            if (rawResultStr.includes(".")) {

                const [intPart, decPart] = rawResultStr.split(".");
                const allowedDecimals = Math.max(MAX_DIGITS - intPart.length, 0);
                rawResultStr = intPart + "." + decPart.slice(0, allowedDecimals);
            } else {

                rawResultStr = rawResultStr.slice(0, MAX_DIGITS);
            }
        }


        allInputs = rawResultStr.split("");

}



function evaluate(tokens){

    display.style.fontSize = '60px';


    for (let i = 0; i < allInputs.length; i ++){


        if (isBinaryMinus(i) || operators.includes(allInputs[i])){
            tokens.push(Number(currentNumber));
            tokens.push(allInputs[i]);
            currentNumber = '';
        }

        else{
            currentNumber += allInputs[i];
            
        }
    }

    // adds everything from all inputs into tokens, separating numbers and operators, 
    // accounting for negative signs
   


    if (currentNumber !== '') {
     tokens.push(Number(currentNumber));
     currentNumber = ''; }

     previousDisplay.textContent = addCommas(tokens);

    //  shows the result's equation in the previous display


     for (let i = 0; i < tokens.length; i ++){
      
        
        if (tokens[i] === '×' || tokens[i] === '÷' || tokens[i] === '%'){

            const a = tokens[i - 1];
            const b = tokens[i + 1];
            const operator = tokens[i];

            if (operator === '×') result = a * b;
           
            if (operator === '÷') result = a / b;

            if (operator === '%') result = a % b;
            


            tokens.splice(i - 1, 3, result);
            i--;
    }


     }


     for (let i = 0; i < tokens.length; i ++){
      
        
        if (tokens[i] === '+' || tokens[i] === negativeSign){

            const a = tokens[i - 1];
            const b = tokens[i + 1];
            const operator = tokens[i];

            if (operator === '+') result = a + b;
           
            if (operator === negativeSign) result = a - b;

            tokens.splice(i - 1, 3, result);
            i--;
    }


     } 

    //  operates on tokens according to order of operations, combines the results until one result

     const formatted = formatResult(result);

    display.textContent = addCommas([formatted]);
    adjustFontSize();
     checkResultLimits(result);
    storeResultInAllInputs(result);
    
    
    
}


function numberAfterResult(){
    if (equalsPressed){
        if (numbers.includes(lastInput)){
            allInputs = [];
            display.textContent = '';
            equalsPressed = false;
        }
        if (lastInput === decimal){
            allInputs = [zero, decimal];
            display.textContent = zero + decimal;
            equalsPressed = false;
        }
        if (lastInput === zero){
            equalsPressed = false;
            reset();
        }
        else{
            equalsPressed = false;
        }
}
 }







buttons.forEach(button => {
    button.addEventListener('click', () => {

        
            lastInput = button.textContent;

        // lastInput is the text value of the button that was clicked
         

            if (display.textContent === "Error") {
                if (button.id !== "Ac-btn") {
                    return; // ignore everything else
                }
            }

        // if error, only clear/delete works
        

        

            numberAfterResult();

        // if a number is pressed, replace the reusult 

        adjustFontSize();
        scrollToEnd();

        


        


        if (button.id === "equals-btn") {

            
            const last = allInputs[allInputs.length - 1];
            if (operators.includes(last) || last === negativeSign) {
                console.error("Invalid expression: ends with an operator or incomplete sequence.");
                return;
            }
            // Ensure the last input is not an operator or invalid sequence
            
            const hasBinaryMinusOrOperator = allInputs.some((input, index) => 
                 isBinaryMinus(index) || operators.includes(input)
                 );

              if (!hasBinaryMinusOrOperator) {
                    console.error("Invalid expression: no operators or binary minuses in the input.");
                  return;
              }
              // Check if allInputs contains no binary minuses or operators

            

            evaluate(tokens);
            console.log("all inputs after evaluation", allInputs);
            equalsPressed = true;
            tokens = [];
            currentNumber = '';
            scrollToEnd();
            return;
        }

        previousDisplay.textContent = null;

        // resets previous display when any button is clicked after =



        if (button.id === 'Ac-btn') {
           reset();
        }
        // AC button logic
        








        if (button.id === 'delete-btn') {

            
            
            if (allInputs.length === 0) {
                reset();
                return;
            }
            // prevents deleting when there is nothing to delete
            // if all inputs is empty after deletion, reset everything

            display.textContent = display.textContent.slice(0, -1);
            allInputs.pop();

            display.textContent = addCommas(allInputs);

            if (allInputs.length === 0) {
                reset();
            }
            


            return;

        }
        // delete button logic


        
        
        if (button.id === 'decimal-btn') {

            const last = allInputs[allInputs.length - 1];

            if(isStartingNewNum() && operators.includes(last) || last === negativeSign){
                allInputs.push(zero)
                allInputs.push(decimal)
                display.textContent += zero + decimal;
            }
            // if a decimal is inputed as a new number, add a zero before it



            else if (currentNumHasDecimal()){
                return;
            }

            
            
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
                
            }
            // if current num is negtive, take away the minus


            else{
                
                allInputs.splice(startIndex, 0, negativeSign)
            }
            // if current num isnt negtive, add the minus

            replaceMinusesWithPlus();
            display.textContent = allInputs.join('');
            display.textContent = addCommas(allInputs);

            // make the display match all inputs
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
            display.textContent = addCommas(allInputs);
            
        }
        
     

        // operators logic
        

         
        







        if(numbers.includes(lastInput)) {
            

            if (preventLeadingZeros()) return;

            start = getCurrentNumberStartIndex();
            


            if (
                lastInput === zero &&
                isStartingNewNum() &&
                allInputs[getCurrentNumberStartIndex()] === zero
            ) {
                return;
            }
            //prevents first input being 0

            

            else if (isStartingNewNum()) {
                allInputs.push(lastInput);
                display.textContent = addCommas(allInputs);
                // display.textContent += lastInput;
            }

            // after an operator, allows all numbers to be added

            else {
                allInputs.push(lastInput);
                display.textContent = addCommas(allInputs);
                // display.textContent += lastInput;
            }

            // all other number inputs
            // allInputs.push(lastInput);

        }
        // numbers logic






        adjustFontSize();
        scrollToEnd();  

        console.log("start is", getCurrentNumberStartIndex())
        console.log('Button clicked (last input):', lastInput);
        console.log('All inputs so far:', allInputs);
    });
});

