// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form")
   form.addEventListener("submit", function(event) {
     event.preventDefault()
 
     let pilotNameInput = document.querySelector("input[name=pilotName]");
     let copilotNameInput = document.querySelector("input[name=copilotName]");
     let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
     let cargoMassInput = document.querySelector("input[name=cargoMass]");
     let inputReady = true
     let launchReady = true;
     let cargoMass = Number(cargoMassInput.value);
     let fuelLevel = Number(fuelLevelInput.value);
 
     if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
       alert("All fields are required!");
       inputReady = false;
      } else if (!isNaN(Number(pilotNameInput.value)) || !isNaN(Number(copilotNameInput.value)) || isNaN(Number(cargoMassInput.value)) || isNaN(Number(fuelLevelInput.value))) {
         alert("Make sure to enter valid information for each field!");
       inputReady = false;
     } else {
       inputReady = true;
       let pilotStatusLi = document.querySelector("#pilotStatus");
       let copilotStatusLi = document.querySelector("#copilotStatus");
 
       pilotStatusLi.textContent = `Pilot ${pilotNameInput.value} is ready for launch.`;
       copilotStatusLi.textContent = `Co-pilot ${copilotNameInput.value} is ready for launch.`;
       document.querySelector('#fuelStatus').textContent = 'Fuel level high enough for launch.';
       document.querySelector('#cargoStatus').textContent = 'Cargo mass low enough for launch.';
     }

     if (inputReady) {
      if (fuelLevel < 10000) {
        document.querySelector('#fuelStatus').textContent = 'Fuel level too low for launch.'
        document.querySelector('#launchStatus').textContent = 'Shuttle Not Ready For Launch';
        document.querySelector('#launchStatus').style.color = "red";
        let faultyItemsDiv = document.querySelector("#faultyItems");
        faultyItemsDiv.style.visibility = "visible";
        launchReady = false;
      } if (cargoMass > 10000) {
        document.querySelector("#cargoStatus").textContent = "Cargo mass too great for launch.";
        document.querySelector('#launchStatus').textContent = 'Shuttle Not Ready For Launch';
        document.querySelector('#launchStatus').style.color = "red";
        let faultyItemsDiv = document.querySelector("#faultyItems");
        faultyItemsDiv.style.visibility = "visible";
        launchReady = false;
      } else if (launchReady) {
         document.querySelector("#launchStatus").style.color = "green";
         document.querySelector('#launchStatus').textContent = 'Shuttle Ready For Launch';
         let faultyItemsDiv = document.querySelector("#faultyItems");
         faultyItemsDiv.style.visibility = "visible";
    }

  }
})


let missionTargetDiv = document.querySelector("#missionTarget")

const url = 'https://handlers.education.launchcode.org/static/planets.json'
fetch(url).then(function(response) {
  return response.json()
}).then(function(myJson) {
  console.log(myJson)  
  let myPlanet = myJson[Math.floor(Math.random() * myJson.length)]
  missionTargetDiv.innerHTML =
    `<h2>Mission Destination</h2>
  <ol>
     <li>Name: ${myPlanet.name}</li>
     <li>Diameter: ${myPlanet.diameter}</li>
     <li>Star: ${myPlanet.star}</li>
     <li>Distance from Earth: ${myPlanet.distance}</li>
     <li>Number of Moons: ${myPlanet.moons}</li>
  </ol>
  <img src="${myPlanet.image}">`
})
})
