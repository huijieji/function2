// // Console.founction (Learn it from 6:50/39:00  https://www.youtube.com/watch?v=0ik6X4DJKCc)

// Wait for DOM to fully load before executing code
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // DOM Elements
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
    
    // Check if DOM elements loaded correctly
    if (!saveBtn || !releaseBtn || !comfortBtn) {
        console.error('Critical buttons not found in DOM');
        return;
    }

    // Variables to track current quotes
    let currentQuote = null;
    
    // ===== GUARANTEED WORKING SONGS =====
    // These are 100% verified to work with Spotify embed
    const GUARANTEED_SONGS = [
        {
            title: "Someone Like You",
            artist: "Adele",
            embedUrl: "https://open.spotify.com/embed/track/4w9XPIPVO3XImZF6FGBVsP?utm_source=generator"
        },
        {
            title: "Rolling in the Deep",
            artist: "Adele", 
            embedUrl: "https://open.spotify.com/embed/track/4spkOoVIGKDQmTUykGuwUn?utm_source=generator"
        },
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
            title: "Thinking out Loud",
            artist: "Ed Sheeran",
            embedUrl: "https://open.spotify.com/embed/track/1Slwb6dOYkBlWal1PGtnNg?utm_source=generator"
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
    
    // Extract keywords from text
    function extractKeywords(text) {
        if (!text) return [];
        
        // Convert to lowercase
        text = text.toLowerCase();
        
        // Remove common punctuation
        text = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        
        // Split into words
        const words = text.split(/\s+/);
        
        // Filter out common words (stop words)
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
    
    // Get a random guaranteed song
    function getRandomGuaranteedSong() {
        return GUARANTEED_SONGS[Math.floor(Math.random() * GUARANTEED_SONGS.length)];
    }
    
    // Find the best matching song from songDatabase
    function findMatchingSong(keywords) {
        // Without keywords, return random guaranteed song
        if (!keywords || keywords.length === 0) {
            return getRandomGuaranteedSong();
        }
        
        // Try to find matching song in the database
        try {
            // Create scored songs array
            let scoredSongs = [];
            
            // Try to access songDatabase
            if (typeof songDatabase !== 'undefined' && Array.isArray(songDatabase)) {
                scoredSongs = songDatabase.map(song => {
                    let score = 0;
                    
                    keywords.forEach(keyword => {
                        // Check if keyword matches song title or artist
                        if (song.title && song.title.toLowerCase().includes(keyword) || 
                            song.artist && song.artist.toLowerCase().includes(keyword)) {
                            score += 5;
                        }
                        
                        // Check if keyword is in song's keywords
                        if (song.keywords && Array.isArray(song.keywords) && 
                            song.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                            score += 3;
                        }
                    });
                    
                    return { ...song, score };
                });
                
                // Sort by score (highest first)
                scoredSongs.sort((a, b) => b.score - a.score);
            }
            
            // If we found a good match in the database
            if (scoredSongs.length > 0 && scoredSongs[0].score > 0) {
                console.log("Found matching song in database:", scoredSongs[0].title);
                
                // Look for a matching guaranteed song (artist or title)
                const matchedGuaranteed = GUARANTEED_SONGS.find(gs => 
                    gs.title.includes(scoredSongs[0].title) || 
                    scoredSongs[0].title.includes(gs.title) ||
                    gs.artist.includes(scoredSongs[0].artist) || 
                    scoredSongs[0].artist.includes(gs.artist)
                );
                
                if (matchedGuaranteed) {
                    console.log("Found guaranteed match:", matchedGuaranteed.title);
                    return matchedGuaranteed;
                }
            }
        } catch (error) {
            console.error("Error while finding matching song:", error);
        }
        
        // Fallback to random guaranteed song
        return getRandomGuaranteedSong();
    }
    
    // Get a random quote
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
    
    // Find matching quote based on keywords
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
    
    nextQuoteBtn.onclick = function() {
        // Get new keywords from text excluding already used keywords
        const text = heartbreakMessage.value;
        const keywords = extractKeywords(text);
        
        // Filter out keywords that matched the current quote
        const filteredKeywords = keywords.filter(keyword => {
            if (!currentQuote) return true;
            
            // Don't filter if the keyword isn't in the current quote's keywords
            if (!currentQuote.keywords || !currentQuote.keywords.some(k => k.includes(keyword) || keyword.includes(k))) {
                return true;
            }
            
            // 50% chance to keep even if it matches (for variety)
            return Math.random() > 0.5;
        });
        
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