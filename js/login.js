if (loadUserFromLocalStorage() != null) {
  location.href = "index.html";
}

const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");

const registeredUsers = loadAllUsersFromLocalStorage();

const loginButton = document.querySelector("#loginButton");
let logedUser = {};
loginButton.addEventListener("click", function () {
  if (!validateRegisterForm()) {
    return;
  }
  logedUser = registeredUsers.find(function (user) {
    return user.email === emailInput.value.toLowerCase();
  });

  saveUserToLocalStorage();
  swal.fire("Success!", "welcome", "success");

  setTimeout(function () {
    location.href = "index.html";
  }, 1000);
});

/* helper functions */
function validateRegisterForm() {
  userIndex = registeredUsers.findIndex(function (user) {
    return user.email === emailInput.value.toLowerCase();
  });
  if (emailInput.value.trim() == "") {
    swal.fire("Login Error!", "Please Enter Email", "error");
    return false;
  } else if (passwordInput.value.trim() == "") {
    swal.fire("Login Error!", "Please Enter Password", "error");
    return false;
  } else if (userIndex == -1) {
    swal.fire("Login Error!", "Your are not registered", "error");
    return false;
  } else if (registeredUsers[userIndex].password != passwordInput.value) {
    swal.fire("Login Error!", "incorrect password", "error");
    return false;
  }

  return true;
}

function saveUserToLocalStorage() {
  localStorage.setItem("logedUser", JSON.stringify(logedUser));
}

function loadUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem("logedUser"));
}

function loadAllUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("users"));
}
