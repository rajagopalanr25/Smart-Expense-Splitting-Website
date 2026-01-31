
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
const paidByDropdown = document.getElementById("paidBy");

let members = JSON.parse(localStorage.getItem("m_list")) || [];

function loadMembersDropdown() {
   
    paidByDropdown.innerHTML = `<option value="">Select who paid</option>`;

    members.forEach(member => {
        let option = document.createElement("option");
        option.value = member.name;
        option.textContent = member.name;
        paidByDropdown.appendChild(option);
    });
}
loadMembersDropdown();

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

document.getElementById("expenseForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let paidBy = document.getElementById("paidBy").value;
    let date = document.getElementById("date").value;
    let notes = document.getElementById("notes").value;

    if (description === "" || amount === "" || paidBy === "") {
        alert("Please fill all required fields.");
        return;
    }

    let newExpense = {
        description: description,
        amount: Number(amount),
        paidBy: paidBy,
        date: date,
        notes: notes,
        id: Date.now()
    };

    expenses.push(newExpense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("expenseForm").reset();

    alert("Expense Added Successfully!");
});

