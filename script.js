const weatherForm = document.querySelector('.weatherForm');
const inputData = document.querySelector('.inputWeather');
const showStuff = document.querySelector('.showData');

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const location = inputData.value;

  try {
    const weatherData = await getWeather(location);
    console.log(weatherData)
    showData(weatherData.coins, location);
  } catch {
    console.log("Error while fetching data")
  }
});


async function getWeather(location) {
  let data = await fetch(`https://coins.llama.fi/prices/current/coingecko:${location.toLowerCase()}?searchWidth=4h
`)
  let dataNew = await data.json()
  const weather = dataNew;
  return weather
}

const showData = (data, location) => {
  console.log(data); // Log the entire data object to the console

  const coinProperty = `coingecko:${location.toLowerCase()}`;

  if (data[coinProperty]) {
    const coin = data[coinProperty].price;
    const loc = document.createElement("h4");
    loc.textContent = `${location} Price: ${coin}`;
    showStuff.appendChild(loc);
  } else {
    console.error(`Coin property (${coinProperty}) not found in the data`);
  }
};

/***const showData = (data) => {
  const {address: name, timezone: time, days: [{cloudcover, conditions, datetime, temp, humidity}]} = data;



  const loc = document.createElement("h4");
  const t = document.createElement("h4");
  const cloud = document.createElement("h4");
  const cond = document.createElement("h4");
  const dt = document.createElement("h4");
  const tem = document.createElement("h4");
  const hum = document.createElement("h4");

  loc.textContent = "Name: " + name;
  t.textContent = "Timezone: " + time;
  cloud.textContent = "Cloud Cover: " + cloudcover;
  cond.textContent = "Conditions: " + conditions;
  dt.textContent = "DateTime: " + datetime;
  tem.textContent = "Temprature: " + temp;
  hum.textContent = "Humidity Levels: " + humidity;


  showStuff.appendChild(loc);
  showStuff.appendChild(t);
  showStuff.appendChild(cloud);
  showStuff.appendChild(cond);
  showStuff.appendChild(dt);
  showStuff.appendChild(tem);
  showStuff.appendChild(hum);
}**/