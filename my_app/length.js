const fromElement = document.getElementById("from");
const toElement = document.getElementById("to");
const lengthInput = document.getElementById("length");
const resultElement = document.getElementById("result");
const historyElement = document.getElementById("history");
const saveButton = document.getElementById("save");
const resetButton = document.getElementById("reset");
const swapButton = document.getElementById("swap");

const temperatureUnits = ["meter", "centimeter", "kilometer"];

function updateOptions() {
    const from = fromElement.value; 
    toElement.innerHTML = '';  

    temperatureUnits.forEach(unit => {
        const option = document.createElement("option");
        option.value = unit;
        option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);  
        if (unit === from) {
            option.disabled = true; // Disable the same unit in the "to" selector
        }
        toElement.appendChild(option);
    });

    convertLength();  
}

function swapUnits() {
    const fromValue = fromElement.value;
    const toValue = toElement.value;
    fromElement.value = toValue;
    updateOptions();
    toElement.value = fromValue;
}

function convertLength(event) {
    if (event) event.preventDefault();
    const from = fromElement.value;
    const to = toElement.value;
    const length = parseFloat(lengthInput.value);

    if (isNaN(length)) {
        resultElement.innerText = "Enter a valid length";
        return;
    }

    let result;
    if (from === "meter") {
        if (to === "centimeter") {
            result = length * 100;
        } else if (to === "kilometer") {
            result = length / 1000;
        }
    } else if (from === "centimeter") {
        if (to === "meter") {
            result = length / 100;
        } else if (to === "kilometer") {
            result = length / 100000;
        }
    } else if (from === "kilometer") {
        if (to === "meter") {
            result = length * 1000;
        } else if (to === "centimeter") {
            result = length * 100000;
        }
    }

    resultElement.innerText = `Resultant Length: ${result.toFixed(2)}`;
    saveButton.disabled = false;
}

function saveHistory() {
    const result = resultElement.innerText;
    if (result && result !== "Resultant Length") {
        let history = JSON.parse(localStorage.getItem("lengthHistory")) || [];

        if (history.length >= 5) {
            history.pop();
        }

        history.unshift(result);
        localStorage.setItem("lengthHistory", JSON.stringify(history));
        displayHistory();
    }
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem("lengthHistory")) || [];
    if (history.length > 0) {
        historyElement.innerHTML = `History: <br/>${history.join('<br/>')}`;
        historyElement.style.display = "block"; 
    } else {
        historyElement.innerText = "History: No conversions yet";
        historyElement.style.display = "block"; 
    }

    
    setTimeout(() => {
        historyElement.style.display = "none";
    }, 5000); 
}

function resetFields() {
    fromElement.value = 'meter';
    toElement.value = 'centimeter';
    lengthInput.value = '';
    resultElement.innerText = 'Resultant Length';
    saveButton.disabled = true;
    updateOptions();
}

function validateLengthInput(event) {
    const value = event.target.value;
    const validInput = /^-?\d*\.?\d*$/;
    if (!validInput.test(value)) {
        resultElement.innerText = "Please enter a valid number";
        lengthInput.value = value.slice(0, -1);
    } else {
        resultElement.innerText = "";
    }
}

fromElement.addEventListener("change", updateOptions);
toElement.addEventListener("change", updateOptions);
lengthInput.addEventListener("input", validateLengthInput);
lengthInput.addEventListener("input", convertLength);
saveButton.addEventListener("click", saveHistory);
resetButton.addEventListener("click", resetFields);
swapButton.addEventListener("click", swapUnits);

updateOptions();
