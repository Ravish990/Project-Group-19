const formDetails = document.getElementsByClassName("Form")[0];
const username = document.getElementById("username");
const useremail = document.getElementById("email");
const usernumber = document.getElementById("number");
const userpass = document.getElementById("password");
const subBtn = document.getElementById("sub");
const optionsDiv = document.getElementById("options");
const goToTempConverterBtn = document.getElementById("goToTempConverter");
const goToLengthConverterBtn = document.getElementById("goToLengthConverter");

subBtn.addEventListener("click", (event) => {
    event.preventDefault();
    alert("User Registered");
    console.log("User Registered");
    formDetails.style.display = "none"; 
    optionsDiv.style.display = "block"; 
});

goToTempConverterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = 'index.html'; 
});

goToLengthConverterBtn.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = 'length.html';
});
