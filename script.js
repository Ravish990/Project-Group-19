const fromElement = document.getElementById("from");
const toElement = document.getElementById("to");
const temperatureInput = document.getElementById("temp1");
const resultElement = document.getElementById('result');
const historyElement = document.getElementById("history");
const saveButton = document.getElementById('save');

const temperatureUnits = ["celsius", "fahrenheit", "kelvin"];

function updateOptions() {
    const from = fromElement.value; 
    toElement.innerHTML = '';  

    temperatureUnits.forEach(unit => {
        if (unit !== from) {  
            const option = document.createElement("option");
            option.value = unit;
            option.textContent = unit.charAt(0).toUpperCase() + unit.slice(1);  
            toElement.appendChild(option);
        }
    });

    convertTemperature();  
}

function convertTemperature(event) {
    if (event) event.preventDefault();  
    
    const from = fromElement.value;
    const to = toElement.value;
    const temperature = parseFloat(temperatureInput.value);

    if (isNaN(temperature)) {
        resultElement.innerText = "Enter the Temperature";
        return;
    }

    let result;
    if (from === "celsius") {
        if (to === "fahrenheit") {
            result = (temperature * 9 / 5) + 32;
        } else if (to === "kelvin") {
            result = temperature + 273.15;
        }
    } else if (from === "fahrenheit") {
        if (to === "celsius") {
            result = (temperature - 32) * 5 / 9;
        } else if (to === "kelvin") {
            result = (temperature - 32) * 5 / 9 + 273.15;
        }
    } else if (from === "kelvin") {
        if (to === "celsius") {
            result = temperature - 273.15;
        } else if (to === "fahrenheit") {
            result = (temperature - 273.15) * 9 / 5 + 32;
        }
    }

    resultElement.innerText = `Resultant Temperature: ${result.toFixed(2)}`;
    saveButton.disabled = from === to;  
}

function saveHistory() {
    const result = resultElement.innerText;
    if (result && result !== "Resultant Temperature") {
        let history = JSON.parse(localStorage.getItem("temperatureHistory")) || [];
        
        if (history.length >= 5) {
            history.pop();
        }
        
        history.unshift(result);  
        localStorage.setItem("temperatureHistory", JSON.stringify(history));
        displayHistory();
    }
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem("temperatureHistory")) || [];
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
    fromElement.value = 'celsius';
    toElement.value = 'fahrenheit';
    temperatureInput.value = '';
    resultElement.innerText = 'Resultant Temperature';
    saveButton.disabled = true;
    updateOptions();
}

function validateTemperatureInput(event) {
    const value = event.target.value;
    const validInput = /^-?\d*\.?\d*$/;
    if (!validInput.test(value)) {
        resultElement.innerText = "Please enter a valid number";
        temperatureInput.value = value.slice(0, -1);  
    } else {
        resultElement.innerText = "";
    }
}

fromElement.addEventListener("change", updateOptions);
toElement.addEventListener("change", convertTemperature);
temperatureInput.addEventListener("input", validateTemperatureInput);
temperatureInput.addEventListener("input", convertTemperature);
saveButton.addEventListener("click", saveHistory);

const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", resetFields);

updateOptions();
