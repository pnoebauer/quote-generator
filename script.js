const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

//API sometimes returns errors; run additional requests
let iteration = 0;

// Get Quote from API
async function getQuote() {

    // console.log(iteration, this, newQuoteButton, this===newQuoteButton);
    //reset iteration to zero after each click
    if(this===newQuoteButton) {
        iteration = 0;
    }

    // do not run more than 15 iterations for the API request in case of an error
    if(iteration>15) return;
    // proxyUrl to avoid cors errors
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        
        //if Author is blank, add 'Unknown'
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //reduce quote size if the quote is long
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }
        else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        
        // console.log(data);
        // throw new Error;
    } 
    catch(error) {
        iteration++;
        console.log(`Error loading quote, iteration: ${iteration}`);
        getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    //open twitterUrl in new tab
    window.open(twitterUrl, '_blank');
}

// On Load
getQuote();

// Load a new quote when the button is clicked
newQuoteButton.addEventListener('click', getQuote);

// Button to tweet quote
twitterButton.addEventListener('click', tweetQuote);