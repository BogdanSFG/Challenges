const digits = document.querySelectorAll('.digit');
const generateBtn = document.querySelector('.generate button');
const operators = document.querySelectorAll('.container-body div');
const operatorPick = document.querySelector('.operator-pick');
const result = document.querySelector('.result');


// create animation for digit containers
const appear = [
    { opacity: 0 },
    { opacity: 1 },
  ];
  
const appearTiming = {
duration: 1000,
iterations: 1,
};

// Define the function
function randomDigit() {
    let random = Math.floor(Math.random() * 10)+1;
    operatorPick.innerHTML = ""
    result.innerHTML = "";
    return random;
}
// Add random numbers in those two windows
for(let digit of digits) {
    digit.innerHTML = randomDigit();
}

// Generate two random numbers whenever the Generate Button is pressed
generateBtn.addEventListener('click', ()=> {       
    for(let digit of digits) {
        digit.innerHTML = randomDigit();
        digit.animate(appear,appearTiming)
    }
})

// add event listeners for every operator 
for(let operator of operators) {
    operator.addEventListener('click', ()=> {
        operatorPick.innerHTML = operator.innerHTML;

        let equation = `${digits[0].innerHTML}${operatorPick.innerHTML}${digits[1].innerHTML}`
        let equationResult = eval(equation)
        result.innerHTML = equationResult;
    })
}