const input = document.getElementById("input-box");
const weatherInfo = document.getElementById("weather-info");
const weatherContent = document.getElementById("content");

weatherContent.style.display = "none"
input.value = "Enter the Location"
input.style.outline = "none"
let place = input.value;


async function dataResponse(place) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${place}&aqi=no`
  );

  console.log(response);
  

  if(response.ok){
  const data = await response.json();
  const condition = data.current.condition.text;
    const feelsLike = "Feels " + data.current.feelslike_f;
    const temperature = data.current.temp_f;
    input.value = data.location.name;
    weatherContent.textContent = "Make The most of this nice weather that I generated for you. Or else";
    display(condition, feelsLike, temperature)
  }
  else {
    weatherContent.style.display = "block"
    weatherContent.textContent = "No such place is there"
    weatherInfo.innerHTML = ""
  }
}


function display(condition, feel_l, temp) {
  const infoContainer = document.createElement("div")
  const image = document.createElement("img")
  const weatherInformation = document.createElement("div")
  const actualTemp = document.createElement("p")
  const feelTemp = document.createElement("p")
  const actualTempDegree = document.createElement("sup")
  const feelTempDegree = document.createElement("sup")
  infoContainer.setAttribute("id", "info-container")
  image.setAttribute("id", "weather-image")
  if (condition === "clear" || condition === "sunny" || condition === "mist" || condition === "snow") {
    image.src = `./images/${condition}.svg`
  }
  else {
    image.src = `./images/rainy.svg`
  }
  weatherInformation.setAttribute("id", "details")
  actualTemp.setAttribute("class", "condition-temp")
  feelTemp.setAttribute("class", "condition-feels")
  actualTemp.innerHTML = temp
  feelTemp.innerHTML = feel_l
  actualTempDegree.innerText = "o"
  feelTempDegree.innerText = "o"
  actualTemp.appendChild(actualTempDegree)
  feelTemp.appendChild(feelTempDegree)
  weatherInformation.appendChild(actualTemp)
  weatherInformation.appendChild(feelTemp)
  infoContainer.appendChild(image)
  infoContainer.appendChild(weatherInfo)
  weatherInformation.innerHTML = infoContainer.innerHTML
  weatherContent.style.display = "block"
}

function inputCheck(place) {
  if (place === "") {
    input.value = "Enter Your Location"
    weatherInfo.innerHTML = ""
    weatherContent.style.display = "none"
  }
  else
    dataResponse(place)
}

    

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") place = input.value.trim();
        inputCheck(place)
  
});

input.addEventListener("click", () => {
  input.value="";
  input.onblur = () => {
    inputCheck(input.value.trim())
  }

});

  
