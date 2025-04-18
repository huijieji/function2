// Song Database with keyword matching from Sportify.
// Data generate by Ai for learning purpose.

// Song data
const SONGS = [
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

// Quote database with keyword matching from BrainyQuote
const quoteDatabase = [
    {
        text: "Sometimes good things fall apart so better things can fall together.",
        author: "Marilyn Monroe",
        keywords: ["fall apart", "better", "together", "breakup", "hope", "positive"]
    },
    {
        text: "The heart was made to be broken.",
        author: "Oscar Wilde",
        keywords: ["heart", "broken", "heartbreak", "pain", "inevitable"]
    },
    {
        text: "It is strange how often a heart must be broken before the years can make it wise.",
        author: "Sara Teasdale",
        keywords: ["heart", "broken", "wise", "years", "growth", "learning", "heartbreak"]
    },
    {
        text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
        author: "Buddha",
        keywords: ["self-love", "deserve", "affection", "yourself", "healing", "worth"]
    },
    {
        text: "To love oneself is the beginning of a lifelong romance.",
        author: "Oscar Wilde",
        keywords: ["love", "self-love", "romance", "beginning", "yourself"]
    },
    {
        text: "The wound is the place where the Light enters you.",
        author: "Rumi",
        keywords: ["wound", "light", "healing", "pain", "growth", "wisdom"]
    },
    {
        text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.",
        author: "Tori Amos",
        keywords: ["healing", "courage", "strength", "find", "recovery"]
    },
    {
        text: "Don't cry because it's over, smile because it happened.",
        author: "Dr. Seuss",
        keywords: ["cry", "smile", "over", "happened", "moving on", "positive", "past"]
    },
    {
        text: "Moving on, is a simple thing, what it leaves behind is hard.",
        author: "Dave Mustaine",
        keywords: ["moving on", "leave behind", "hard", "difficult", "past"]
    },
    {
        text: "Hope is being able to see that there is light despite all of the darkness.",
        author: "Desmond Tutu",
        keywords: ["hope", "light", "darkness", "see", "future", "positive"]
    },
    {
        text: "You never know how strong you are until being strong is your only choice.",
        author: "Bob Marley",
        keywords: ["strong", "strength", "choice", "resilience", "only"]
    },
    {
        text: "Tears come from the heart and not from the brain.",
        author: "Leonardo da Vinci",
        keywords: ["tears", "heart", "brain", "cry", "emotion", "sad"]
    },
    {
        text: "The word 'happy' would lose its meaning if it were not balanced by sadness.",
        author: "Carl Jung",
        keywords: ["happy", "sad", "balance", "meaning", "emotion"]
    },
    {
        text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
        author: "Lao Tzu",
        keywords: ["love", "strength", "courage", "deeply", "relationship"]
    },
    {
        text: "Love yourself first and everything else falls into line.",
        author: "Lucille Ball",
        keywords: ["love", "yourself", "first", "self-love", "priority"]
    },
    {
        text: "Pain is inevitable. Suffering is optional.",
        author: "Buddhist Proverb",
        keywords: ["pain", "suffering", "inevitable", "optional", "choice"]
    },
    {
        text: "Turn your wounds into wisdom.",
        author: "Oprah Winfrey",
        keywords: ["wounds", "wisdom", "turn", "transform", "growth", "healing"]
    },
    {
        text: "The greatest step towards a life of simplicity is to learn to let go.",
        author: "Steve Maraboli",
        keywords: ["let go", "simplicity", "step", "learn", "moving on"]
    },
    {
        text: "Time doesn't heal emotional pain, you need to learn how to let go.",
        author: "Roy T. Bennett",
        keywords: ["time", "heal", "emotional", "pain", "let go", "learn"]
    },
    {
        text: "Sometimes, you need to be alone. Not to be lonely, but to enjoy your free time being yourself.",
        author: "Anonymous",
        keywords: ["alone", "lonely", "yourself", "free time", "enjoy", "self"]
    },
    
    // 添加更多名言
    {
        text: "The emotion that can break your heart is sometimes the very one that heals it.",
        author: "Nicholas Sparks",
        keywords: ["emotion", "break", "heart", "heal", "heartbreak", "healing"]
    },
    {
        text: "Loving you was like going to war; I never came back the same.",
        author: "Warsan Shire",
        keywords: ["loving", "war", "never", "same", "changed", "effect"]
    },
    {
        text: "When someone leaves, it's because someone else is about to arrive.",
        author: "Paulo Coelho",
        keywords: ["leave", "arrive", "someone", "new", "future", "hope"]
    },
    {
        text: "The cure for a broken heart is simple, my lady. A hot bath and a good night's sleep.",
        author: "Margaret George",
        keywords: ["cure", "broken heart", "simple", "bath", "sleep", "rest", "healing"]
    },
    {
        text: "Hearts will never be practical until they are made unbreakable.",
        author: "The Wizard of Oz",
        keywords: ["hearts", "practical", "unbreakable", "risk", "love"]
    },
    {
        text: "It is our wounds that create in us a desire to reach for miracles. The fulfillment of such miracles depends on whether we let our wounds pull us down or lift us up towards our dreams.",
        author: "Jocelyn Soriano",
        keywords: ["wounds", "miracles", "fulfillment", "dreams", "lift", "growth"]
    },
    {
        text: "When we are in love, we are convinced nobody else will do. But as time goes, others do do, and often do do, much much better.",
        author: "Coco J. Ginger",
        keywords: ["love", "time", "better", "others", "change", "perspective"]
    },
    {
        text: "Never allow someone to be your priority while allowing yourself to be their option.",
        author: "Mark Twain",
        keywords: ["priority", "option", "allow", "yourself", "self-respect", "value"]
    },
    {
        text: "When one door closes, another opens; but we often look so long and so regretfully upon the closed door that we do not see the one which has opened for us.",
        author: "Alexander Graham Bell",
        keywords: ["door", "close", "open", "regret", "opportunity", "future"]
    },
    {
        text: "The saddest thing about love is that not only that it cannot last forever, but that heartbreak is soon forgotten.",
        author: "William Faulkner",
        keywords: ["sad", "love", "last", "forever", "heartbreak", "forgotten", "memory"]
    },
    {
        text: "The hottest love has the coldest end.",
        author: "Socrates",
        keywords: ["hot", "love", "cold", "end", "passion", "contrast"]
    },
    {
        text: "Sometimes it takes a heartbreak to shake us awake and help us see we are worth so much more than we're settling for.",
        author: "Mandy Hale",
        keywords: ["heartbreak", "awake", "worth", "settling", "value", "self-worth"]
    },
    {
        text: "Holding on is believing that there's only a past; letting go is knowing that there's a future.",
        author: "Daphne Rose Kingma",
        keywords: ["holding on", "past", "letting go", "future", "belief", "knowing"]
    },
    {
        text: "Let go. Why do you cling to pain? There is nothing you can do about the wrongs of yesterday. It is not yours to judge. Why hold on to the very thing which keeps you from hope and love?",
        author: "Leo Buscaglia",
        keywords: ["let go", "pain", "cling", "wrongs", "yesterday", "hope", "love", "holding"]
    },
    {
        text: "When your heart is broken, your boats are burned: nothing matters anymore. It is the end of happiness and the beginning of peace.",
        author: "George Bernard Shaw",
        keywords: ["heart", "broken", "boats", "burned", "happiness", "peace", "end", "beginning"]
    },
    {
        text: "I'm proud of my heart. It's been played, burned, and broken, but it still works.",
        author: "Anonymous",
        keywords: ["proud", "heart", "played", "burned", "broken", "works", "resilience"]
    },
    {
        text: "Some of us think holding on makes us strong, but sometimes it is letting go.",
        author: "Hermann Hesse",
        keywords: ["holding on", "strong", "letting go", "strength", "release", "freedom"]
    },
    {
        text: "The art of love is largely the art of persistence.",
        author: "Albert Ellis",
        keywords: ["art", "love", "persistence", "effort", "dedication", "commitment"]
    },
    {
        text: "Love never dies a natural death. It dies because we don't know how to replenish its source. It dies of blindness and errors and betrayals. It dies of illness and wounds; it dies of weariness, of witherings, of tarnishings.",
        author: "Anaïs Nin",
        keywords: ["love", "die", "natural", "replenish", "source", "blindness", "errors", "betrayals", "wounds"]
    },
    {
        text: "The prettiest smile hides the deepest secrets. The prettiest eyes have cried the most tears, and the kindest hearts have felt the most pain.",
        author: "Anonymous",
        keywords: ["smile", "secrets", "eyes", "tears", "heart", "pain", "hidden", "appearance"]
    },
    {
        text: "Two people can have a meaningful relationship that lasts in their hearts forever... Even if it doesn't work out.",
        author: "James Earl Hardy",
        keywords: ["people", "meaningful", "relationship", "last", "hearts", "forever", "work out"]
    },
    {
        text: "Every time your heart is broken, a doorway cracks open to a world full of new beginnings, new opportunities.",
        author: "Patti Roberts",
        keywords: ["heart", "broken", "doorway", "world", "beginnings", "opportunities", "new"]
    },
    {
        text: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
        author: "Albert Einstein",
        keywords: ["life", "riding", "bicycle", "balance", "moving", "forward", "progress"]
    },
    {
        text: "Sometimes good things fall apart so better things can fall together.",
        author: "Marilyn Monroe",
        keywords: ["good", "fall apart", "better", "together", "perspective", "hope"]
    },
    {
        text: "If you're brave enough to say goodbye, life will reward you with a new hello.",
        author: "Paulo Coelho",
        keywords: ["brave", "goodbye", "life", "reward", "hello", "new", "opportunity"]
    },
    {
        text: "The truth is, unless you let go, unless you forgive yourself, unless you forgive the situation, unless you realize that the situation is over, you cannot move forward.",
        author: "Steve Maraboli",
        keywords: ["truth", "let go", "forgive", "situation", "over", "move forward", "progress"]
    }
];