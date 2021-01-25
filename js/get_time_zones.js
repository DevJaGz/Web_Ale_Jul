function getTime(timeZone){
    var day = new Date().toLocaleString(
        "es-CO",
        {
            timeZone: timeZone,
            weekday:'long'
        }
    )
    var date_hour = new Date().toLocaleString(
        "en-US",
        {
            timeZone: timeZone,
            hourCycle: 'h12',
        }
    )
    var date = date_hour.split(',')[0];
    var hour = date_hour.split(',')[1].split(' ')[1].split(':')[0];
    var minute = date_hour.split(',')[1].split(' ')[1].split(':')[1];
    var second = date_hour.split(',')[1].split(' ')[1].split(':')[2];
    var symbol = date_hour.split(',')[1].split(' ')[2];
    return {day: day , hour: hour, minute:minute, second:second, symbol:symbol, date: date};
}

async function updateHours() {
    spain = getTime('Europe/Madrid');
    colombia = getTime('America/Bogota');

    document.getElementById('spain-day').innerText = spain.day;
    document.getElementById('spain-hour').innerText = spain.hour;
    document.getElementById('spain-minute').innerText = spain.minute;
    document.getElementById('spain-second').innerText = spain.second;
    document.getElementById('spain-symbol').innerHTML = `<strong> ${spain.symbol} </strong>`;
    document.getElementById('spain-date').innerText = spain.date;

    document.getElementById('colombia-day').innerText = colombia.day;
    document.getElementById('colombia-hour').innerText = colombia.hour;
    document.getElementById('colombia-minute').innerText = colombia.minute;
    document.getElementById('colombia-second').innerText = colombia.second;
    document.getElementById('colombia-symbol').innerHTML = `<strong> ${colombia.symbol} </strong>`;
    document.getElementById('colombia-date').innerText = colombia.date;

}

updateHours();
setInterval(updateHours, 1000);