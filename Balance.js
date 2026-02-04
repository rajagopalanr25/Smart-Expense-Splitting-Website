
let members = JSON.parse(localStorage.getItem("m_list")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];


let balance = {};

members.forEach(member => {
    balance[member.name] = 0;
});


let totalAmount = 0;

expenses.forEach(exp => {
    totalAmount = totalAmount + exp.amount;
});


let eachShare = 0;

if (members.length > 0) {
    eachShare = totalAmount / members.length;
}


expenses.forEach(exp => {
    balance[exp.paidBy] = balance[exp.paidBy] + exp.amount;
});


members.forEach(member => {
    balance[member.name] = balance[member.name] - eachShare;
});


let individualCard = document.querySelectorAll(".bg-white.rounded-3xl.shadow-lg.p-8")[0];

individualCard.innerHTML = `
<h3 class="text-xl font-semibold mb-4">Individual Balances</h3>
`;

for (let name in balance) {

    let amount = balance[name];
    let row = document.createElement("div");

    if (amount > 0) {
        row.innerHTML = `
        <p class="text-green-600 font-semibold">
        ${name} → Will receive ₹${amount.toFixed(2)}
        </p>`;
    } 
    else if (amount < 0) {
        row.innerHTML = `
        <p class="text-red-600 font-semibold">
        ${name} → Needs to pay ₹${Math.abs(amount).toFixed(2)}
        </p>`;
    } 
    else {
        row.innerHTML = `
        <p class="text-gray-500 font-semibold">
        ${name} → Settled
        </p>`;
    }

    individualCard.appendChild(row);
}


let payList = [];
let receiveList = [];

for (let name in balance) {

    if (balance[name] < 0) {
        payList.push({
            name: name,
            amount: Math.abs(balance[name])
        });
    }

    if (balance[name] > 0) {
        receiveList.push({
            name: name,
            amount: balance[name]
        });
    }
}

let settlementCard = document.querySelectorAll(".bg-white.rounded-3xl.shadow-lg.p-8")[1];

settlementCard.innerHTML = `
<h3 class="text-xl font-semibold mb-4">Settlement Details</h3>
`;

let i = 0;
let j = 0;

while (i < payList.length && j < receiveList.length) {

    let payAmount;

    if (payList[i].amount < receiveList[j].amount) {
        payAmount = payList[i].amount;
    } else {
        payAmount = receiveList[j].amount;
    }

    let row = document.createElement("p");
    row.className = "font-semibold text-[#2f3e2e]";
    row.textContent = `${payList[i].name} pays ₹${payAmount.toFixed(2)} to ${receiveList[j].name}`;

    settlementCard.appendChild(row);

    payList[i].amount = payList[i].amount - payAmount;
    receiveList[j].amount = receiveList[j].amount - payAmount;

    if (payList[i].amount === 0) i++;
    if (receiveList[j].amount === 0) j++;
}

if (payList.length === 0 && receiveList.length === 0) {
    settlementCard.innerHTML += `<p class="text-gray-500">Everyone is settled 🎉</p>`;
}
