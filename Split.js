const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');


const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {

    mobileMenu.classList.toggle('hidden');

    if (mobileMenu.classList.contains('hidden')) {
        menuBtn.textContent = '☰';
    } else {
        menuBtn.textContent = '✕';
    }
});

let equalTab = document.getElementById("equalTab");
let customTab = document.getElementById("customTab");

let equalContent = document.getElementById("equalContent");
let customContent = document.getElementById("customContent");

let equalAmount = document.getElementById("equalAmount");
let equalResult = document.getElementById("equalResult");

let customAmount = document.getElementById("customAmount");
let customInputs = document.getElementById("customInputs");
let customResult = document.getElementById("customResult");

let members = JSON.parse(localStorage.getItem("m_list")) || [];


equalTab.addEventListener("click", function () {
  equalContent.style.display = "block";
  customContent.style.display = "none";
  equalTab.classList.add("activeTab");
  customTab.classList.remove("activeTab");
});

customTab.addEventListener("click", function () {
  customContent.style.display = "block";
  equalContent.style.display = "none";
  customTab.classList.add("activeTab");
  equalTab.classList.remove("activeTab");

  showCustomInputs(); 
});


equalAmount.addEventListener("input", function () {
  let amount = Number(equalAmount.value);

  if (amount > 0 && members.length > 0) {
    let eachPay = (amount / members.length).toFixed(2);

    equalResult.innerHTML = `
      Total Members: ${members.length}<br>
      Each member pays: <b>₹${eachPay}</b>
    `;
  } else {
    equalResult.innerHTML = "";
  }
});


function showCustomInputs() {
  customInputs.innerHTML = ""; 

  members.forEach(memberObj => {

    let div = document.createElement("div");
    div.className = "mt-3";

    div.innerHTML = `
      <label class="block font-semibold mb-1">${memberObj.name}</label>
      <input type="number" 
             class="p-3 w-full border-2 border-black rounded-xl customMemberAmount"
             placeholder="Enter amount for ${memberObj.name}">
    `;

    customInputs.appendChild(div);
  });
}

customAmount.addEventListener("input", calculateCustomSplit);
customInputs.addEventListener("input", calculateCustomSplit);

function calculateCustomSplit() {
  let total = Number(customAmount.value);

  let inputs = document.querySelectorAll(".customMemberAmount");
  let sum = 0;

  inputs.forEach(input => {
    sum += Number(input.value);
  });

  if (sum === total && total > 0) {
    customResult.style.color = "green";
    customResult.innerHTML = "✔ Split perfectly matches the total!";
  } else {
    customResult.style.color = "red";
    customResult.innerHTML = `Entered split: ₹${sum} / Total: ₹${total}`;
  }
}
