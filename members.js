
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
const input = document.getElementById("memberInput");
const button = document.getElementById("addBtn");
const container = document.getElementById("membersContainer");
const countLabel = document.getElementById("memberCount");
const emptyMessage = document.getElementById("emptyState");

let members = JSON.parse(localStorage.getItem("m_list")) || [];

function showMembers() {

    container.innerHTML = ""; 

    if (members.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    countLabel.textContent = members.length + " Member" + (members.length === 1 ? "" : "s");

    members.forEach((member, index) => {

        const card = document.createElement("div");
        card.className =
            "flex items-center justify-between p-5 rounded-2xl bg-white border border-[#f0eee6] shadow-sm";

        const initials = member.name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

        card.innerHTML = `
        <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-2xl bg-[#6b8e23] text-white flex items-center justify-center font-bold">
                ${initials}
            </div>
            <span class="font-bold text-[#2f3e2e]">${member.name}</span>
        </div>

        <button onclick="removeMember(${index})" 
        class="text-[#ff4d4d] font-bold text-[0.85rem] px-[10px] py-[6px] rounded-[8px] transition-all hover:bg-[#ff4d4d] hover:text-white">
            Remove
        </button>
        `;

        container.appendChild(card); // add card to page
    });

    // Save updated list to localStorage
    localStorage.setItem("m_list", JSON.stringify(members));
}

button.addEventListener("click", () => {
    const nameValue = input.value.trim(); 

    if (nameValue === "") {
        alert("Please enter a name!");
        return;
    }

    members.push({
        name: nameValue,
        id: Date.now()
    });

    input.value = ""; 

    showMembers(); 
});

function removeMember(index) {
    members.splice(index, 1); 
    showMembers();
}

showMembers();
