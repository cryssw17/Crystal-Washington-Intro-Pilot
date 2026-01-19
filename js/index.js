//creating the footer
const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

//copyright
let today = new Date();
let thisYear = today.getFullYear();
let copyright = document.createElement('p');
copyright.innerHTML = `\u00A9 Crystal Washington ${thisYear}`;
footer.appendChild(copyright);

//skills section
let skills = ["Customer Service", "JavaScript", "HTML", "CSS"];
const skillsSection = document.getElementById('Skills');
console.log('skillsSection', skillsSection);

const skillsList = skillsSection.querySelector('ul');
console.log("skillsList", skillsList);
for(let skillName of skills){
    let skill = document.createElement('li'); //creates list item
    skill.innerText = skillName; //puts skill from array in that list item
    skillsList.append(skill); // adds li to skillsList
};

