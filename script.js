    const forecastList = document.getElementById('forecast-list');
    const hourCondition = document.getElementById('hourCondition');
    const dayInfo = document.getElementById('dayInfo');

    function updateWeather(myCity){
            fetch(`https://www.prevision-meteo.ch/services/json/${myCity}`)
            .then(res => res.json())
            .then(data => updateView(data))
            .catch(err => handleError(err));
    }

    function updateView(data){
        let html = "";
        html += updateCurrentView(data);
        html += updateForecastView(data);
        forecastList.innerHTML = html;
        updateHourCondition(data);
    }

    function updateCurrentView(data){
        return `
        <div class="carousel-item active d-flex">
            <div class="card d-block w-100 bg-dark text-white text-center">
                <h3 class="card-title text-center">${data.city_info.name}</h3>
                <p id="city-condition" class="card-text text-center">${data.current_condition.condition}</p>
                <img src="${data.current_condition.icon_big}" class="card-img-top icon" alt="condition météo">
                <div class="card-body">
                    <p id="city-temp" class="text-center">${data.current_condition.tmp}°C</p>
                    <p id="cityTempAll" class="text-center">Mini : ${data.fcst_day_0.tmin}°C \t Maxi : ${data.fcst_day_0.tmax}°C</p>
                    <p id="day-time" class="text-center">${data.fcst_day_0.day_long} ${data.current_condition.date}</p>
                </div>
            </div> 
        </div>
        `;
    }

    function updateHourCondition(data){
        let html = "";
        dayInfo.innerHTML = `Votre journée du ${data.fcst_day_0.day_long} ${data.current_condition.date}`;
        let actualHour = new Date();
        
        for(let hourNum = actualHour.getHours(); hourNum < 24; hourNum++){
            html += createHourCondition(hourNum, data);
            hourCondition.innerHTML = html;
        }
        return html;
    }

    function createHourCondition(hourNum, data){
        const hour = hourNum + "H00";
        let eachHourlyData = data.fcst_day_0.hourly_data[hour];
        let eachTemp = eachHourlyData['TMP2m'];
        let eachCondition = eachHourlyData['CONDITION'];
        let eachIcon = eachHourlyData['ICON'];
        return `
                <div class="hour bg-dark text-center text-white">
                    <p>${hour}</p>
                    <p>${eachTemp}°C</p>
                    <img class="smallIcon" src="${eachIcon}">
                    <p>${eachCondition}</p>
                </div>`;
    }

    function updateForecastView(data){
        let html = "";
        for(let dayNum = 1; dayNum <= 4; dayNum++){
            html += createForecastItemHtml(data, dayNum);
        }
        return html;
    }

    function createForecastItemHtml(data, dayNum){
        const dayKey = "fcst_day_" + dayNum;
        const dayData = data[dayKey];
        return `
        <div class="carousel-item">
            <div class="card d-block w-100 bg-dark text-white text-center">
                <h3 class="card-title text-center">${data.city_info.name}</h3>
                <p id="city-conditiond2" class="card-text text-center">${dayData.condition}</p>
                <img src="${dayData.icon_big}" class="card-img-top icon" alt="condition météo">
                <div class="card-body">
                    <p id="city-tempd2" class="text-center">Temp mini : ${dayData.tmin} °C</p>
                    <p id="city-tempd22" class="text-center">Temp max : ${dayData.tmax} °C</p>
                    <p id="day-timed2" class="text-center">${dayData.day_long} ${dayData.date}</p>
                </div>
            </div>
        </div>`;
    }

    function handleError(err){
        console.error(err);
    }


    let currentCity = 'Toulon';
    let myCity = currentCity;

    updateWeather(myCity);


    document.getElementById('search').addEventListener('click', function(){
        let newCityName = document.getElementById('cityName').value;
        myCity = newCityName;
        refreshCity(myCity);
    });

    function refreshCity(myCity){
        updateWeather(myCity);
    }

    // function testCity(){
    //     fetch(`https://cors-anywhere.herokuapp.com/https://www.prevision-meteo.ch/services/json/list-cities/fr`)
    //         .then(res => res.json())
    //         .then(data => updateCityList(data))
    //         .catch(err => handleError(err));
    // }

    // let villes = [];

    // function updateCityList(data){
    //         for(let city of data.toString()){
    //             if(city.country === 'FRA'){
    //                 return villes.push(city);
    //             }
    //         }
    // }   
    
    // updateCityList(data);

    // console.log(villes)

    
