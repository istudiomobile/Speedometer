(function(){

    var locationCoords;
    var locationPool = [];
    var distance;

    function ShowAlert(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    }
        
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(geoSuccess, geoFailure,
            {
                enableHighAccuracy:true,
                maximumAge:30000,
                timeout:20000
            }
        );
    } else {
        ShowAlert("Geolocation is not supported by this browser :(");
    }

    function geoSuccess(position) {
        var dataSpeed = ((position.coords.speed)*3.6).toFixed(1);
        var dataHeading = (position.coords.heading).toFixed(1);
        var data = {longitude: position.coords.longitude, latitude: position.coords.latitude, speed: dataSpeed, heading: dataHeading};
        var speedo = document.querySelector('.win-h1');
        var compass = document.querySelector('.win-h2');
        WinJS.Binding.processAll(speedo, data);
        WinJS.Binding.processAll(compass, data);
        var bindingData = WinJS.Binding.as(data);
        saveLocation(data.latitude, data.longitude);
        //distance = calculateDistance();
    }

    function geoFailure(error) {
        console.log("error");
    }

    function calculateDistance(lastLat, lastLong, lat, long){
        if(locationPool[1]){
            var R = 6371; // km
            var dLat = (lat2 - lat1).toRad();
            var dLon = (lon2 - lon1).toRad(); 
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
            var d = R * c;
        }
        
        return d;
    }

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }

    function saveLocation(lat, long){
        locationPool.unshift([lat,long]);
    }    

})();