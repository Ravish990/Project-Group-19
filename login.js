const formDetails = document.getElementsByClassName("Form")[0];
const username = document.getElementById("username");
const useremail = document.getElementById("email");
const usernumber = document.getElementById("number");
const userpass = document.getElementById("password");
const subBtn = document.getElementById("sub");

subBtn.addEventListener("click", (event) => {
    event.preventDefault();
    alert("User Registered");
    console.log("User Registered");
    window.location.href = 'index.html';
});
