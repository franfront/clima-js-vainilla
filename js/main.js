const api ={
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: 'https://api.openweathermap.org/data/2.5/weather'
};

const card = document.querySelector("#card");
const city = document.querySelector("#city");
const date = document.querySelector("#date");
const tempImg = document.querySelector("#tempImg");
const temp = document.querySelector("#temp");
const weather = document.querySelector("#weather");
const range = document.querySelector("#range");



function updateImg(data) {
    const temp = toCelsius(data.main.temp);
    let src = 'images/temp-mid.png';
    if (temp > 24){
        src = 'images/temp-high.png'
    } else if (temp < 16){
        src = 'images/temp-low.png'
    }
    tempImg.src = src;
}




async function search(respe){
    try{
        const res = await fetch(`${api.url}?q=${respe}&appid=${api.key}&lang=es`);
        const data = await res.json();
        card.style.display = 'block';
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML =  (new Date()).toLocaleDateString();
        temp.innerHTML = `${toCelsius(data.main.temp)}°C`;
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelsius(data.main.temp_min)}°C/${toCelsius(data.main.temp_max)}°C`
        updateImg(data)
    } catch{
        console.log(err);
        alert("hay un error");
    }
};


function toCelsius(k){
    return Math.round(k - 273.15);
}

function onSubmit(e){
    e.preventDefault();
    search(searchbox.value);
}

const form = document.querySelector("#search-form");
const searchbox = document.querySelector("#searchbox");
form.addEventListener('submit', onSubmit, true);