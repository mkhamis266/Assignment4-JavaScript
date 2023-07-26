const siteNameInput = document.getElementById("siteNameId");
const siteURLInput = document.getElementById("siteURLId");
const tbodyElement = document.getElementById("tbodyId");
const submitButton = document.getElementById("submitButtonId");

const siteNameRegex = /[A-Z][a-z]{2,}/;
const siteURLRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*\/{0,1}$/;
let tbodyContent = "";

let bookmarks = [];
if (loadFromLocalStorage() == null) {
  tbodyContent = '<tr><td colspan="4">no data available</td></tr>';
  tbodyElement.innerHTML = tbodyContent;
} else {
  bookmarks = loadFromLocalStorage();
  renderBookmarks(bookmarks);
}

function submit() {
  if (!isFormValid()) {
    return;
  }
  const bookmark = {
    name: siteNameInput.value,
    url: siteURLInput.value,
  };

  addBookmark(bookmark);
}

function addBookmark(bookmark) {
  bookmarks.push(bookmark);
  saveToLocalStorage();
  clearForm();
  renderBookmarks(bookmarks);
  Swal.fire("Done!", "New Bookmark is added to your list!", "success");
}

function renderBookmarks(bookmarks) {
  tbodyContent = "";
  for (let i = 0; i < bookmarks.length; i++) {
    tbodyContent += `
    <tr>
      <td>${i + 1}</td>
      <td>${bookmarks[i].name}</td>
      <td>
        <button class="btn btn-success" onclick="visitUrl('${bookmarks[i].url}')"><i class="fa-solid fa-eye"></i> Visit</button>
      </td>
      <td>
        <button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
      </td>
    </tr>
    `;
  }
  tbodyElement.innerHTML = tbodyContent;
}

function deleteBookmark(bookmarkIndex) {
  bookmarks.splice(bookmarkIndex, 1);
  saveToLocalStorage();
  renderBookmarks(bookmarks);
}

/* helper functions */
function saveToLocalStorage() {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("bookmarks"));
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteURLInput.classList.remove("is-valid");
}

function isFormValid() {
  bookmarkIndex = bookmarks.findIndex(function (bookmark) {
    return bookmark.name == siteNameInput.value.trim();
  });
  if (bookmarkIndex > -1) {
    swal.fire("Sorry!", "site name is already exist", "warning");
    return false;
  }

  if (!siteNameRegex.test(siteNameInput.value.trim())) {
    swal.fire("Site Name Error!", "site name should be at least 3 characters and first letter should be Capital", "error");
    return false;
  }
  if (!siteURLRegex.test(siteURLInput.value.trim())) {
    swal.fire("Site Url Error!", "Please enter valid URL", "error");
    return false;
  }
  return true;
}

function validate(e, regex) {
  let currentRegex = regex === "siteNameRegex" ? siteNameRegex : siteURLRegex;
  let userInput = e.target.value;
  if (!currentRegex.test(userInput)) {
    e.target.classList.add("is-invalid");
  } else {
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  }
}
function visitUrl(url) {
  if (!url.startsWith("http")) {
    url = "https://www." + url;
  }
  open(url, "_blank");
}
/* attachEvents */
submitButton.addEventListener("click", submit);

siteNameInput.addEventListener("input", function (eInfo) {
  validate(eInfo, "siteNameRegex");
});

siteURLInput.addEventListener("input", function (eInfo) {
  validate(eInfo, "siteURLRegex");
});
