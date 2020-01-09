    const forecastList = document.getElementById('forecast-list');

    function updateWeather(currentCity){
            fetch(`https://www.prevision-meteo.ch/services/json/${currentCity}`)
            .then(res => res.json())
            .then(data => updateView(data))
            .catch(err => handleError(err));
    }
    let html = "";

    function updateView(data){
        html += updateCurrentView(data);
        updateForecastView(data);
    }

    function updateCurrentView(data){
        return `
        <div class="carousel-item active d-flex">
            <div class="card d-block w-100 bg-dark text-white text-center">
                <img id ="icon" src="${data.current_condition.icon_big}" class="card-img-top" alt="condition météo">
                    <p id="city-condition" class="card-text text-center">${data.current_condition.condition}</p>
                <div class="card-body">
                    <h3 class="card-title text-center">${data.city_info.name}</h3>
                    <p id="city-temp" class="text-center">${data.current_condition.tmp}°C</p>
                    <p id="cityTempAll" class="text-center">Min ${data.fcst_day_0.tmin}°C \t Max ${data.fcst_day_0.tmax}°C</p>
                    <p id="day-time" class="text-center">${data.fcst_day_0.day_long} ${data.current_condition.date}</p>
                </div>
            </div> 
        </div>`;
        }

    function updateForecastView(data){
        

        for(let dayNum = 1; dayNum <= 4; dayNum++){
            html += createForecastItemHtml(data, dayNum);
        }
        forecastList.innerHTML = html;
    }

    function createForecastItemHtml(data, dayNum){
        const dayKey = "fcst_day_" + dayNum;
        const dayData = data[dayKey];

        return `
        <div class="carousel-item">
            <div class="card d-block w-100 bg-dark text-white text-center">
                <img id ="icond2" src="${dayData.icon}" class="card-img-top" alt="condition météo">
                <p id="city-conditiond2" class="card-text text-center">${dayData.condition}</p>
                <div class="card-body">
                    <h3 class="card-title text-center">${data.city_info.name}</h3>
                    <p id="city-tempd2" class="text-center">Temp mini : ${dayData.tmin} °C</p>
                    <p id="city-tempd22" class="text-center">Temp max : ${dayData.tmax} °C</p>
                    <p id="day-timed2" class="text-center">${dayData.day_long} ${dayData.date}</p>
                </div>
            </div>
        </div>
        `;
    }

        
    

    function handleError(err){
        console.error(err);
    }


    const currentCity = 'Toulon';

    updateWeather(currentCity);


    document.getElementById('search').addEventListener('click', function(){
        let newCityName = document.getElementById('cityName').value;
        refreshCity(newCityName);
    });

    function refreshCity(newCityName){
        updateWeather(newCityName);
    }

    function testCity(){
        fetch(`https://cors-anywhere.herokuapp.com/https://www.prevision-meteo.ch/services/json/list-cities/fr`)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => handleError(err));
    }

    console.log(data.Object)

