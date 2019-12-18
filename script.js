var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        
        const city = document.querySelector('h3');

        const temp = document.getElementById('city-temp');
        const temp2 = document.getElementById('city-tempd1');
        const temp2M = document.getElementById('city-tempd12');
        const temp3 = document.getElementById('city-tempd2');
        const temp3M = document.getElementById('city-tempd22');
        const temp4 = document.getElementById('city-tempd3');
        const temp4M = document.getElementById('city-tempd32');

        const condition = document.getElementById('city-condition');
        const condition2 = document.getElementById('city-conditiond1');
        const condition3 = document.getElementById('city-conditiond2');
        const condition4 = document.getElementById('city-conditiond3');

        const icon = document.getElementById('icon');
        const icon2 = document.getElementById('icond1');
        const icon3 = document.getElementById('icond2');
        const icon4 = document.getElementById('icond3');

        const day = document.getElementById('day-time');
        const day2 = document.getElementById('day-timed1');
        const day3 = document.getElementById('day-timed2');
        const day4 = document.getElementById('day-timed3');

        condition.textContent = response.current_condition.condition;
        condition2.textContent = response.fcst_day_1.condition;
        condition3.textContent = response.fcst_day_2.condition;
        condition4.textContent = response.fcst_day_3.condition;

        city.textContent = response.city_info.name;

        temp.textContent = response.current_condition.tmp + "°C";
        temp2.textContent = "Temp. min" + " " + response.fcst_day_1.tmin + "°C";
        temp2M.textContent = "Temp. max" + " " + response.fcst_day_1.tmax + "°C";
        temp3.textContent = "Temp. min" + " " + response.fcst_day_2.tmin + "°C";
        temp3M.textContent = "Temp. max" + " " + response.fcst_day_2.tmax + "°C";
        temp4.textContent = "Temp. min" + " " + response.fcst_day_3.tmin + "°C";
        temp4M.textContent = "Temp. max" + " " + response.fcst_day_3.tmax + "°C";

        icon.setAttribute("src", response.current_condition.icon_big);
        icon2.setAttribute("src", response.fcst_day_1.icon_big);
        icon3.setAttribute("src", response.fcst_day_2.icon_big);
        icon4.setAttribute("src", response.fcst_day_3.icon_big);

        day.textContent = response.fcst_day_0.day_long + " " + response.fcst_day_0.date;
        day2.textContent = response.fcst_day_1.day_long + " " + response.fcst_day_1.date;
        day3.textContent = response.fcst_day_2.day_long + " " + response.fcst_day_2.date;
        day4.textContent = response.fcst_day_3.day_long + " " + response.fcst_day_3.date;
    }
};
request.open("GET", "https://www.prevision-meteo.ch/services/json/suce-sur-erdre");
request.send();



