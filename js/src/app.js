(function(){
        
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(geoSuccess, geoFailure,
            {
                enableHighAccuracy:true,
                maximumAge:30000,
                timeout:20000
            }
        );
    } else {
        speedo.textContent = "Geolocation is not supported by this browser :(";
    }

    function geoSuccess(position) {
        var data = {longitude: position.coords.longitude, latitude: position.coords.latitude, speed: position.coords.speed, heading: position.coords.heading};
        var speedo = document.querySelector('.win-h1');
        var compass = document.querySelector('.win-h2');
        WinJS.Binding.processAll(speedo, data);
        WinJS.Binding.processAll(compass, data);
        var bindingData = WinJS.Binding.as(data);
        calculateDistance(getCurrent("lat"), getCurrent("long"), data.latitude, data.longitude);
    }

    function geoFailure(error) {
        console.log("error");
    }

    function calculateDistance(currentLat, currentLong, lat, long){

    }

    function getCurrent(coord){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(Success, Failure);
        } else {
            speedo.textContent = "Geolocation is not supported by this browser :("; // Change for trip placeholder
        }
    }

})();