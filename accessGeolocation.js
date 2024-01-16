// this function will find the current location of the user
function getLocation() {
    // "if(navigator.geolocation)", this line means ke pehle user ke browser pe check kro
    // that Geolocation ki facility available hai bhi ya nahi
    // agr facility available hai to aage continue kro
    // wrna faltu me time waste krne ka fayeda nahi hai
    if(navigator.geolocation) {
        // agr geolocation ki facility available hai
        // to hum getCurrentPosition() method ke through uska use krke user ki location find out krenge
        // and getCurrentPosition() method me hum showPosition naam ka callback function pass krenge
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    // agr geolocation ki facility user ke browser pe available hi nahi hai to user ko console pe error show krdenge
    else {
        console.log('Error! No geolocation facility available at your location');
    }
}

function showPosition(position) {
    // jo user ki position hmare paas aayi hai
    // uss location me se latitude and longitude fetch krr lenge
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    // printing latitude & longitude on console window
    console.log(lat);
    console.log(long);
}