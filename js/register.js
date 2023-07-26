const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");

const registerButton = document.querySelector("#registerButton");
let registeredUsers = [];

const nameRegex = /[A-Z][a-z]{2,}/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex = /\w{6,}/;

if (loadFromLocalStorage() != null) {
  registeredUsers = loadFromLocalStorage();
}
registerButton.addEventListener("click", function () {
  if (!validateRegisterForm()) {
    return;
  }
  let user = {
    name: nameInput.value,
    email: emailInput.value.toLowerCase(),
    password: passwordInput.value,
  };
  registeredUsers.push(user);
  saveToLocalStorage();
  swal.fire("Success!", "You have registered ", "success");

  setTimeout(function () {
    location.href = "login.html";
  }, 1000);
});

/* helper functions */
function validateRegisterForm() {
  if (!nameRegex.test(nameInput.value)) {
    swal.fire("Name Error!", "name should be at least 3 characters and first letter should be Capital", "error");
    return false;
  } else if (!emailRegex.test(emailInput.value)) {
    swal.fire("Email Error!", "please enter valid email", "error");
    return false;
  } else if (registeredUsers.findIndex((user) => user.email == emailInput.value) > -1) {
    swal.fire("Register Error!", "user is already exist", "error");
    return false;
  } else if (!passwordRegex.test(passwordInput.value)) {
    swal.fire("Password Error!", "please enter valid email", "error");
    return false;
  }
  return true;
}

function saveToLocalStorage() {
  localStorage.setItem("users", JSON.stringify(registeredUsers));
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("users"));
}
