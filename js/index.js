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

    const name = event.target.usersName.value;
    const email = event.target.usersEmail.value;
    const message = event.target.usersMessage.value;

    console.log(name);
    console.log(email);
    console.log(message);

    const messageSection = document.getElementById("messages");
    const messageList = messageSection.querySelector("ul");
    const newMessage = document.createElement("li");
    newMessage.innerHTML = `<a href="mailto:${email}">${name}</a>: <span>${message}</span>`;

     //stretch goal to hide/show message list
    function showList () {
    if (messageList.hasChildNodes()) { 
        messageSection.hidden = false;
     } else {messageSection.hidden = true;}
    };
    
    const removeButton = document.createElement("button");
    removeButton.innerText = "remove";
    removeButton.setAttribute("type", "button");

    removeButton.addEventListener("click", (event) => {
        const entry = event.target.parentNode;
        entry.remove();
        showList(); //hides list when all messages are removed
    });

    newMessage.appendChild(removeButton);
    messageList.append(newMessage);
    showList();  //shows list when new message is added

    event.target.reset();
}

messageForm.addEventListener("submit", onSubmit);

// get repos from GitHub
const getRepo = fetch("https://api.github.com/users/cryssw17/repos") 
 .then( (response) => { 
    if (!response.ok) { //checks if response is okay
        throw new Error('Failed request');  //throws error if not okay
    }
    return response.json(); //if response okay, parses data from JSON string to JS objects
     })

// take JSON object and display repo name in project section
 .then((repoData) => { 
    const repositories = repoData;
    console.log(repositories);  // logs repo array to console 

    const projectSection = document.getElementById("projects"); 
    const projectList = projectSection.querySelector("ul");

    //loop through repo
    for(let i = 0; i < repositories.length; i++) {  
        const project = document.createElement("li"); //creates li item for project
        project.innerHTML = `<a href="${repositories[i].html_url}" target="_blank" rel="noreferrer">${repositories[i].name}</a>`;  //sets li item text to repo name
        projectList.appendChild(project); // adds item to list in project section
    };
  })
 
  //handling for errors
 .catch( (error) => { 
    console.log("Failed to load repositories:", error); //if error caught, displays error message to the console 
    const projectSection = document.getElementById("projects"); 
    const errorMessage = document.createElement('p'); //create element to store user displayed error message
    errorMessage.innerHTML = `Oops! ${error}`; 
    projectSection.append(errorMessage);  //adds error message to project section, displays message to the user
 }); 

