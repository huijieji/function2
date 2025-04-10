// // Console.founction( document)(Learn it from 6:50/39:00  https://www.youtube.com/watch?v=0ik6X4DJKCc)

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    

    const saveBtn = document.getElementById('saveBtn');
    const releaseBtn = document.getElementById('releaseBtn');
    const comfortBtn = document.getElementById('comfortBtn');
    const heartbreakMessage = document.getElementById('heartbreak-message');
    const entryList = document.getElementById('entry-list');
    const noEntries = document.getElementById('noEntries');
    const saveModal = document.getElementById('saveModal');
    const quoteModal = document.getElementById('quoteModal');
    const musicSection = document.getElementById('music-section');
    const modalQuote = document.getElementById('modalQuote');
    const quoteAuthor = document.getElementById('quoteAuthor');
    const nextQuoteBtn = document.getElementById('nextQuoteBtn');
    const spotifyPlayer = document.getElementById('spotify-player');
    const quoteLoading = document.getElementById('quote-loading');
    const mainQuote = document.getElementById('main-quote');
    
    // if it upload right verison
    if (!saveBtn || !releaseBtn || !comfortBtn) {
        console.error('Critical buttons not found in DOM');
        return;
    }
    
    // Variables to track current quotes
    let currentQuote = null;
    
    // Extract keywords from text
    function extractKeywords(text) {
        if (!text) return [];
        
        // Convert to lowercase
        text = text.toLowerCase();
        
        // Remove common punctuation
        text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        
        // Split into words
        const words = text.split(/\s+/);
        
        // Filter out common words 
        const stopWords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "don't", "should", "now"];
        
        const filteredWords = words.filter(word => {
            return word.length > 2 && !stopWords.includes(word);
        });
        
        // Look for key phrases
        const keyPhrases = ["break up", "moved on", "moving on", "self love", "self worth", "heart broken", "broken heart", "let go"];
        
        keyPhrases.forEach(phrase => {
            if (text.includes(phrase)) {
                filteredWords.push(phrase);
            }
        });
        
        return filteredWords;
    }
    
    // Find matching song based on keywords
    function findMatchingSong(keywords) {
        if (!keywords || keywords.length === 0) {
            // Return a random song if no keywords
            return songDatabase[Math.floor(Math.random() * songDatabase.length)];
        }
        
        // Score songs based on keyword matches
        const scoredSongs = songDatabase.map(song => {
            let score = 0;
            
            keywords.forEach(keyword => {
                // Check if keyword matches song title or artist
                if (song.title.toLowerCase().includes(keyword) || 
                    song.artist.toLowerCase().includes(keyword)) {
                    score += 5;
                }
                
                // Check if keyword is in song's keywords
                if (song.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                    score += 3;
                }
            });
            
            return { ...song, score };
        });
        
        // Sort by score 
        const sortedSongs = scoredSongs.sort((a, b) => b.score - a.score);
        
        // Return the best matching song or ramdonly
        if (sortedSongs[0].score > 0) {
            return sortedSongs[0];
        } else {
            return songDatabase[Math.floor(Math.random() * songDatabase.length)];
        }
    }
    
    // Find matching quote based on keywords
    function findMatchingQuote(keywords) {
        if (!keywords || keywords.length === 0) {
            // Return a random quote if no keywords
            return quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        }
        
        // Score quotes based on keyword matches
        const scoredQuotes = quoteDatabase.map(quote => {
            let score = 0;
            
            keywords.forEach(keyword => {
                // Check if keyword is in quote text
                if (quote.text.toLowerCase().includes(keyword)) {
                    score += 3;
                }
                
                // Check if keyword is in quote's keywords
                if (quote.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                    score += 5;
                }
            });
            
            return { ...quote, score };
        });
        
        // Sort by score 
        const sortedQuotes = scoredQuotes.sort((a, b) => b.score - a.score);
        
        // Return the best matching quote or ramdanly
        if (sortedQuotes[0].score > 0) {
            return sortedQuotes[0];
        } else {
            return quoteDatabase[Math.floor(Math.random() * quoteDatabase.length)];
        }
    }
    
    // Functions
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
    
    function loadEntriesFromLocalStorage() {
        const existingEntries = JSON.parse(localStorage.getItem('heartbreakEntries')) || [];
        
        if (existingEntries.length === 0) {
            return;
        }
        
        // Remove no entries message
        noEntries.style.display = 'none';
        
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
    
    // Event Listeners
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
        
        // Show the music section with Spotify player for this song
        musicSection.style.display = 'block';
        
        // Extract track ID from URI
        const trackId = matchingSong.uri.split(':')[2];
        
        // Set the iframe src to display the song
        spotifyPlayer.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
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
    
    nextQuoteBtn.onclick = function() {
        // Get new keywords from text excluding already used keywords
        const text = heartbreakMessage.value;
        const keywords = extractKeywords(text);
        
        // Filter out keywords that matched the current quote
        const filteredKeywords = keywords.filter(keyword => {
            if (!currentQuote) return true;
            
            // Don't filter if the keyword isn't in the current quote's keywords
            if (!currentQuote.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                return true;
            }
            
            // 50% chance to keep even if it matches (for variety)
            return Math.random() > 0.5;
        });
        
        // Find another matching quote
        const nextQuote = findMatchingQuote(filteredKeywords);
        
        // Make sure we don't get the same quote again
        if (currentQuote && nextQuote.text === currentQuote.text) {
            // Find a different quote
            const remainingQuotes = quoteDatabase.filter(q => q.text !== currentQuote.text);
            currentQuote = remainingQuotes[Math.floor(Math.random() * remainingQuotes.length)];
        } else {
            currentQuote = nextQuote;
        }
        
        // Update display
        modalQuote.textContent = currentQuote.text;
        quoteAuthor.textContent = `— ${currentQuote.author}`;
    };
    
    // Add event listeners to all close buttons
    const closeButtons = document.getElementsByClassName('close');
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        };
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    };
    
    // Load saved entries when page loads
    loadEntriesFromLocalStorage();
    
    console.log('Application initialized successfully');
});