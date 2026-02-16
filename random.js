       
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