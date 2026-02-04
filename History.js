
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
var members = JSON.parse(localStorage.getItem("m_list")) || [];
var expenses = JSON.parse(localStorage.getItem("expenses")) || [];

var tableBody = document.querySelector("tbody");
var summaryTotal = document.getElementById("summaryTotal");
var summaryCount = document.getElementById("summaryCount");
var summaryAvg = document.getElementById("summaryAvg");


function loadExpenses() {

    if (expenses.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:20px; color:#6b705c;">
                    No expense history yet!
                </td>
            </tr>
        `;
        updateSummary();
        return;
    }

    tableBody.innerHTML = "";

    for (var i = 0; i < expenses.length; i++) {

        var exp = expenses[i];

        var row = `
            <tr class="border-b">
                <td class="px-4 py-3">${exp.date}</td>
                <td class="px-4 py-3">${exp.description}</td>
                <td class="px-4 py-3">${exp.paidBy}</td>
                <td class="px-4 py-3" style="text-align:right; font-weight:bold;">₹${exp.amount}</td>
                <td class="px-4 py-3" style="text-align:center;">${exp.splitType}</td>
                <td class="px-4 py-3" style="text-align:center;">
                    <button onclick="deleteExpense(${exp.id})" style="color:red;">🗑️</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    }

    updateSummary();
}


function updateSummary() {

    var total = 0;

    for (var i = 0; i < expenses.length; i++) {
        total += Number(expenses[i].amount);
    }

    var avg = 0;
    if (members.length > 0) {
        avg = total / members.length;
    }

    summaryTotal.textContent = "₹" + total.toFixed(2);
    summaryCount.textContent = expenses.length;
    summaryAvg.textContent = "₹" + avg.toFixed(2);
}

function deleteExpense(id) {

    var newList = [];

    for (var i = 0; i < expenses.length; i++) {
        if (expenses[i].id !== id) {
            newList.push(expenses[i]);
        }
    }

    expenses = newList;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    loadExpenses();
}

loadExpenses();
