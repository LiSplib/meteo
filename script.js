var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        
        const cityTitles = document.querySelectorAll('h3');

        const icon = document.getElementById('icon');
        const temp = document.getElementById('city-temp');
        const condition = document.getElementById('city-condition');
        const day = document.getElementById('day-time');

        const icon1 = document.getElementById('icond1');
        const temp1 = document.getElementById('city-tempd1');
        const temp1M = document.getElementById('city-tempd12');
        const condition1 = document.getElementById('city-conditiond1');
        const day1 = document.getElementById('day-timed1');

        const icon2 = document.getElementById('icond2');
        const temp2 = document.getElementById('city-tempd2');
        const temp2M = document.getElementById('city-tempd22');
        const condition2 = document.getElementById('city-conditiond2');
        const day2 = document.getElementById('day-timed2');

        const icon3 = document.getElementById('icond3');
        const temp3 = document.getElementById('city-tempd3');
        const temp3M = document.getElementById('city-tempd32');
        const condition3 = document.getElementById('city-conditiond3');
        const day3 = document.getElementById('day-timed3');

        icon.setAttribute("src", response.current_condition.icon_big);
        temp.textContent = response.current_condition.tmp + "°C";
        condition.textContent = response.current_condition.condition;
        day.textContent = response.fcst_day_0.day_long + " " + response.fcst_day_0.date + " " + response.current_condition.hour;

        icon1.setAttribute("src", response.fcst_day_1.icon_big);
        temp1.textContent = "Temp. min" + " " + response.fcst_day_1.tmin + "°C";
        temp1M.textContent = "Temp. max" + " " + response.fcst_day_1.tmax + "°C";
        condition1.textContent = response.fcst_day_1.condition;
        day1.textContent = response.fcst_day_1.day_long + " " + response.fcst_day_1.date;

        icon2.setAttribute("src", response.fcst_day_2.icon_big);
        temp2.textContent = "Temp. min" + " " + response.fcst_day_2.tmin + "°C";
        temp2M.textContent = "Temp. max" + " " + response.fcst_day_2.tmax + "°C";
        condition2.textContent = response.fcst_day_2.condition;
        day2.textContent = response.fcst_day_2.day_long + " " + response.fcst_day_2.date;

        icon3.setAttribute("src", response.fcst_day_3.icon_big);
        temp3.textContent = "Temp. min" + " " + response.fcst_day_3.tmin + "°C";
        temp3M.textContent = "Temp. max" + " " + response.fcst_day_3.tmax + "°C";
        condition3.textContent = response.fcst_day_3.condition;
        day3.textContent = response.fcst_day_3.day_long + " " + response.fcst_day_3.date;

        for(city of cityTitles){
            city.textContent = response.city_info.name; 
        }
    }
};



request.open("GET", "https://www.prevision-meteo.ch/services/json/suce-sur-erdre");
request.send();


// for(let i = 1; i < 4; i++){
//     icon[i] = document.getElementById('icond+'[i]);
//     icon[i].setAttribute("src", response.fcst_day_+[i].icon_big);
// }
