const fromElement = document.getElementById("from");
const toElement = document.getElementById("to");
const lengthInput = document.getElementById("length");
const resultElement = document.getElementById("result");
const historyElement = document.getElementById("history");
const saveButton = document.getElementById("save");
const resetButton = document.getElementById("reset");

function updateOptions() {
    const fromValue = fromElement.value;
    const toValue = toElement.value;
    const fromOptions = Array.from(fromElement.options);
    const toOptions = Array.from(toElement.options);

    fromOptions.forEach(option => {
        option.disabled = option.value === toValue;
    });

    toOptions.forEach(option => {
        option.disabled = option.value === fromValue;
    });

    saveButton.disabled = fromValue === toValue;

    if (fromElement.value === toValue) {
        toElement.value = toOptions.find(option => !option.disabled).value;
    }
}

function convertLength(event) {
    event.preventDefault();
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
        setTimeout(() => {
            historyElement.innerText = "History: ";
        }, 5000);
    } else {
        historyElement.innerText = "History: No conversions yet";
    }
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

updateOptions();
displayHistory();
