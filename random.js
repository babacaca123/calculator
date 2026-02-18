       
                // if(allInputs.slice([firstIntIndexes[firstIntIndexes.length -1]] - 1).includes(negativeSign)){
                //     notNegative = false;
                // }


const firstIndex = firstIntIndexes[firstIntIndexes.length - 1];
const beforeNumber = firstIndex - 1;

// 5--8 → 5+8
if (
    beforeNumber > 0 &&
    allInputs[beforeNumber] === '-' &&
    allInputs[beforeNumber - 1] === '-' &&
    !notNegative
) {
    // remove the two "-"
    allInputs.splice(beforeNumber - 1, 2, '+');

    // update display
    display.textContent =
        display.textContent.slice(0, beforeNumber - 1) +
        '+' +
        display.textContent.slice(beforeNumber + 1);

    // fix firstIntIndex
    firstIntIndexes[firstIntIndexes.length - 1] -= 1;

    notNegative = true;
    return;
}




            // if (!allInputs[firstIntIndexes[firstIntIndexes.length -1]]){
            //     firstIntIndexes.pop(firstIntIndexes[firstIntIndexes.length -1]);
            //     isStartingNum = true;

            // }
            // removes firstInt from the index if it doesnt exist

            
            // if (operators.includes(last)) {
                
            //     isStartingNum = false;
            //     console.log("operator deleted check this part of all inputs : ", allInputs.slice([firstIntIndexes[firstIntIndexes.length -1]],allInputs.length -2))
            //     if(allInputs[firstIntIndexes[firstIntIndexes.length -1] - 1] === "-"){
            //         notNegative = false;
            //     }
            // }   
            // if last displayed that was deleted is an operator, set isStartingNum to false 
            



            // console.log("index before first index: ", firstIntIndexes[firstIntIndexes.length -1] - 1)
            // console.log("index before latest first index: ",allInputs.slice([firstIntIndexes[firstIntIndexes.length -1]] - 1))

            // if (!allInputs.some(item => operators.includes(item)))
            // {
            //     // if there are no operators so far
            //     console.log("there are no operators in allinputs")
            //     if(allInputs.includes(decimal)){
            //         console.log("decimal ddetected")
            //         decimalAdded = true;
            //     }
            //     // check for decimal

            // }
            // else if (allInputs.some(item => operators.includes(item))){
            //     if(allInputs.slice([firstIntIndexes[firstIntIndexes.length -1]] - 1).includes(decimal)){
            //         console.log("decimal ddetected")
            //         decimalAdded = true;
            //     }
            //     // if there are operators check until the last starting number
            // }
 






            // console.log("decimal ddetected")

            // if (decimalAdded) return;
            // display.textContent += lastInput;
            // decimalAdded = true;
            // isStartingNum = false;
            // allInputs.push(lastInput);









        // if (operators.includes(lastInput)) {
        //     decimalAdded = false;
        // }

        // decimals can only be added once per number















                
                // if(!notNegative){

                    
                //     if(firstIntIndexes[firstIntIndexes.length -1] === 1){
                //         console.log("first of all inputs is ", allInputs[0])
                //         display.textContent = display.textContent.slice(1);
                //         allInputs.shift();
                //         notNegative = !notNegative;
                //         firstIntIndexes[firstIntIndexes.length -1] = firstIntIndexes[firstIntIndexes.length -1] - 1;
                //     }
                //     else{
                //         console.log("slice at " , firstIntIndexes[firstIntIndexes.length -1])
                //         display.textContent = display.textContent.slice(0, firstIntIndexes[firstIntIndexes.length -1] - 1) + display.textContent.slice(firstIntIndexes[firstIntIndexes.length -1] - 1 + 1);
                //         allInputs.splice(firstIntIndexes[firstIntIndexes.length -1] - 1, 1);
                //         firstIntIndexes[firstIntIndexes.length -1] = firstIntIndexes[firstIntIndexes.length -1] - 1;
                //         notNegative = !notNegative;
                //     }
                // }
                // else if (notNegative && !isStartingNum) {
                //     if(!allInputs.some(input => operators.includes(input))){
                //         display.textContent = "-" + display.textContent;
                //         allInputs.unshift("-");
                //         notNegative = !notNegative;
                //         firstIntIndexes[firstIntIndexes.length -1] = firstIntIndexes[firstIntIndexes.length -1] + 1;
                //     }

                // else if (notNegative){
                //         display.textContent = display.textContent.slice(0, firstIntIndexes[firstIntIndexes.length -1]) + "-" + display.textContent.slice(firstIntIndexes[firstIntIndexes.length -1]);
                //         allInputs.splice(firstIntIndexes[firstIntIndexes.length -1], 0,"-")
                //         notNegative = !notNegative;
                //         firstIntIndexes[firstIntIndexes.length -1] = firstIntIndexes[firstIntIndexes.length -1] + 1;
                //     }
            // }






            // isStartingNum = true;
            // notNegative = true;


            // || (allInputs === negativeSign)