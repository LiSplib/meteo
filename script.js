    // const cityTitles = document.querySelectorAll('h3');

    // const icon = document.getElementById('icon');
    // const temp = document.getElementById('city-temp');
    // const tempAll = document.getElementById('cityTempAll');
    // const condition = document.getElementById('city-condition');
    // const day = document.getElementById('day-time');
    const forecastList= document.getElementById('forecast-list');

    function updateWeather(cityName){
            fetch(`https://www.prevision-meteo.ch/services/json/${cityName}`)
            .then(res => res.json())
            .then(data => updateView(data))
            .catch(err => handleError(err));
    }
    let html = "";

    function updateView(data){
        

        // for(city of cityTitles){
        //     city.textContent = data.city_info.name; 
        // };

        html += updateCurrentView(data);
        updateForecastView(data);

    }

    function updateCurrentView(data){
        return `<div class="carousel-item active d-flex">
        <div class="card d-block w-100 bg-dark text-white text-center">
            <img id ="icon" src="${data.current_condition.icon_big}" class="card-img-top" alt="condition météo">
                <p id="city-temp" class="text-center">${data.current_condition.tmp}°C</p>
                <p id="cityTempAll" class="text-center">Min ${data.fcst_day_0.tmin}°C \t Max ${data.fcst_day_0.tmax}°C</p>
            <div class="card-body">
                <h3 class="card-title text-center">${data.city_info.name}</h3>
                <p id="city-condition" class="card-text text-center">${data.current_condition.condition}</p>
                <p id="day-time" class="text-center">${data.fcst_day_0.day_long} ${data.current_condition.date}</p>
            </div>
        </div> 
      </div>`;
        // icon.setAttribute("src", data.current_condition.icon_big);
        // temp.textContent = data.current_condition.tmp + "°C";
        // tempAll.textContent = "Min : " + data.fcst_day_0.tmin + "°C" + " " + "Max : " +data.fcst_day_0.tmax + "°C";
        // condition.textContent = data.current_condition.condition;
        // day.textContent = data.fcst_day_0.day_long + " " + data.fcst_day_0.date + " " + data.current_condition.hour;
        

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
                    <p id="city-tempd2" class="text-center">Temp mini : ${dayData.tmin} °C</p>
                    <p id="city-tempd22" class="text-center">Temp max : ${dayData.tmax} °C</p>
                <div class="card-body">
                    <h3 class="card-title text-center">${data.city_info.name}</h3>
                    <p id="city-conditiond2" class="card-text text-center">${dayData.condition}</p>
                    <p id="day-timed2" class="text-center">${dayData.day_long} ${dayData.date}</p>
                </div>
            </div>
        </div>
        `;
    }

        
    

    function handleError(err){
        console.error(err);
    }

updateWeather('toulon');




// for(let i = 1; i < 4; i++){
//     icon[i] = document.getElementById('icond+'[i]);
//     icon[i].setAttribute("src", data.fcst_day_+[i].icon_big);
// }
