
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');

  const isHidden = mobileMenu.classList.contains('hidden');
  menuBtn.textContent = isHidden ? '☰' : '✕';
  menuBtn.setAttribute('aria-expanded', String(!isHidden));
});


const groupBtn = document.querySelector('.group_btn');
const groupInput = document.querySelector('.group_input_name');

const groupDisplay = document.createElement('p');
document.querySelector('.group_input').appendChild(groupDisplay);

let currentGroup = '';

groupBtn.addEventListener('click', function () {
  const groupName = groupInput.value.trim();

  if (groupName === '') {
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
