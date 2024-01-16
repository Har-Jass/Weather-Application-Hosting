console.log('Chalo API dekhte hai kaise kaam karti hai?');

// ye meri API Key hai jo mujhe OpenWeather Website pe register krne pe mili hai
const API_Key = "050a413400968bbc04b0800e958fc0e3";

// jb bhi API ko call krte hai it means k Network pe ek call jaa rahi hai
// and Network pe call jana means uska confirm nahi hai k kb waha se response ayega or ayega bhi ya nahi ayega
// and hum uss API call ka response ka wait krte hue baaki processes ko hold pe nahi daal skte
// so we always call an API in async function so that baaki ke functions ko sacrifice na krna pde
async function showWeather() {
    // to see Weather of a particular location we have to give its Latitude & Longitude values
    // so we create 2 variable which shows Latitude & Longitude of that location
    // let latitude = 15.3333;
    // let longitude = 74.0833;

    // giving a city name to find its weather
    // we can also find the weather by giving the Latitude & Longitude value
    // lekin uske liye koi aur API call krni pdegi
    let city = "Delhi";
 
    // API ki call jaa rhi hai
    // API jo bhi response degi wo 'response' keyword me store ho jayega
    // API always gives a Promise in return
    // and iss API call me hum apna above mentioned 'city' name and 'API_Key' pass krr rhe hai
    // lekin jb tk hmari API response completely nahi deti
    // tb tk hum log aage ke processes ko wait krwayege using 'await' keyword
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`);

    // uska baad API ne jo humko Promise return kiya hai, we convert it into JSON format
    // and store it in 'data' named variable
    // lekin jb tk hmara response completely JSON me convert nahi ho jata
    // tb tk hum log aage ke processes ko wait krwayege using 'await' keyword
    const data = await response.json();

    // printing data on console
    console.log(city, 'Weather Data -> ', data);

    // now we are creating new paragraph element on document
    let newPara = document.createElement('p');

    // and in paragraph element we are storing the actual weather data which we will show on the document below
    newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;

    // now we are appending the paragraph element on our main document
    // and it will show the weather data on the UI
    document.body.appendChild(newPara);
}

// the best practice is to always use Try Catch Block while doing API call
// so that in case agr koi error aata hai to usko ache se Handle krr paye

// API -> TO GET WEATHER BASIS ON CITY
const cityAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

// API -> TO GET WEATHER BASIS ON CURRENT LOCATION, i.e., LATITUDE & LONGITUDE
let locationAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);