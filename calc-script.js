

const display = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.buttons-container button');
console.log(buttons);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    });
});