const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    if(!loader.hidden){ // if loader.hidden is false
        quoteContainer.hidden = false; // show the quoteContainer
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote(){
    showLoadingSpinner();

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl + apiUrl) // make api call using headers from our proxy call
        const data = await response.json();

        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else{
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        } else{
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText;

        removeLoadingSpinner();
    } catch(error){
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();