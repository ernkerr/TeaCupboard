const teaCharacters = {
  "green tea": "greenTea.jpg",
  green: "greenTea.jpg",
  "black tea": "blackTea.jpg",
  black: "blackTea.jpg",
  "white tea": "whiteTea.jpg",
  white: "whiteTea.jpg",
  "oolong tea": "oolongTea.jpg",
  oolong: "oolong.jpg",
  matcha: "matcha.jpg",
  chamomile: "chamomile.png",
  "english breakfast": "englishBreakfast.jpg",
  breakfast: "englishBreakfast.jpg",
  "mint": "mint.jpg",
  mint: "mint.jpg",
  "earl gray": "earlGray.jpg",
  "earl grey": "earlGray.jpg",
  earlgray: "earlGray.jpg",
  "lady gray": "ladyGray.jpg",
  ladygray: "ladyGray.jpg",
  "darjeeling": "darjeeling.jpg",
  darjeeling: "darjeeling.jpg",
  matcha: "matcha.jpg",
  "matcha tea": "matcha.jpg",
  chai: "chai.jpg",
  "chai tea": "chai.jpg",
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


// display the teas in the cupboard


// retrieve the array if it exists or create an empty one 
// access the string value from the localStorage and use the JSON.parse() method to parse the string and convert it back to an array
let myTeas = JSON.parse(localStorage.getItem("myTeas")) || [];

function displayTeas(){
  // select the cupboard section 
  const cupboard = document.querySelector(".cupboard");
  // clear the cupboard before adding items
  cupboard.innerHTML = "";

  myTeas.forEach((tea, index) => {
    // create a new div 
    const teaDiv = document.createElement("div");
    // add a css class
    teaDiv.classList.add("tea-item");
    // set its text to the tea name 
    teaDiv.textContent = tea; 

    // if a character exists append the img to the div 
    const imgsrc = teaCharacters[tea.toLowerCase().trim()] || "whiteTea.jpg";
    if (imgsrc) {
      const img = document.createElement("img");
      img.src = imgsrc;
      img.alt = tea;
      img.style.width = "100px";
      teaDiv.appendChild(img)
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
    })

    // append delete btn to the tea div 
    teaDiv.appendChild(deleteTea)
    // append it to the cupboard 
    cupboard.appendChild(teaDiv);
  })
}

// display teas when the page loads 
displayTeas();


// add a tea functionality

const SubmitNewTea = document.getElementById("SubmitNewTea");
// console.log("SubmitNewTea", SubmitNewTea)
// make sure the submitNewTea btn exists before putting an event listener on it
if (SubmitNewTea) {
  SubmitNewTea.addEventListener("click", addNewTea);
}

function addNewTea(){
  const teaName = document.getElementById("NewTea").value;
  console.log("Adding New Tea:", teaName)

  // avoid adding empty teas
  if (!teaName) return;

  // add tea to the array of teas with the push method
  myTeas.push(teaName)
  console.log("My Teas: ", myTeas)

  // convert the array into a string using JSON.stringify() method
  // & store in local storage 
  console.log("storing teas in local storage")
  localStorage.setItem("myTeas", JSON.stringify(myTeas))

  displayTeas();
 }





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