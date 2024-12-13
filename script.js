const fromElement = document.getElementById("from");
const toElement = document.getElementById("to");
const temperatureInput = document.getElementById("temp1");
const resultElement = document.getElementById('result');

function convertTemperature(event) {
    event.preventDefault();
    const from = fromElement.value;
    const to = toElement.value;
    const temperature = parseFloat(temperatureInput.value);

    if (isNaN(temperature)) {
        resultElement.innerText = "Invalid temperature value";
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

    if (from === to) {
        result = temperature;
    }

    if (result !== undefined) {
        resultElement.innerText = `Resultant Temperature: ${result.toFixed(2)}`;
    }
}

function resetFields() {
    fromElement.value = 'celsius';
    toElement.value = 'celsius';
    temperatureInput.value = '';
    resultElement.innerText = '';
}

fromElement.addEventListener("change", convertTemperature);
toElement.addEventListener("change", convertTemperature);
temperatureInput.addEventListener("input", convertTemperature);

const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", resetFields);
