// add event listener method attaches an event handler to an element
// we can add multiple event handleres to the same elemnt (ex: two "click" events)

// the first parameter "click" is the type of event
// the second parameter is the function we want to call when the event ccurs
// third parameter is optional

// create new cupboard

// retrieve name from user
const createBtn = document.getElementById("createBtn");
// make sure the create btn exists before putting an event listener on it
if (createBtn) {
  addEventListener("click", createCupboard);
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
  // get name from local storage
  const cupboardName = localStorage.getItem("cupboardName");

  // set cupboard name to the name stored locally
  document.getElementById("cupboardNameDisplay").innerText = cupboardName;
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
