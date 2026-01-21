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
const skillsSection = document.getElementById('skills');

const skillsList = skillsSection.querySelector('ul');
for(let skillName of skills){
    let skill = document.createElement('li'); //creates list item
    skill.innerText = skillName; //puts skill from array in that list item
    skillsList.append(skill); // adds li to skillsList
};

//message form 
const messageForm = document.querySelector('form[name="leave_message"]');



function onSubmit(event){
    event.preventDefault();

    //stretch goal to hide/show message list
    function showList () {
    if (messageList.hasChildNodes()) { 
        messageSection.hidden = false;
     } else {messageSection.hidden = true;}
    };

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

    console.log(name);
    console.log(email);
    console.log(message);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span>${message}</span>`;
    
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.setAttribute("type", "button");

    removeButton.addEventListener("click", (event) => {
        const entry = removeButton.parentNode;
        entry.remove();
        showList(); //hides list when all messages are removed
    });

    newMessage.appendChild(removeButton);
    messageList.append(newMessage);
    showList();  //shows list when new message is added

    document.querySelector('form[name="leave_message"]').reset();
}

messageForm.addEventListener("submit", onSubmit);
