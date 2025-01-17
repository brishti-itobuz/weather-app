const input = document.getElementById("input-box");

async function dataResponse(place) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${place}&aqi=no`
  );
  const data = await response.json();
  console.log(data);
  console.log(data.current.temp_f);
  console.log(data.current.feelslike_f);
  console.log(data.current.condition.text);
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") place = input.value;

  dataResponse(place);
});

input.addEventListener("blur", () => {
  place = input.value;

  dataResponse(place);
});
