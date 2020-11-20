
let iteration = 0;

// Get Quote from API
async function getQuote() {

    if(iteration>15) return;
    // proxyUrl to avoid cors errors
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        // throw new Error;
    } 
    catch(error) {
        iteration++;
        console.log(`Error loading quote, iteration: ${iteration}`);
        getQuote();
    }
}

// On Load
getQuote();