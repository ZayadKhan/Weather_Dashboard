var APIKey = "100700da191d5fcef4a84a0273305b78";

function getUVData(lat, lon){
	var queryURL = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;
	$.ajax({
		url: queryURL, 
		method: "GET", 
		success: function(response){
			$("#uv").text(`UV Index:${response.value}`);
			if(response.value < 2){
				$("#uv").css({"background-color": "blue", "color": "white"});
			}else if(response.value < 7){
				$("#uv").css({"background-color": "blue", "color": "white"});
			}else{
				$("#uv").css({"background-color": "blue", "color": "white"});
			};
		}
	});
};


function convertDate(date){
	var newDate = new Date(0); 
	newDate.setUTCSeconds(date);
	newDate = newDate.toDateString();

	return newDate;
};

function storeLastCity(city){
	localStorage.setItem("city",city);
};

function renderPage(){
	var city = localStorage.getItem("city")
	getOneDayData(city);
	getFiveDayData(city);

}


function getOneDayData(city){
	var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
	$.ajax({
      	url: queryURL,
      	method: "GET", 
      	success: function(response){
	      	var latCoord = response.coord.lat; 
	    	var lonCoord = response.coord.lon;

	    	getUVData(latCoord, lonCoord);

	    	$("#city").html(`${response.name} ${convertDate(response.dt)} <img src=https://openweathermap.org/img/w/${response.weather[0].icon}.png alt=WeatherIcon>`);
	    	$("#temp").html(`Temperature: ${convertToF(response.main.temp)}&#176;F`);
	    	$("#humid").text(`Humidity: ${response.main.humidity}%`); 
	    	$("#wind").text(`Wind Speed: ${response.wind.speed} MPH`); 
      	}
    });
};

function getFiveDayData(city){
	var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`
	$.ajax({
		url:queryURL, 
		method: "GET", 
		success: function(response){
			var idCounter = 1; 
			for(var i=0; i<response.list.length; i++){
				if(response.list[i].dt_txt.includes("12:00:00")){
					var date = convertDate(response.list[i].dt)
					$(`#date${idCounter}`).text(date);
					$(`#img${idCounter}`).attr({"src": `https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png`, "alt": "WeatherIcon"})
					$(`#temp${idCounter}`).html(`Temperature: ${convertToF(response.list[i].main.temp)}&#176;F`);
					$(`#humid${idCounter}`).text(`Humidity: ${response.list[i].main.humidity}%`); 
					idCounter++;
				};
			};
		}
	});
};

function convertToF(temp){
	return Math.floor((temp - 273.15) * 1.80 + 32);
};

$(".searchbtn").on("click", function(event){
	event.preventDefault();
	var city = $("#cityname").val();
	$("#cityname").val("");
	var listItem = $("<button>").attr({"class": "list-group-item list-group-item-action prevsearch", "type": "button"}).text(city)
	$(".prev-searched-city").prepend(listItem);

	getOneDayData(city);
	getFiveDayData(city);
	storeLastCity(city); 

}); 

$(document).on("click", ".prevsearch", function(){
	var city = $(this).text();
	getOneDayData(city);
	getFiveDayData(city);
});

renderPage();