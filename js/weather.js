let sab_temp;
let sab_feels_like;
let sab_pressure;
let sab_humidity;
let sab_wind_speed;
let sab_wind_deg;
let sab_sunrise;
let sab_sunset;

let flo_temp;
let flo_feels_like ;
let flo_pressure;
let flo_humidity;
let flo_wind_speed;
let flo_wind_deg;
let flo_sunrise ;
let flo_sunset ;


// RIGHT WEATHER INFO
//OPEN
document.getElementById("ver-right").addEventListener('click', ()=>{ 
    document.getElementById("weather-card-right").style.display = 'grid';
    console.log("open right it");
});
//CLOSE
document.getElementById("close-right-icon").addEventListener('click', ()=>{
    document.getElementById("weather-card-right").style.display = 'none';
    console.log("close right it");
});



function getWeather(id) {
    const apiKey = "f4b64c9359acf2aeb8d39b58178ad67b";
    // const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`;
    const url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${apiKey}`;
    return url;
}

function unixtimestamp_to_time(unix_timestamp) {
    let dateObj = new Date(unix_timestamp * 1000);
    let utcString = dateObj.toUTCString();
    let time = utcString.slice(-12, -7);
    const timeString12hr = new Date('1992-09-18T' + time + 'Z')
        .toLocaleTimeString("en-US",
            { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
        );
    return timeString12hr;
}

async function updateWeather() {

    sab_url = getWeather(id_cities.Sabinanigo);
    flo_url = getWeather(id_cities.Floridablanca);
    // console.log(sab_url);
    // console.log(flo_url);
    const sab_req = await fetch(sab_url);
    const sab_res = await sab_req.json();

    const flo_req = await fetch(flo_url);
    const flo_res = await flo_req.json();

    console.log(sab_res);
    console.log(flo_res);
    if (sab_res.cod == 200) {
        sab_temp = sab_res.main.temp;
        sab_feels_like = sab_res.main.feels_like;
        sab_pressure = sab_res.main.pressure;
        sab_humidity = sab_res.main.humidity;
        sab_wind_speed = sab_res.wind.speed;
        sab_wind_deg = sab_res.wind.deg;
        sab_sunrise = unixtimestamp_to_time(sab_res.sys.sunrise);
        sab_sunset = unixtimestamp_to_time(sab_res.sys.sunset);
        console.log(sab_sunset, sab_res.sys.sunset);
        document.getElementById('ver-left').style.display = 'inline';
    }
    if (flo_res.cod == 200) {
        flo_temp = flo_res.main.temp;
        flo_feels_like = flo_res.main.feels_like;
        flo_pressure = flo_res.main.pressure;
        flo_humidity = flo_res.main.humidity;
        flo_wind_speed = flo_res.wind.speed;
        flo_wind_deg = flo_res.wind.deg;
        flo_sunrise = unixtimestamp_to_time(flo_res.sys.sunrise);
        flo_sunset = unixtimestamp_to_time(flo_res.sys.sunset);
        console.log(flo_sunset, flo_res.sys.sunset);
        document.getElementById('ver-right').style.display = 'inline';
    }

}

id_cities = {
    // http://bulk.openweathermap.org/sample/
    //'city.list.json.gz'
    Sabinanigo: '3111185',
    Floridablanca: '3682385',
}

updateWeather();
setInterval(updateWeather, 300000); // Every 5 minutes