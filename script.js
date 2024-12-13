const fromElement = document.getElementById("from");
const toElement = document.getElementById("to");
const temperatureInput = document.getElementById("temp1");

function convertTemperature(event) {
    event.preventDefault();
    const from = fromElement.value;
    const to = toElement.value;
    const temperature = parseFloat(temperatureInput.value);

    if (isNaN(temperature)) {
        document.getElementById('result').innerText = "Invalid temperature value";
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
        document.getElementById('result').innerText = `Resultant Temperature: ${result.toFixed(2)}`;
    }
}

fromElement.addEventListener("change", convertTemperature);
toElement.addEventListener("change", convertTemperature);
temperatureInput.addEventListener("input", convertTemperature);
