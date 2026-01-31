
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
const groupBtn = document.querySelector('.group_btn');
const groupInput = document.querySelector('.group_input_name');
const totalMembersCard = document.querySelector('.card:nth-child(1) p');
const groupDisplay = document.createElement('p');

document.querySelector('.group_input').appendChild(groupDisplay);
let currentGroup = '';
let members = [];

groupBtn.addEventListener('click', function () {
    const groupName = groupInput.value.trim();
    if (groupName == '') {
        alert('Please enter a group name!');
        return;
    }
    currentGroup = groupName;
    alert(`Group "${groupName}" saved!`);
    groupDisplay.textContent = `Current Group: ${currentGroup}`;
    groupDisplay.style.fontWeight = '600';
    groupDisplay.style.marginTop = '8px';
    groupDisplay.style.color = 'black';
    groupInput.value = '';
});

function addMember(name) {
    if (name.trim() == '') return;
    members.push(name.trim());
    totalMembersCard.textContent = members.length;
}

