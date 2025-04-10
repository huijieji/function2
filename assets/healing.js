// Console.founction( document)(Learn it from 6:50/39:00  https://www.youtube.com/watch?v=0ik6X4DJKCc)
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

// Song from spotify keyword matching
	   const songDatabase = [
		{
			title: "Someone Like You",
			artist: "Adele",
			uri: "spotify:track:4w9XPIPVO3XImZF6FGBVsP",
			keywords: ["miss", "ex", "over", "move on", "past", "adele", "heartbreak", "sad", "lost"]
		},
		{
			title: "Fix You",
			artist: "Coldplay",
			uri: "spotify:track:4RCWB3V8V0dignt99LZ8vH",
			keywords: ["broken", "fix", "help", "support", "healing", "coldplay", "better", "hope"]
		},
		{
			title: "Unbreak My Heart",
			artist: "Toni Braxton",
			uri: "spotify:track:6zAiRKvAMlXHxEtyO4yxIO",
			keywords: ["broken", "heart", "unbreak", "pain", "hurt", "toni braxton", "sad", "crying"]
		},
		{
			title: "Gravity",
			artist: "Sara Bareilles",
			uri: "spotify:track:4NwB41BO2wh5eSNwvmH2zQ",
			keywords: ["pull", "back", "cant", "let go", "toxic", "relationship", "sara bareilles", "stuck"]
		},
		{
			title: "Breathe Me",
			artist: "Sia",
			uri: "spotify:track:57bgtoPSgt236HzfBOd8kj",
			keywords: ["lost", "help", "alone", "sad", "sia", "lonely", "small", "breathing"]
		},
		{
			title: "All Too Well",
			artist: "Taylor Swift",
			uri: "spotify:track:4rHZZAmHpZrA3iH5zx8frV",
			keywords: ["remember", "memories", "past", "taylor swift", "scarf", "fall", "autumn", "miss"]
		},
		{
			title: "Hello",
			artist: "Adele",
			uri: "spotify:track:4sPmO7WMQUAf45kwMOtONw",
			keywords: ["hello", "call", "phone", "adele", "years", "past", "sorry", "miss", "communication"]
		},
		{
			title: "Stay With Me",
			artist: "Sam Smith",
			uri: "spotify:track:5Nm9ERjJZ5oyfXZTECKmRt",
			keywords: ["stay", "leave", "night", "sam smith", "lonely", "alone", "please", "need"]
		},
		{
			title: "Skinny Love",
			artist: "Bon Iver",
			uri: "spotify:track:2k0lx0jzfJ2CJEfqsB7gj3",
			keywords: ["fading", "love", "weak", "bon iver", "dying", "skinny", "end", "patient"]
		},
		{
			title: "Back To Black",
			artist: "Amy Winehouse",
			uri: "spotify:track:3GCdLUSnKSMJhs4Tj6CV3s",
			keywords: ["black", "dark", "depression", "amy winehouse", "gone", "leaving", "alcohol"]
		},
		{
			title: "Irreplaceable",
			artist: "Beyoncé",
			uri: "spotify:track:6RX5GhZBrxlkUZKs60shRv",
			keywords: ["left", "box", "leaving", "beyonce", "replace", "moving on", "strong", "independence"]
		},
		{
			title: "We Are Never Ever Getting Back Together",
			artist: "Taylor Swift",
			uri: "spotify:track:5YqltLsjdqFtvqE7Nrysvs",
			keywords: ["never", "back", "together", "taylor swift", "over", "done", "final", "breakup"]
		},
		{
			title: "I Will Always Love You",
			artist: "Whitney Houston",
			uri: "spotify:track:4eHbdreAnSOrDDsFfc4Fpm",
			keywords: ["always", "love", "forever", "whitney houston", "goodbye", "leaving", "bittersweet"]
		},
		{
			title: "Nothing Compares 2 U",
			artist: "Sinéad O'Connor",
			uri: "spotify:track:1alQNyYZQHQScFeyJcswq4",
			keywords: ["nothing", "compare", "sinead", "missing", "gone", "days", "crying", "tears"]
		},
		{
			title: "Don't Speak",
			artist: "No Doubt",
			uri: "spotify:track:6urCAbunOQI9AY13Platqn",
			keywords: ["silence", "speak", "words", "no doubt", "gwen stefani", "hurt", "real", "ending"]
		},
		{
			title: "Tears Dry On Their Own",
			artist: "Amy Winehouse",
			uri: "spotify:track:7MDfN8XCzZJUMvJ0hA8yF9",
			keywords: ["tears", "cry", "dry", "amy winehouse", "stronger", "moving on", "recovery"]
		},
		{
			title: "Stronger",
			artist: "Kelly Clarkson",
			uri: "spotify:track:6v8XH9LRG6ytrMjjXmIx8M",
			keywords: ["stronger", "kill", "kelly clarkson", "alone", "fighter", "better", "without"]
		},
		{
			title: "Dancing On My Own",
			artist: "Robyn",
			uri: "spotify:track:0pxNyJJiL2zX3XlUQqCmAg",
			keywords: ["dancing", "alone", "corner", "robyn", "watching", "moved on", "new", "see"]
		},
		{
			title: "Praying",
			artist: "Kesha",
			uri: "spotify:track:0jdny0dhgjUwoIp5GkqEaA",
			keywords: ["pray", "hope", "kesha", "forgiveness", "peace", "healing", "better", "abuse"]
		},
		{
			title: "Hurt",
			artist: "Christina Aguilera",
			uri: "spotify:track:6CIY8DVjkUhcv4ExVVQniy",
			keywords: ["hurt", "pain", "sorry", "christina aguilera", "apology", "regret", "too late"]
		}
	];
	
