const quoteContainer = document.getElementById('quote-container'); 
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

// Show New Quote
function newQuote() {
	showLoadingSpinner();
	// Pick a random quote from apiQuotes array
	//apiQuotes.length = 1643
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
	//Check if author field is blank and replace it with 'Unknown'
	if (!quote.author){
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}
	// Check Quote length to determine styling
	if(quote.text.length > 100) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	//Set Quote, Hide Loader
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
} 

// Get Quotes from API
async function getQuotes() {
	showLoadingSpinner();
	const apiUrl = 'https://type.fit/api/quotes'
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch error here
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// Share on Facebook
function FbShareQuote() {
	const FbUrl = `https://www.facebook.com/sharer/sharer.php
				   ?u=https://aspicy.github.io/quote-generator/
				   ?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(FbUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', FbShareQuote);

//On load
getQuotes();
