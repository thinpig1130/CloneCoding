const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "61b1a9d2bc72ac7ad82def780a34f2aa";

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperture = json.main.temp;
        const place = json.name;
        weather.innerHTML = `${temperture} ºC / @${place}`;
    });
}

function saveCoods(obj){
    localStorage.setItem(COORDS, JSON.stringify(obj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const objCoods = {
        latitude,
        longitude
    };

    saveCoods(objCoods);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("failed get navigator");
}

function askForCoods(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
  
}

function loadCoords(){
    const loadedCoordinate = localStorage.getItem(COORDS); 
    if (loadedCoordinate === null){
        askForCoods();
    }
    else {
        const parseLoadedCoordinate = JSON.parse(loadedCoordinate);
        getWeather(parseLoadedCoordinate.latitude, parseLoadedCoordinate.longitude);
    }
}

function init(){
    loadCoords();
}

init();