var APIkey = "100700da191d5fcef4a84a0273305b78";

function getLatLonData(lat,lon){
    var queryUrl = `http://api.openweathermap.org/data/2.5/find?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}`;
    $.ajax({
        url: queryUrl,
        method: "GET",
        success: function(response){
            $
        }
    })
}