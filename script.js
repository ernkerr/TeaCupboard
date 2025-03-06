const teaCharacters = {
  "green tea": "/images/greenTea.jpg",
  green: "/images/greenTea.jpg",
  "black tea": "/images/blackTea.jpg",
  black: "/images/blackTea.jpg",
  "white tea": "/images/whiteTea.jpg",
  white: "/images/whiteTea.jpg",
  "oolong tea": "/images/oolong.jpg",
  oolong: "/images/oolong.jpg",
  "chamomile tea": "/images/chamomile.png",
  chamomile: "/images/chamomile.png",
  "english breakfast": "/images/englishBreakfast.jpg",
  breakfast: "/images/englishBreakfast.jpg",
  peppermint: "/images/mint.jpg",
  "mint tea": "/images/mint.jpg",
  mint: "/images/mint.jpg",
  "earl gray": "/images/earlGray.jpg",
  "earl grey": "/images/earlGray.jpg",
  earlgray: "/images/earlGray.jpg",
  "lady grey": "/images/ladyGray.jpg",
  "lady gray": "/images/ladyGray.jpg",
  ladygray: "/images/ladyGray.jpg",
  darjeeling: "/images/darjeeling.jpg",
  darjeeling: "/images/darjeeling.jpg",
  matcha: "/images/matcha.jpg",
  "matcha tea": "/images/matcha.jpg",
  chai: "/images/chai.jpg",
  "chai tea": "/images/chai.jpg",
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

  displayTeas();
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
