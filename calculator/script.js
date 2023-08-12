const screen = document.querySelector("#screen");
const buttonsContainer = document.getElementById("buttonsContainer");
const buttonValues = [
    "(", ")", "%", "AC",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
];

let currentInput = "";
let resultDisplayed = false;


buttonValues.forEach(value => {
    const button = document.createElement("button");
    button.textContent = value;
    button.className = "buttons";

    if (value === "=") {
        button.id = "butr";
    }

    button.addEventListener("click", function () {
        handleButtonClick(value);
    });

    buttonsContainer.appendChild(button);
});

function handleButtonClick(value) {
    if (value === "=") {
        calculateResult();
    } else if (value === "AC") {
        screen.textContent = "";
        resultDisplayed = true;
    } else {
        if (resultDisplayed) {
            currentInput = "";
            resultDisplayed = false;
        }
        currentInput += value;
        screen.textContent = currentInput;
    }
}

function calculateResult() {
    try {
        // Attempt to evaluate the expression stored in currentInput
        const result = eval(currentInput);

        screen.textContent = result;

        // Update currentInput with the result for potential further calculations
        currentInput = result.toString();

        resultDisplayed = true;
    } catch (error) {
        screen.textContent = "Error";

        currentInput = "";

        resultDisplayed = true;
    }
}

// Attach the "keydown" event listener to the entire document
document.addEventListener("keydown", (event) => {
    const key = event.key;
    // console.log(key)
    if (/[0-9.+\-*/]/.test(key)) {
        handleButtonClick(key);
    } else if (key === "Enter") {
        calculateResult();
    }else if(key === "Backspace"){
        screen.textContent = "";
        resultDisplayed = true;
    }
});





