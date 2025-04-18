// This code was not copied from a single source - I learned and built it step by step from the mix: 
// - JavaScript tutorials from YouTube (Traversy Media) 
// - MDN docs for JS,DOM
// - I test and adjust based on how the mobile first 
// - Suggestions from classmates and debugging feedback from tests 
 
// Main functions I learned and implemented: 
// - DOMContentLoaded instead of window. Onload for better performance 
// - Use '.replace() ', '.split() ', '.filter() 'for dynamic keyword extraction and filtering 
// - I couldn’t safely hook into the Spotify API directly—sometimes it fails or needs a token
// - so I just saved the song info in a local data.js file and used fixed iframe links to make sure everything runs smoothly.
// - Match quotes and songs using the scoring logic of '.map() 'and'.sort() ' 
// - Use localStorage to save user logs （date）
// - Create modals and attach listeners with 'close()' and 'classList' 
 
// - I added comments throughout the code to explain what I was doing and why I chose certain methods. 
// - This helps me learn more deeply and also makes it easier to code a website from a beignnier.


//(Learn it from 6:50/39:00  https://www.youtube.com/watch?v=0ik6X4DJKCc)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');

    const saveBtn = document.getElementById('saveBtn');// The "save my feelings" button
    const releaseBtn = document.getElementById('releaseBtn'); // "Give me healing tunes" button
    const comfortBtn = document.getElementById('comfortBtn');// "Cheer me up" button
    const heartbreakMessage = document.getElementById('heartbreak-message');// Where you pour your heart out
    const entryList = document.getElementById('entry-list');// Container showing the list of saved emotional entries
    const noEntries = document.getElementById('noEntries');// Message shown when there are no saved entries
    const saveModal = document.getElementById('saveModal');// Modal popup shown after saving an entry
    const quoteModal = document.getElementById('quoteModal');// Modal popup that displays a motivational quote
    const musicSection = document.getElementById('music-section');// Section containing the embedded Spotify music player
    const modalQuote = document.getElementById('modalQuote');// The quote text shown inside the modal
    const quoteAuthor = document.getElementById('quoteAuthor');// Author of the displayed quote
    const nextQuoteBtn = document.getElementById('nextQuoteBtn');// Button to load the next quote
    const spotifyPlayer = document.getElementById('spotify-player');// Spotify player iframe or embed element
    const quoteLoading = document.getElementById('quote-loading');// Loader shown while a quote is being fetched
    const mainQuote = document.getElementById('main-quote');// Main quote displayed on the homepage 
    
    // Check if DOM elements loaded correctly
    // Safety check - because sometimes things just do not load right
    if (!saveBtn || !releaseBtn || !comfortBtn) {
        console.error('Critical buttons not found in DOM');
        return;
    }

    // Keeping track of the current quote - so we know what to show next
    let currentQuote = null;
    
    // These are 100% work with Spotify embed
    // Guaranteed working Spotify tracks - curated after testing many embeds
    // Many Spotify embeds would randomly fail, so I created this verified list
    //(Sometimes will shows Page not found We can’t seem to find the page you are looking for.
    const GUARANTEED_SONGS = [
        {
            title: "Easy On Me",
            artist: "Adele",
            embedUrl: "https://open.spotify.com/embed/track/0gplL1WMoJ6iYaPgMCL0gX?utm_source=generator"
        },
        {
            title: "Flowers",
            artist: "Miley Cyrus",
            embedUrl: "https://open.spotify.com/embed/track/0yLdNVWF3Srea0uzk55zFn?utm_source=generator"
        },
        {
            title: "Shape of You",
            artist: "Ed Sheeran",
            embedUrl: "https://open.spotify.com/embed/track/7qiZfU4dY1lWllzX7mPBI3?utm_source=generator"
        },

        {
            title: "All of Me",
            artist: "John Legend",
            embedUrl: "https://open.spotify.com/embed/track/3U4isOIWM3VvDubwSI3y7a?utm_source=generator"
        },
        {
            title: "Stay With Me",
            artist: "Sam Smith",
            embedUrl: "https://open.spotify.com/embed/track/5Nm9ERjJZ5oyfXZTECKmRt?utm_source=generator"
        },
        {
            title: "Blank Space",
            artist: "Taylor Swift",
            embedUrl: "https://open.spotify.com/embed/track/1p80LdxRV74UKvL8gnD7ky?utm_source=generator"
        },
        {
            title: "Lover",
            artist: "Taylor Swift",
            embedUrl: "https://open.spotify.com/embed/track/1dGr1c8CrMLDpV6mPbImSI?utm_source=generator"
        }
    ];
    // Delete some songs is not working from spotify, it shows not found on this page



    // Extract keywords from text
    // Learn from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
    // Learn how to: Clean up text with .replace() Split text with .split()Filter arrays with .filter()Search with .includes()
    //I used .replace() to remove punctuation, .split() to separate words, and .filter() to ignore stop words
    //@param {string} text - User's journal entry
    //@return {array} Array of extracted keywords/phrases
    function extractKeywords(text) {
        if (!text) return []; // Defensive programming
        
        // Normalize to lowercase - ensures consistent matching
        text = text.toLowerCase();
        
        // Remove common punctuation (regex from Stack Overflow after much testing)
        text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        
        // Split into words - \s+ handles multiple spaces/tabs
        const words = text.split(/\s+/);
        
        // Stop words list - modified from standard NLP lists
        // Kept some emotional words like "love" and "pain"
        const stopWords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "don't", "should", "now"];

        // Filter out stop words and short words
        const filteredWords = words.filter(word => {
            return word.length > 2 && !stopWords.includes(word);
        });
        
        // Special phrases - added after analyzing user entries
        const keyPhrases = ["break up", "moved on", "moving on", "self love", "self worth", "heart broken", "broken heart", "let go"];

        // Check for multi-word phrases
        keyPhrases.forEach(phrase => {
            if (text.includes(phrase)) {
                filteredWords.push(phrase);
            }
        });
        
        return filteredWords;
    }

    // Get a random guaranteed song
    function getRandomGuaranteedSong() {
        return GUARANTEED_SONGS[Math.floor(Math.random() * GUARANTEED_SONGS.length)];
    }
    

                
    // Sort by score (highest first)
    // learn from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    //The sort() method of Array instances sorts the elements of an array in place and returns the reference to the same array, now sorted. 
    scoredSongs.sort((a, b) => b.score - a.score);
       }
       
    // If we found a good match in the data( Try to find the best-scored song by title or artist)
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    //learn about Array.prototype.find() which is the method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.


// Get a random quote
// Returns a random quote — fallback if quoteDatabase is missing
// I added this so the mobile or website will not break even if the quote data fails to load
// Learned about Math.random() and array indexing to safely get a random item
    function getRandomQuote() {
        if (typeof quoteDatabase !== 'undefined' && Array.isArray(quoteDatabase)) {
            return quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        } else {
            // Fallback quotes if quoteDatabase is not available
            const fallbackQuotes = [
                { text: "The greatest healing therapy is friendship and love.", author: "Hubert H. Humphrey" },
                { text: "Hearts will never be practical until they can be made unbreakable.", author: "L. Frank Baum" },
                { text: "The emotion that can break your heart is sometimes the very one that heals it.", author: "Nicholas Sparks" },
                { text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.", author: "Tori Amos" },
                { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha" }
            ];
            return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        }
    }

    // learn about Array.prototype.map()https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    // Find matching quote based on keywords
    // This function scores each quote based on how well it matches the user’s keywords
    // I used .map() to go through each quote, and added points based on keyword match in the quote text or tag list
    // Then I used .sort() to bring the best match to the top
    // This was my first time writing a recommendationstyle algorithm

    function findMatchingQuote(keywords) {
        if (!keywords || keywords.length === 0 || typeof quoteDatabase === 'undefined' || !Array.isArray(quoteDatabase)) {
            return getRandomQuote();
        }
        
        try {
            // Score quotes based on keyword matches
            const scoredQuotes = quoteDatabase.map(quote => {
                let score = 0;
                
                keywords.forEach(keyword => {
                    // Check if keyword is in quote text
                    if (quote.text && quote.text.toLowerCase().includes(keyword)) {
                        score += 3;
                    }
                    
                    // Check if keyword is in quote's keywords
                    if (quote.keywords && Array.isArray(quote.keywords) && 
                        quote.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                        score += 5;
                    }
                });
                
                return { ...quote, score };
            });
            
            // Sort by score (highest first)
            const sortedQuotes = scoredQuotes.sort((a, b) => b.score - a.score);
            
            // Return the best match if available
            if (sortedQuotes.length > 0 && sortedQuotes[0].score > 0) {
                return sortedQuotes[0];
            }
        } catch (error) {
            console.error("Error while finding matching quote:", error);
        }
        
        // Fallback to random quote
        return getRandomQuote();
    }

// learn from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
// When the user clicks "Save", this function stores the journal entry with the current date & time
// I also store it in localStorage using JSON.stringify so it stays after refreshing

    function saveEntry() {
        console.log('Saving entry...');
        const messageText = heartbreakMessage.value.trim();
        if (!messageText) return;
        
        // Remove no entries message if visible
        if (noEntries.style.display !== 'none') {
            noEntries.style.display = 'none';
        }
        
        // Create a new entry
        const now = new Date();
        const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        
        // Create new entry HTML
        const entryItem = document.createElement('div');
        entryItem.className = 'entry-item';
        entryItem.innerHTML = `
            <div class="entry-date">${formattedDate}</div>
            <div class="entry-text">${messageText}</div>
        `;
        
        // Add to the beginning of the list
        entryList.insertBefore(entryItem, entryList.firstChild);
        
        // Save to localStorage
        saveToLocalStorage(formattedDate, messageText);
        
        // Get keywords and update main quote based on the entry
        const keywords = extractKeywords(messageText);
        const matchingQuote = findMatchingQuote(keywords);
        mainQuote.textContent = matchingQuote.text;
        
        // Clear the textarea
        heartbreakMessage.value = '';
        
        // Show success modal
        openModal(saveModal);
    }
    
    // learn from https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    // Window: localStorage property：ead-only property of the window interface allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.
    function saveToLocalStorage(date, text) {
        // Get existing entries or initialize empty array
        const existingEntries = JSON.parse(localStorage.getItem('heartbreakEntries')) || [];
        
        // Add new entry
        existingEntries.unshift({
            date: date,
            text: text
        });
        
        // Save back to localStorage
        localStorage.setItem('heartbreakEntries', JSON.stringify(existingEntries));
    }
    
// On page load, this function checks if there are saved entries in localStorage
// If yes, it rebuilds the journal history in the UI
// This taught me how to read and parse data from localStorage and dynamically create elements in JS

    function loadEntriesFromLocalStorage() {
        const existingEntries = JSON.parse(localStorage.getItem('heartbreakEntries')) || [];
        
        if (existingEntries.length === 0) {
            return;
        }
        
        // Remove no entries message
        noEntries.style.display = 'none';
        
        // learnfrom https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        //Document: createElement() method:createElement(localName)createElement(localName, options)
        // Add each entry to the list
        existingEntries.forEach(entry => {
            const entryItem = document.createElement('div');
            entryItem.className = 'entry-item';
            entryItem.innerHTML = `
                <div class="entry-date">${entry.date}</div>
                <div class="entry-text">${entry.text}</div>
            `;
            entryList.appendChild(entryItem);
        });
    }
    
    function openModal(modal) {
        modal.style.display = 'block';
    }
    
    function closeModal(modal) {
        modal.style.display = 'none';
    }


// This part dynamically sets the Spotify iframe to the selected song
// I added an error fallback system here.
// If the embed URL fails to load, it switches to a guaranteed working song

    // Load a song directly with its embed URL
    function loadSong(embedUrl) {
        // Safety checks
        if (!embedUrl || !spotifyPlayer) {
            console.error("Cannot load song: Missing embed URL or player element");
            loadFallbackSong();
            return;
        }
        
        console.log("Loading spotify embed:", embedUrl);
        
        // Set iframe src directly to embed URL
        spotifyPlayer.src = embedUrl;
        
        // Add error handling
        spotifyPlayer.onerror = function() {
            console.error("Spotify iframe error detected");
            loadFallbackSong();
        };
    }
    
    // Load a known working fallback song
    function loadFallbackSong() {
        console.log("Loading fallback song");
        const fallbackSong = getRandomGuaranteedSong();
        spotifyPlayer.src = fallbackSong.embedUrl;
    }
    
    // Event Listeners - using onclick for more stable binding
    saveBtn.onclick = function() {
        console.log('Save button clicked');
        saveEntry();
    };
    
    releaseBtn.onclick = function() {
        console.log('Release button clicked');
        const text = heartbreakMessage.value;
        const keywords = extractKeywords(text);
        console.log("Extracted keywords for song:", keywords);
        
        // Find best matching song based on keywords
        const matchingSong = findMatchingSong(keywords);
        console.log("Selected song:", matchingSong.title, "by", matchingSong.artist);
        
        // Show the music section
        musicSection.style.display = 'block';
        
        // Load the song with embed URL
        loadSong(matchingSong.embedUrl);
    };
    
    comfortBtn.onclick = function() {
        console.log('Comfort button clicked');
        const text = heartbreakMessage.value;
        const keywords = extractKeywords(text);
        console.log("Extracted keywords for quote:", keywords);
        
        // Find best matching quote based on keywords
        const matchingQuote = findMatchingQuote(keywords);
        console.log("Selected quote:", matchingQuote.text);
        
        // Show loading
        quoteLoading.style.display = 'block';
        modalQuote.style.display = 'none';
        quoteAuthor.style.display = 'none';
        
        // Show quote modal
        openModal(quoteModal);
        
        // Simulate quote loading from API
        setTimeout(function() {
            quoteLoading.style.display = 'none';
            modalQuote.style.display = 'block';
            quoteAuthor.style.display = 'block';
            
            // Set the current quote
            currentQuote = matchingQuote;
            modalQuote.textContent = currentQuote.text;
            quoteAuthor.textContent = `— ${currentQuote.author}`;
        }, 1000);
    };

    //learn form https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
    //Element: click event: Use the event name in methods like addEventListener(), or set an event handler property.
    //These are the main button click events
   // I learned how to use onclick and access values from the textarea
   // Also connected each user action to different app features (saving entries, playing music, or showing quotes)

    nextQuoteBtn.onclick = function() {
        // Get new keywords from text excluding already used keywords
        const text = heartbreakMessage.value;
        const keywords = extractKeywords(text);
        
        // Filter out keywords that matched the current quote
        const filteredKeywords = keywords.filter(keyword => {
            if (!currentQuote) return true;
            
            //learn from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
            //Array.prototype.some() some(callbackFn)some(callbackFn, thisArg)
            // Don't filter if the keyword isn't in the current quote's keywords
            if (!currentQuote.keywords || !currentQuote.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                return true;
            }
            
            // 50% chance to keep even if it matches (for variety)
            return Math.random() > 0.5;
        });

        //learn from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        //Array.prototype.filter() creates a shallow copy of a portion of a given array
        // Find another matching quote
        const nextQuote = findMatchingQuote(filteredKeywords);
        
        // Make sure we don't get the same quote again
        if (currentQuote && nextQuote.text === currentQuote.text && typeof quoteDatabase !== 'undefined') {
            // Find a different quote
            const remainingQuotes = quoteDatabase.filter(q => q.text !== currentQuote.text);
            if (remainingQuotes.length > 0) {
                currentQuote = remainingQuotes[Math.floor(Math.random() * remainingQuotes.length)];
            } else {
                currentQuote = nextQuote;
            }
        } else {
            currentQuote = nextQuote;
        }
        
        // Update display
        modalQuote.textContent = currentQuote.text;
        quoteAuthor.textContent = `— ${currentQuote.author}`;
    };
    //learn it from https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    //Element: closest() method Syntaxclosest(selectors)A string of valid CSS selectors to match the Element and its ancestors against.
    // Add event listeners to all close buttons
    const closeButtons = document.getElementsByClassName('close');
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        };
    }

    //learn it from https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
    //Element: classList property: read-only property that returns a live DOMTokenList collection of the class attributes of the element. This can then be used to manipulate the class list.
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    };
}); 