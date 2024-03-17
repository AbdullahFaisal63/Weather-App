document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById("weather-form");

    // Add an event listener to the form for the "submit" event
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Retrieve the value entered by the user in the input field
        var city = document.getElementById("city").value;
        console.log(city); // Log the value to verify

        const apiKey = "1ac39bf83b04c7afd656275f94dbdbab";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
        // Create a new XMLHttpRequest object
        const xmlObj = new XMLHttpRequest();
    
        // Configure the XMLHttpRequest object
        xmlObj.open('GET', apiUrl);
    
        // Define the function to handle successful responses
        xmlObj.onload = function() {
            if (xmlObj.status === 200) {
                // Parse the JSON response
                const data = JSON.parse(xmlObj.responseText);
                console.log(data);
    
                const currentTime = new Date().toLocaleTimeString();
                //console.log(currentDate);
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
                const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
                const windSpeed = data.wind.speed;
                const windDirection = data.wind.deg;
                console.log(data['weather'][0]['icon']);
                var weatherIcon = `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`;

                document.getElementById('weather-info').innerHTML = `
                <h2 class="text-center mb-4">Weather Information</h2>
                <div class="row" style="margin-top: 10%;">
                    <div class="col-md-6">
                        <p><i class="fas fa-regular fa-clock"></i><strong> Current Time<br></strong> ${currentTime}</p>
                        <p><i class="fas fa-thermometer-half"></i><strong> Temperature<br></strong> ${temperature}°C</p>
                        <p style="margin-bottom: 0px;"><i class="fas fa-solid fa-cloud"></i><strong> Weather<br></strong> ${weatherDescription}</p>
                        <img src="${weatherIcon}" alt="Weather Icon" class="img-fluid icon-large" style="margin-bottom: 10px;">
                    </div>
                    <div class="col-md-6">
                        <p class="text-right"><i class="far fa-regular fa-clock"></i><strong> Sunrise Time<br></strong> ${sunriseTime}</p>
                        <p class="text-right"><i class="far fa-regular fa-clock"></i><strong> Sunset Time<br></strong> ${sunsetTime}</p>
                        <p class="text-right"><i class="fas fa-solid fa-wind"></i><strong> Wind Speed<br></strong> ${windSpeed} m/s</p>
                        <p class="text-right"><i class="far fa-regular fa-compass"></i><strong> Wind Direction<br></strong> ${windDirection}°</p>
                    </div>
                </div>
                `;

            } else {
                console.error('Error fetching weather data:', xmlObj.statusText);
            }
        };

        xmlObj.onerror = function() {
            console.error('Error fetching weather data:', xmlObj.statusText);
        };

        xmlObj.send();
    });
});

fetch('https://api.unsplash.com/photos/random?query=weather&client_id=ZccmQUtRhXOWL1Hpkn6zy2z7kKke4lgvDz2nrtbBKCo')
.then(response => response.json())
.then(data => {
    console.log(data.urls.regular);
    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
})
.catch(error => console.error('Error fetching background image:', error));