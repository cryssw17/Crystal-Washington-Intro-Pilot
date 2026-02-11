//Dom selections
const breedBtn = document.querySelector("#breedBtn");
const factsBtn = document.querySelector(".factsBtn");

const dogImage = document.getElementById("dogImage");
const breedName = document.getElementById("breedName");
const breedMessage = document.getElementById("breedMessage");

const factsMessage = document.getElementById("factsMessage");
const factsResult = document.getElementById("factsResult");

const apiKey = "live_BK89XWeuiRa4sWOLReXE4aYZAt1NQj5KOXTy0ZQVVp3DYVNQFAuGQg1ftuQTPWft";
let breedId = null;

//Dog image and breed

//fetch request for image and breed (includes reset logic for facts section)
function getDogRequest(){
    return fetch("https://api.thedogapi.com/v1/images/search?has_breeds=true", {
        headers: {
            "x-api-key": apiKey
        }
    })

    .then((response) => {  //checks if response is okay
        if (!response.ok)  {
            throw new Error(`Failed Request: ${response.status} ${response.statusText}`) //throws error if not
        }
        return response.json(); //returns parsed JSON object
        })

    //display image and breed name to <img> and id="breedName"
    .then((data) => {
        const dogData = data[0];
        console.log(dogData); //check getting info want

        const image = dogData.url // gets the dog image

        const breed = dogData.breeds[0].name //gets the dog breed
        breedId = dogData.breeds[0].id;

        dogImage.src = image  //set <img> to random dog image
        dogImage.alt = `An image of a ${breed}`;
        
        breedName.innerText = breed; //sets inner text to that dogs breed. 
    })
    
    //.catch to handle errors 
    .catch( (error) => { 
        console.log("Failed to load dog image:", error)

        breedMessage.textContent = "Sorry, couldn't load a dog right now. Please try again later.";
        
    })
}

function handleBreedClick () {
      const breedResult = document.getElementById("breedResult");
      
    // clears old breed content
      dogImage.src = "";
      breedName.textContent = "";

    // resets any error messages
      breedMessage.textContent = "";
      factsMessage.textContent = "";
      
    //hides facts section
      factsResult.hidden = true;

    // show breed section
      breedResult.hidden = false;
    
    //get breed and image
     getDogRequest();
 };

//event listener for breeds btn
 breedBtn.addEventListener("click", handleBreedClick);

//Facts Section
    
//fetch request for facts btn 
function getFactsRequest(breedId) {
        return fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
        headers: {
            "x-api-key": apiKey
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed Request: ${response.status} ${response.statusText}` );
        }
        return response.json();
    })
    .then((data) => {
        const factsData = data;
        console.log(factsData);

        const description = document.getElementById("description");
        const lifeSpan = document.getElementById("lifeSpan");
        const temperament = document.getElementById("temperament");

        //checks for and adds description info
        if(factsData.description) {
            description.innerHTML = `<strong>Description:</strong> ${factsData.description}`;
        } else {
            description.innerHTML = '<strong>Description:</strong> Sorry, no description info available right now.'
        }

        //checks for and adds life span info
        if(factsData.life_span){
            lifeSpan.innerHTML = `<strong>Life Span:</strong> ${factsData.life_span}`;
        } else {
            lifeSpan.innerHTML = '<strong>Life Span:</strong> Sorry, no life span info available right now.'
        }

        //checks for and adds temperament info
        if(factsData.temperament) {
            temperament.innerHTML = `<strong>Temperament:</strong> ${factsData.temperament}`;
        } else {
            temperament.innerHTML = '<strong>Temperament:</strong> Sorry, no temperament info available right now.'
        } 
    })

    //handle errors with facts
    .catch ( (error) => {
        console.log("Failed to load dog facts:", error);

        factsMessage.textContent = "Sorry, couldn't load facts for this breed right now."

        factsResult.hidden = true;
    })
};

//fn handleFactClick
   //logic for hiding factsResults until factsBtn clicked
function handleFactClick() {
    console.log("breedId at click:", breedId);
    console.log("facts URL:",`https://api.thedogapi.com/v1/breeds/${breedId}` );
    //handles if user clicks facts button before getting a breed
    if (!breedId) {
        factsMessage.textContent = "Click button under 'Discover a Breed!' first!";
        return;
    }

//clear old facts
    document.getElementById("description").textContent = "";
    document.getElementById("lifeSpan").textContent = "";
    document.getElementById("temperament").textContent = "";

//show facts results
    factsResult.hidden = false;

//get facts
    getFactsRequest(breedId);  
}

//event listener for facts btn, calls prev fn as 2nd arg
factsBtn.addEventListener("click", handleFactClick);
 