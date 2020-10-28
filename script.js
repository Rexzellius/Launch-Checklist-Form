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
 
     if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
       alert("All fields are required!");
       inputReady = false;
     } else if (typeof pilotNameInput.value !== 'string') {
       alert("Please enter a valid pilot name (string)");
       inputReady = false;
     } else if (typeof copilotNameInput.value !== 'string') {
       alert("Please enter a valid co-pilot name (string)");
       inputReady = false;
     } else if (isNaN(fuelLevelInput.value)) {
       alert('Please enter a valid fuel level (number)');
       inputReady = false;
     } else if (isNaN(cargoMassInput.value)) {
       alert('Please enter a valid cargo mass (number)');
       inputReady = false;
     } else {
       inputReady = true;
     }

     if (inputReady) {
      let pilotStatusLi = document.querySelector("#pilotStatus");
      let copilotStatusLi = document.querySelector("#copilotStatus");

      pilotStatusLi.textContent = `Pilot ${pilotNameInput.value} is ready`;
      copilotStatusLi.textContent = `Co-pilot ${copilotNameInput.value} is ready`;
      document.querySelector('#fuelStatus').textContent = 'Fuel level high enough for launch';
      document.querySelector('#cargoStatus').textContent = 'Cargo mass low enough for launch';

      let launchReady = true;
      let fuelLevel = Number(fuelLevelInput.value);
      if (fuelLevel < 10000) {
        let fuelStatusLi = document.querySelector("#fuelStatus");
        fuelStatusLi.textContent = "Not enough fuel for journey";

        document.querySelector('#launchStatus').textContent = 'Shuttle not ready';
        document.querySelector('#launchStatus').style.color = "red";

        let faultyItemsDiv = document.querySelector("#faultyItems");
        faultyItemsDiv.style.visibility = "visible";
        launchReady = false;
      }

      let cargoMass = Number(cargoMassInput.value);
      if (cargoMass > 10000) {
        document.querySelector('#launchStatus').textContent = 'Shuttle not ready';
        document.querySelector('#launchStatus').style.color = "red";
        document.querySelector('#cargoStatus').textContent = "Cargo mass too great for takeoff";
        let faultyItemsDiv = document.querySelector("#faultyItems");
        faultyItemsDiv.style.visibility = "visible";
        launchReady = false;
      }

     if (launchReady) {
      document.querySelector("#launchStatus").style.color = "green";
      document.querySelector('#launchStatus').textContent = 'Shuttle is ready for launch';
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
