// --> FETCHING ALL THE NEEDED ELEMENTS
// sbse pehle jin jin elements me JS ke through changes honge wo sb elements fetch krne pdege
// fetching the tabs, i.e., Your Weather and Search Weather
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");

// fetching the whole weather container
// which shows grant access page, user location weather page and search weather page
const userContainer = document.querySelector(".weather-container");

// fetching grant location wala page
const grantAccessContainer = document.querySelector(".grant-location-container");

// fetching search weather wala page
const searchForm = document.querySelector(".form-container");

//fetching loading wale GIF wala page
const loadingScreen = document.querySelector(".loading-container");

// fetching user ki weather information show krne wala page
const userInfoContainer = document.querySelector(".user-info-container");


// --> INITIAL VARIABLES WE NEED
// we need a current tab variable which stores that hum kis tab pe stand krr rhe hai
// suppose agr dusre tab pe jump krne ki need pdti hai to humko pehle pta hona chahiye ke hmara current tab konsa hai
// and initially we suppose that current tab jo hai wo user tab ke equal hai
let currentTab = userTab;

// we also need our API key to call API's
const API_KEY = "050a413400968bbc04b0800e958fc0e3";

// hum jis bhi tab pe hote hai uske uparr ek grey color ki highlighting show krne ke liye properties
// jo bhi hmara current tab hoga uske ander hum uss tab ki properties add krdenge
// and "current-tab" ki hmne kuch properties already add kri hui hai
currentTab.classList.add("current-tab");

// application start hote hi sbse pehle "Your Weather" wala page render hoga
// so sbse pehla task ye hoga ke hum pehle session storage me check krenge k agr user ke coordinates present hai ya nahi
// agr pehle se present hai to direct weather wala page show krenge
// otherwise grant access wala page show krenge
// coordinates present hai ya nahi uske liye getFromSessionStorage() wala function call krenge
getFromSessionStorage();


// SWITCHING BETWEEN "Your Weather" & "Search Weather" Tab
// jis bhi tab pe click krenge wo as a parameter iss function me aa jayega
function switchTab(clickedTab) {
    // lekin tab switching se pehle hmko ye check krna pdega that kahi hum jis tab pe the uspe hi to click nahi krdiya
    // it means clickedTab agr currentTab ke equal nahi hoga tbhi tab switch krenge
    if(clickedTab != currentTab) {
        // jaise hi tab switch hota hai sbse pehle tab ke upar se grey highlighting htado
        currentTab.classList.remove("current-tab");

        // and tab switching hote hi hmara currentTab jo hai wo clickedTab ke equal ho gaya
        currentTab = clickedTab;

        // and tab switch hone ke baad hmne apne new tab pe wapis se grey color add krdiya
        currentTab.classList.add("current-tab");

        // ab koi bhi tab ki information dikhane se pehle hum check krenge ke hum kis tab pe khde hai, tbhi uss tab se related UI show krenge
        // below line means that agr searchForm ki classList active nahi hai
        // means agr hum search form wali screen pe nahi khde hai
        // to hme ab search form wali screen pe switch krna hai
        if(!searchForm.classList.contains("active")) {
            // ab search form wale page pe jane ke liye hmko pehle grant access wale page ko hide krna pdega
            // and user ki weather information show krne wale page ko hide krna pdega
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");

            // and ab hum apne search form wale page ko show krenge means uski classList me active add krdenge
            searchForm.classList.add("active");
        }
        // agr hum already search form wali screen pe khde hai
        // to it means humko search wale page ko hide krke your weather wale tab ko visible krwana hai
        else {
            // search form wale page ki classList se active ko remove krdenge
            searchForm.classList.remove("active");

            // agr hmne koi city search kri hui hai to usme bhi city ka weather info show ho rha hoga to uss city wale weather info ko bhi hide krna hoga
            userInfoContainer.classList.remove("active");

            // ab hum your weather wale page ko show krenge
            // agr iss page pe backend me already user ki location ki coordinates saved hai to user info wala container show hoga
            // to location coordinates already stored hai ya nahi wo check krne ke liye hum ek function bnayege
            getFromSessionStorage();
        }
    }
}

// agr user tab pe click hoga to uspe bhi event listener lgayege
// userTab pe event listener lgana, means userTab pe jaise hi click ho to user tab show krdo
userTab.addEventListener("click", function() {
    // we have a function to switching between tabs and we are passing clicked tab as a parameter, i.e., jis bhi tab pe hmne click kiya hai
    // wo tab as a parameter pass hoga iss switchTab() function me
    switchTab(userTab);
});

// agr search tab pe click kiya hoga to uspe bhi event listener lgayege
// searchTab pe event listener lgana, means searchTab pe jaise hi click ho search tab show krdo
searchTab.addEventListener("click", function() {
    switchTab(searchTab);
});

// checking if user's current location coordinates is already present in session storage or not
function getFromSessionStorage() {
    // check krenge that session me user ke coordinates already stored hai ya nahi
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    
    // agr session storage ke ander user ke coordinates mil jayege to wo localCoordinates variable ke ander aa jayege
    if(!localCoordinates) {
        // agr local coordinates nahi mile, means user ki location session me saved nahi hai
        // and agr location save nahi hai to hu grant access wala page show krenge, user ki location lene ke liye
        // to grant access wale page ko show krne ke liye grantAccessContainer ki classList me active add krdenge
        grantAccessContainer.classList.add("active");
    }
    else {
        // agr user ki location already session me saved hai
        // means user ki current location ke latitude & longitude already available hai
        // to unko use krke API call krdo
        // converting localCoordinates to JSON object
        // JSON.parse() method JSON String ko JSON Object me convert krta hai
        const coordinates = JSON.parse(localCoordinates);

        // calling a function which is fetching user's location weather using the given coordinates
        // ye function API call krke user ki weather ka data leke ayega
        // and API call krne ke liye hmara function async hona important hai
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    // fetching latitude & longitude from coordinates
    const {lat, lon} = coordinates;

    // and agr hum API call krr rhe hai to jitna time API user ke weather ko fetch krne me legi
    // utni der tk hume user ko loading wala GIF dikhana pdega
    // and loading wala GIF dikhane ke liye grant location wala page hide krna pdega
    // to sbse pehle grant location wale page ko hide krenge
    grantAccessContainer.classList.remove("active");

    // grant access wala page hide krne ke baad loading ke GIF wala page show krna pdega
    loadingScreen.classList.add("active");

    // ab loading screen dikhane ke baad API call krenge jo latitude and longitude ka use krke weather information leke ayegi
    try {
        // jb tk API data ko leke nahi aa jati tb tk wait krenge
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        // now converting the response in JSON format
        // and jb tk convert ho rha h tb tk wait krenge
        const data = await response.json();

        // API call ki side se saara data successfully aa gaya hai
        // to ab jo loader hum dikha rhe the user ko wo hide krna pdega
        loadingScreen.classList.remove("active");

        // ab loading screen htane ke baad weather information ko show krna pdega
        userInfoContainer.classList.add("active");

        // ab user ko UI show to ho gaya lekin jo API data leke aayi hai
        // usko show bhi to krna pdega
        // to data ko render krne ke liye hum ek function ka use krenge
        // jo API se laaye hue data ko screen pe show krega
        // ye function hmare data me se values nikaal ke UI me put in krega
        renderWeatherInfo(data);
    }
    catch(e) {
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo) {
    // sbse pehle jaha jaha bhi humko data ko UI pe put in krna hai unn saare elements ko fetch krna pdega
    // UI pe humko city name, country icon, description, weather icon, temperature, windspeed, humidity and cloudiness ka data dikhana hai
    // to pehle saare elements ko fetch krenge
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDescription]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temperature]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]")
    const cloudiness = document.querySelector("[data-cloudiness]");

    // uparr jitne bhi hmne elements fetch kiye hai unn sbke ander API call se jo data aaya hai wo put in krenge
    // fetch values from weatherInfo object and put in UI elements
    // ab jo hmara API ne weather info return kri hai usme se data ko fetch krna hai
    // ab hum API ke return ko JSON object me convert kiya h
    // now it is possible ke uss JSON object ke ander multiple JSON objects present ho
    // to aise cases me jb bhi humko API ke return me se data fetch krna ho
    // wo use Optional Chaining Operator(?.), this Operator makes it easier to safely access nested properties and methods of an object
    // means we can easily fetch nested properties from a JSON object using Optional Chaining Operator
    // and agr koi property exist nahi krti JSON ke object me to ye operator error nahi dega
    // instead ye Undefined return krdega
    // now we have the data in weatherInfo object
    // so now we fetch data from weatherInfo object
    // the below line means, weatherInfo me se name fetch krlo
    // "?." this means we don't know that name property exist in weatherInfo or not
    // and name fetch krke cityName ki innerText property ka use krke element me value daal do
    cityName.innerText = weatherInfo?.name;

    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText = weatherInfo?.weather?.[0]?.description;

    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.innerText = `${weatherInfo?.main?.temp}°C`;

    windspeed.innerText = `${weatherInfo?.wind?.speed}m/s`;

    humidity.innerText = `${weatherInfo?.main?.humidity}%`;

    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;
}

// jaise ki user grant access wale button pe click hoga iss function ko call jayegi
// and ye function geolocation API ka use krke user ki location find out krke layega
function getLocation() {
    // sbse pehle check krenge ke user ke browser pe geolocation ki facility supported hai ya nahi
    if(navigator.geolocation) {
        // agr geolocation ki facility available hai
        // to hum getCurrentPosition() method ke through uska use krke user ki location find out krenge
        // and getCurrentPosition() method me hum showPosition naam ka callback function pass krenge
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        grantAccessButton.style.display = 'none';
    }
}

function showPosition(position) {
    // creating a userCoordinates named object
    const userCoordinates = {
        // jo user ki position hmare paas aayi hai
        // uss location me se latitude and longitude fetch krr lenge
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    // ab humko user ki location ke coordinates mil gaye hai to usko session storage me store krdenge
    // user ke coordinates ko JSON String me convert krke save krenge
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

    // ab user ne location ka access de diya hai to uski information ko fetchUserWeatherInfo() method ka use krke show krdenge
    fetchUserWeatherInfo(userCoordinates);
}


// now whenever a user clicks on grant access button, we find out user's location using geolocation API
// after finding user's location we store its location in session storage
// for that we have to apply event listener on the grant access button
const grantAccessButton = document.querySelector("[data-grantAccess]");

// ab button ke click event pe listener apply krenge
// jaise hi grant access wale button pe click hoga getLocation() function ko call jayegi
grantAccessButton.addEventListener("click", getLocation);


// search wale page pe jo input field hai jo bhi usme fill krega wo fetch krna pdega
let searchInput = document.querySelector("[data-searchInput]");

// ab jaise hi user search form page pe jayega and city ka name fill krke submit krega
// to search button pe bhi event listener lgega
searchForm.addEventListener("submit", function(e) {
    // sbse pehle jo bhi uss button ka default action hoga usko remove krenge
    e.preventDefault();

    // agr user ne search input me empty string fill kri hai to bina kch kiye return krna pdega
    if(searchInput.value === "") {
        return;
    }
    
    // agr user ne search input field me kch fill kiya hai
    // to hum ek function call krenge jo uss city ke basis pe API call krega and uss city ki weather info fetch krega
    fetchSearchWeatherInfo(searchInput.value);
});

// hum iss function ke ander API call krr rhe honge, isliye hum isko async bna denge
async function fetchSearchWeatherInfo(city) {
    // jb tk API call jayegi tb tk user ko loading screen show krni pdegi
    loadingScreen.classList.add("active");

    // and jo bhi hmara purana weather agr uss screen pe show ho rha tha usko hide krna pdega
    userInfoContainer.classList.remove("active");

    // agr grant access wala page bhi show ho rha tha to usko bhi remove krenge
    grantAccessContainer.classList.remove("active");

    // ab hum city ke basis pe API call krenge and weather info fetch krenge
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        // jaise hi city ka weather data aa jayega API ke through uske baad sbse pehle loader remove krenge
        loadingScreen.classList.remove("active");
        
        // ab humko weather show krna hai to pehle weather container ko show krna pdega and uske baad jo information API se aayi hai
        // usko render krna pdega
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(e) {
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.remove("active");
    }
} 