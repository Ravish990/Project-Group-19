const firstdropdownElement = document.getElementById("firstdropdown");
const seconddropdownElement = document.getElementById("seconddropdown");
const temperatureInput = document.getElementById("temp1");
const resultElement = document.getElementById('result');
const historyElement = document.getElementById("history");

function updateOptions() {
    const fromValue = firstdropdownElement.value;
    const toValue = seconddropdownElement.value;
    const fromOptions = Array.from(firstdropdownElement.options);
    const toOptions = Array.from(seconddropdownElement.options);

    fromOptions.forEach(option => {
        option.disabled = option.value === toValue;
    });

    toOptions.forEach(option => {
        option.disabled = option.value === fromValue;
    });
    
    if (firstdropdownElement.value === toValue) {
        seconddropdownElement.value = toOptions.find(option => !option.disabled).value;
    }
}

function convertTemperature(event) {
    event.preventDefault();
    const from = firstdropdownElement.value;
    const to = seconddropdownElement.value;
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
    saveHistory( result.toFixed(2));
}

function saveHistory( result) {
    const historyData = ` ${result}° `;
    localStorage.setItem("lastHistory", historyData); 
    displayHistory(); 

}

function displayHistory() {
    const ishistory = localStorage.getItem("lastHistory");
    if (ishistory) {
        historyElement.innerText = `History: ${ishistory}`;
    }
}

function resetFields() {
    firstdropdownElement.value = 'celsius';
    seconddropdownElement.value = 'fahrenheit';
    temperatureInput.value = '';
    resultElement.innerText = '';
    updateOptions();
}

firstdropdownElement.addEventListener("change", () => {
    updateOptions();
    convertTemperature();
});
seconddropdownElement.addEventListener("change", () => {
    updateOptions();
    convertTemperature();
});
temperatureInput.addEventListener("input", convertTemperature);

const resetButton = document.getElementById('reset');
resetButton.addEventListener("click", resetFields);
updateOptions();

