function setApiUrl(city) {
  const apiKey = '502dc8f7ae36e57af1974e18d16a86f8';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  return apiUrl;
}

function setDate() {
  let today = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  let day = days[today.getDay()];
  let divDay = document.querySelector('#dateANDtime .day');
  divDay.textContent = day;

  let month = months[today.getMonth()];
  let date = today.getDate();
  let divDate = document.querySelector('#dateANDtime .month-date');
  divDate.textContent = `${month} ${date}`;

  let hour = today.getHours() < 10 ? `0${today.getHours()}` : `${today.getHours()}`;
  let min = today.getMinutes() < 10 ? `0${today.getMinutes()}` : `${today.getMinutes()}`;
  let divTime = document.querySelector('#dateANDtime .time');
  divTime.textContent = `${hour}:${min}`;
}

function searchProcess(e) {
  e.preventDefault();
  let searchBox = document.querySelector('#searchInput');
  let cityName = searchBox.value;
  searchBox.value = null;
  let apiUrl = setApiUrl(cityName);
  axios.get(apiUrl).then(setAttr);
}

function getName(response) {
  let cityName = response.data[0].name;
  /*debug*/

  /* console.log(response);
  console.log(cityName); */
  let apiUrl1 = setApiUrl(cityName);
  axios.get(apiUrl1).then(setAttr);
}
let searchForm = document.querySelector('form');
searchForm.addEventListener('submit', searchProcess);

let searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', searchProcess);

function clickFah() {
  let temp = document.querySelector('.temp');
  temp.textContent = '66';
}

function clickCen() {
  let temp = document.querySelector('.temp');
  temp.textContent = '19';
}

/* let centigrade = document.querySelector('#centigrade');
centigrade.addEventListener('click', clickCen);
let fahrenheit = document.querySelector('#fahrenheit');
fahrenheit.addEventListener('click', clickFah); */

function setAttr(response) {
  /*debug*/

  /* console.log(response); */
  let city = document.querySelector('#city');
  city.textContent = response.data.name;

  let temp = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let tempEl = document.querySelector('#temp');
  tempEl.textContent = temp;
  let humidityEl = document.querySelector('#humidity');
  humidityEl.textContent = humidity;
  let windEl = document.querySelector('#wind');
  windEl.textContent = wind;

  setDate();
}

function defaultPage() {
  setDate();
  let apiUrl = setApiUrl('london');
  axios.get(apiUrl).then(setAttr);
}

defaultPage();

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  /*debug*/

  /* console.log(lat);
  console.log(lon); */
  let apiKey = '502dc8f7ae36e57af1974e18d16a86f8';
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=&appid=${apiKey}`;
  /*debug*/

  /* console.log(apiUrl); */
  axios.get(apiUrl).then(getName);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentBtn = document.querySelector('#current');
currentBtn.addEventListener('click', currentLocation);
