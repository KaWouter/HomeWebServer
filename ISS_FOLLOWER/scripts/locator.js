let api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

const fetchData = () => {
    fetch(api_url)
    .then(function(response) {
        return response.json();
    })
    .then(function(object){
        displayData(object);
        initMap(object);
    });
}

const displayData = (data) =>{
    //CONVERT UNIX TO GMT / UTC
    let unixTimestamp = data.timestamp;
    let date = new Date(unixTimestamp * 1000);
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let timeAtISS = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;  

    document.getElementById('name').innerHTML = 'Name : ' + data.name;
    document.getElementById('latitude').innerHTML = 'Latitude : ' + data.latitude;
    document.getElementById('longitude').innerHTML = 'Longitude : ' + data.longitude;
    document.getElementById('altitude').innerHTML = 'Altitude : ' + data.altitude.toFixed(2) + ' km';
    document.getElementById('velocity').innerHTML = 'Velocity : ' + data.velocity.toFixed(2) + ' km/h';
    document.getElementById('time').innerHTML = 'Time at ISS : ' + timeAtISS;
}

const initMap = (data) => {
    let map = L.map('map' , {maxZoom : 5, minZoom : 2}).setView([data.latitude, data.longitude], 3);
    L.marker([data.latitude, data.longitude]).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    document.getElementById('refreshButton').addEventListener("click", function() {
        L.marker([data.latitude, data.longitude]).addTo(map);
    });
}


