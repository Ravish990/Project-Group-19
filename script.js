const fromElement = document.getElementById("from");
const toElement = document.getElementById("to");
const temperatureInput = document.getElementById("temp1");
const resultElement = document.getElementById('result');

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
    
    if (fromElement.value === toValue) {
        toElement.value = toOptions.find(option => !option.disabled).value;
    }
}

function convertTemperature(event) {
    event.preventDefault();
    const from = fromElement.value;
    const to = toElement.value;
    const temperature = parseFloat(temperatureInput.value);

    if (isNaN(temperature)) {
        resultElement.innerText = "Enter the Temperature";
        return;
    }

    let result;
    if (from === "celsius") {
        if(to === "fahrenheit") {
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
        } 
        else if (to === "fahrenheit") {
            result = (temperature - 273.15) * 9 / 5 + 32;
        }
    }

    resultElement.innerText = `Resultant Temperature: ${result.toFixed(2)}`;
}

function resetFields() {
    fromElement.value = 'celsius';
    toElement.value = 'fahrenheit';
    temperatureInput.value = '';
    resultElement.innerText = '';
    updateOptions();
}

fromElement.addEventListener("change", () => {
    updateOptions();
    convertTemperature();
});
toElement.addEventListener("change", () => {
    updateOptions();
    convertTemperature();
});
temperatureInput.addEventListener("input", convertTemperature);

const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", resetFields);
updateOptions();
