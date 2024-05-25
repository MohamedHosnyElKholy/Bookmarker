// Select Element
var bookName = document.querySelector("#bookname");
var website = document.querySelector("#website");
var button = document.querySelector("button");
var boxy = document.querySelector(".box-up");
var cloth = document.querySelector(".fa-xmark");
var search = document.querySelector("#search");
var submits = document.querySelector(".submits");
// Set Array Empty
var arr = [];
//  Test Local Storage
if (localStorage.getItem("product")) {
  arr = JSON.parse(localStorage.getItem("product"));
  showBookmarker();
}
// Function Add And Click
button.addEventListener("click", function (e) {
  // Take Data With User
  var dataUser = {
    name: bookName.value,
    website: website.value,
  };
  e.preventDefault();
  // if input empty alert message
  if (bookName.value == "" || website.value == "") {
    boxy.classList.replace("d-none", "d-block");
  } else {
    arr.push(dataUser);
  }
  // Set Local Storage
  localStorage.setItem("product", JSON.stringify(arr));
  showBookmarker();
  clear();
});
// event preventDefault submit
submits.addEventListener("click", function (e) {
  e.preventDefault();
});
// Function ShowData
function showBookmarker() {
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    container += `
    <tr>
    <td>${i + 1}</td>
    <td>${arr[i].name}</td>
    <td>
    <button class="btn visit" onclick="visitWebsite('${arr[i].website}')">
    <i class="fa-solid fa-eye pe-2"></i>
    Visit
    </button>
  </td>
  <td>
  <button class="btn btn-info" onclick="updateBookmarker(${i})">
  <i class="fa-solid fa-pen-to-square"></i>
  Update
</button>
</td>
    <td><button class="btn del" onclick="deleteBookmarker(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button></td>
</tr>
    `;
  }
  document.querySelector(".tbody").innerHTML = container;
}
// Function Delete
function deleteBookmarker(index) {
  arr.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(arr));
  showBookmarker();
}
// click in cloth
function clothes() {
  boxy.classList.replace("d-block", "d-none");
}
cloth.addEventListener("click", clothes);
//
// function visitWebsite() {}
function visitWebsite(url) {
  window.open(url);
}
// Clear
function clear() {
  bookName.value = "";
  website.value = "";
}
// Validation
function validation(element) {
  var regex = {
    bookname: /^[a-zA-Z0-9]{3,}$/,
    website:
      /^(https:\/\/|http:\/\/|www\.)[a-zA-Z0-9]+(\.com|\.net|\.org|\.co.uk)$/,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
// Function Search
function searchBookmarker() {
  var term = search.value;
  var container = "";
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name.includes(term)) {
      container += `
      <tr>
      <td>${i + 1}</td>
      <td>${arr[i].name}</td>
      <td>
      <button class="btn visit" onclick="visitWebsite('${arr[i].website}')">
      <i class="fa-solid fa-eye pe-2"></i>
      Visit
      </button>
    </td>
    <td>
    <button class="btn btn-info" onclick="updateBookmarker(${i})">
    <i class="fa-solid fa-pen-to-square"></i>
    Update
  </button>
    </td>
      <td><button class="btn del" onclick="deleteBookmarker(${i})">
              <i class="fa-solid fa-trash-can"></i>
              Delete
          </button></td>
  </tr>
      `;
    }
  }
  document.querySelector(".tbody").innerHTML = container;
}
// Function Update
function updateBookmarker(index) {
  bookName.value = arr[index].name;
  website.value = arr[index].website;
  submits.innerHTML = `<button class="px-5 btn btn-danger" onclick="edit(${index})">Edit</button>
  `;
}
// Function edit
function edit(index) {
  arr[index].name = bookName.value;
  arr[index].website = website.value;
  localStorage.setItem("product", JSON.stringify(arr));
  submits.innerHTML = `<button class="px-5 btn sum">Submit</button>`;
  showBookmarker();
  clear();
}
// When click in keyword remove popup
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    clothes();
  }
});
