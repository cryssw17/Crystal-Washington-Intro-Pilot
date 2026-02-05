//Dom selection for buttons
const breedBtn = document.querySelector("#breedBtn");
const factsBtn = document.querySelector(".factsBtn");

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
            throw new Error('Failed Request') //throws error if not
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

        const dogImage = document.querySelector("#dogImage");  
        dogImage.src = image  //set <img> to random dog image
        dogImage.alt = `An image of a ${breed}`;


        const dogBreed = document.getElementById("breedName");
        dogBreed.innerText = breed; //sets inner text to that dogs breed. 
    })
    
    //.catch to handle errors 
    .catch( (error) => { 
        console.log("Failed to load dog image:", error)

        const breedResult = document.getElementById("breedResult");
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, couldn't load a dog right now. Please try again later.";
        breedResult.append(errorMessage);
    })
}

function handleBreedClick () {

      const breedResult = document.getElementById("breedResult");
      const factsResult = document.getElementById("factsResult");
      const factsContent = document.getElementById("factsContent");
      const dogImage = document.getElementById("dogImage");
      const breedName = document.getElementById("breedName");

    // clears old breed content
      dogImage.src = "";
      breedName.textContent = "";

    // resets facts
      factsContent.textContent = "";
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
            throw new Error('Failed Request');
        }
        return response.json();
    })
    .then((data) => {
        const factsData = data;
        console.log(factsData);

        //adds facts to each catgory 
        document.getElementById("description").innerHTML= `<strong>Description:</strong> ${factsData.description}`;
        document.getElementById("lifeSpan").innerHTML = `<strong>Life Span:</strong> ${factsData.life_span}`;
        document.getElementById("temperament").innerHTML = `<strong>Temperament:</strong> ${factsData.temperament}`;
        
    })

    //handle errors with facts
    .catch ( (error) => {
        console.log("Failed to load dog facts:", error);

        const factsResult = document.getElementById("factsResult");

        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Sorry, couldn't load facts for this breed right now."

        factsContent.append(errorMessage);
    })
};

//fn handleFactClick
   //logic for hiding factsResults until factsBtn clicked
function handleFactClick() {
    const factsResult = document.getElementById("factsResult");

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
 