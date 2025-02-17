const teaCharacters = {
  green: "greenTea.jpg",
  black: "blackTea.jpg",
  white: "whiteTea.jpg",
  oolong: "oolong.jpg",
  chamomile: "chamomile.png",
  english: "englishBreakfast.jpg",
  mint: "mint.jpg",
  earl: "earlGray.jpg",
  lady: "ladyGray.jpg",
  darjeeling: "darjeeling.jpg",
  matcha: "matcha.jpg",
  chai: "chai.jpg",
};

// create new cupboard
// retrieve name from user
const createBtn = document.getElementById("createBtn");
// make sure the create btn exists before putting an event listener on it
if (createBtn) {
  createBtn.addEventListener("click", createCupboard);
}

function createCupboard() {
  const cupboardName = document.getElementById("cupboardName").value;

  if (cupboardName) {
    // store the name in local storage
    localStorage.setItem("cupboardName", cupboardName);
    // navigate to new html page
    window.location.href = "newTeaCupboard.html";
  }
}

// use name in newTeaCupboard.html
// check if we're on newTeaCupboard.html before calling onPageLoad
if (window.location.pathname.includes("newTeaCupboard.html")) {
  window.addEventListener("load", onPageLoad);
}

function onPageLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  let cupboardName = urlParams.get("name"); // try getting name from the url

  if (!cupboardName) {
    // if not found in url, fall back to local storage
    cupboardName = localStorage.getItem("cupboardName"); // get name from local storage
  } else {
    // if found in the URL, store it in local storage
    localStorage.setItem("cupboardName", cupboardName);
  }

  if (cupboardName) {
    // set cupboard name on html page
    document.getElementById("cupboardNameDisplay").innerText = cupboardName;
  }

  // total characters
  // object.keys is a built-in JavaScript function it takes an object as an argument(teaCharacters)
  // it returns an array of keys "green", "white", etc.
  const totalCharacters = Object.keys(teaCharacters).length;

  if (totalCharacters) {
    document.getElementById("totalCharacters").innerText = totalCharacters;
  }

  displayTeas();
}

// display the teas in the cupboard

// retrieve the array if it exists or create an empty one
// access the string value from the localStorage and use the JSON.parse() method to parse the string and convert it back to an array
let myTeas = JSON.parse(localStorage.getItem("myTeas")) || [];

function displayTeas() {
  // select the cupboard section
  const cupboard = document.querySelector(".cupboard");
  // clear the cupboard before adding items
  cupboard.innerHTML = "";

  // count unique characters
  let charactersFound = new Set(); // a set is a built in object that stores unique values

  myTeas.forEach((tea, index) => {
    // create a new div
    const teaDiv = document.createElement("div");
    // add a css class
    teaDiv.classList.add("tea-item");
    // set its text to the tea name
    teaDiv.textContent = tea;

    // handle "mint tea" in addition to "mint"
    const firstWord = tea.toLowerCase().trim().split(" ")[0];

    // if tea exists in teaCharacters, count it
    if (teaCharacters[firstWord]) {
      charactersFound.add(firstWord);
    }

    // if a character exists append the img to the div
    const imgsrc = teaCharacters[firstWord] || "whiteTea.jpg";
    if (imgsrc) {
      const img = document.createElement("img");
      img.src = imgsrc;
      img.alt = tea;
      teaDiv.appendChild(img);
    }

    // remove tea functionality
    const deleteTea = document.createElement("button");
    deleteTea.textContent = "X"; // add an x symbol
    deleteTea.classList.add("delete-tea-btn");

    deleteTea.addEventListener("click", () => {
      // remove the clicked tea from the array
      myTeas.splice(index, 1);
      // update local storage
      localStorage.setItem("myTeas", JSON.stringify(myTeas));
      // refresh the UI
      displayTeas();
    });

    // append delete btn to the tea div
    teaDiv.appendChild(deleteTea);
    // append it to the cupboard
    cupboard.appendChild(teaDiv);
  });

  // update the character count display
  document.getElementById("numCharacters").innerText = charactersFound.size;
}

// // display teas when the page loads
// displayTeas();

// check if the enter key is pressed
const newTeaInput = document.getElementById("NewTea");

if (newTeaInput) {
  newTeaInput.addEventListener("keydown", checkEnter);
}

function checkEnter(event) {
  // check if the enter key is pressed
  if (event.key === "Enter") {
    event.preventDefault(); // prevent the default behavior of the enter key
    addNewTea();
  }
}

// add a tea functionality

const submitNewTea = document.getElementById("SubmitNewTea");

// make sure the submitNewTea btn exists before putting an event listener on it
if (submitNewTea) {
  submitNewTea.addEventListener("click", addNewTea);
}

function addNewTea() {
  const teaName = document.getElementById("NewTea").value;
  console.log("Adding New Tea:", teaName);

  // avoid adding empty teas
  if (!teaName) return;

  // add tea to the array of teas with the push method
  myTeas.push(teaName);
  console.log("My Teas: ", myTeas);

  // convert the array into a string using JSON.stringify() method
  // & store in local storage
  console.log("storing teas in local storage");
  localStorage.setItem("myTeas", JSON.stringify(myTeas));

  displayTeas();

  // clear the input field after adding the tea
  document.getElementById("NewTea").value = "";
}

// share btn

const shareBtn = document.getElementById("shareBtn");
if (shareBtn) {
  shareBtn.addEventListener("click", shareCupboard);
}

function shareCupboard() {
  let cupboardName;
  // if there is a cupBoard name in local storage use it
  cupboardName = localStorage.getItem("cupboardName") || "The";

  const myTeas = JSON.parse(localStorage.getItem("myTeas")) || [];

  const shareableLink = `${
    window.location.origin
  }/newTeaCupboard.html?name=${encodeURIComponent(
    cupboardName
  )}&teas=${encodeURIComponent(JSON.stringify(myTeas))}`;

  // copy link to clipboard
  navigator.clipboard
    .writeText(shareableLink)
    .then(() => {
      alert("Shareable link copied to clipboard!");
    })
    .catch((err) => console.error("Failed to copy:", err));
}

// open modal by id
function openModal(id) {
  // makes the modal appear by adding "open" class to the modal element
  document.getElementById(id).classList.add("open");
  // add "modal-open" css class to lock scrolling on the underlying body
  document.body.classList.add("modal-open");
}

// close currently open modal
function closeModal() {
  // makes the modal dissapear by removing the "open" class
  document.querySelector(".open").classList.remove("open");
  // removes the "modal-open" class to unlock scrolling of the body
  document.body.classList.remove("modal-open");
}

// on window load a "click" event listener is added to the document
// this is so that we can close the modal on a background click
window.addEventListener("load", function () {
  // close modals on background click
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal();
    }
  });
});

// const teas = [
//   "Black Tea",
//   "White Tea",
//   "Green Tea",
//   "English Breakfast",
//   "Chamomile",
//   "Mint",
//   "Oolong",
//   "Earl Grey",
//   "Lady Grey",
//   "Darjeeling",
//   "Matcha",
//   "Chai",
// ];

// add event listener method attaches an event handler to an element
// we can add multiple event handleres to the same elemnt (ex: two "click" events)

// the first parameter "click" is the type of event
// the second parameter is the function we want to call when the event ccurs
// third parameter is optional
