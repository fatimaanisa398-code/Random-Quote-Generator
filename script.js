class QuoteGenerator {
    constructor() {
        this.quotes = this.loadQuotes();
        this.currentQuoteIndex = 0;
        this.isSpeaking = false;
        this.quoteCount = parseInt(localStorage.getItem('quoteCount')) || 0;
        
        this.initElements();
        this.bindEvents();
        this.loadRandomQuote();
        this.updateCounter();
    }

    initElements() {
        this.quoteText = document.getElementById('quoteText');
        this.quoteAuthor = document.getElementById('quoteAuthor');
        this.newQuoteBtn = document.getElementById('newQuoteBtn');
        this.speakBtn = document.getElementById('speakBtn');
        this.themeBtn = document.getElementById('themeBtn');
        this.loading = document.getElementById('loading');
        this.quoteContainer = document.getElementById('quoteContainer');
        this.quoteCounter = document.getElementById('quoteCounter');
        
        this.twitterShare = document.getElementById('twitterShare');
        this.whatsappShare = document.getElementById('whatsappShare');
        this.copyBtn = document.getElementById('copyBtn');
    }

    bindEvents() {
        this.newQuoteBtn.addEventListener('click', () => this.getNewQuote());
        this.speakBtn.addEventListener('click', () => this.speakQuote());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        
        // Share buttons
        this.twitterShare.addEventListener('click', () => this.shareTwitter());
        this.whatsappShare.addEventListener('click', () => this.shareWhatsApp());
        this.copyBtn.addEventListener('click', () => this.copyQuote());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.getNewQuote();
            }
            if (e.code === 'Enter') {
                this.speakQuote();
            }
        });
    }

    loadQuotes() {
        return [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
            { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
            { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon" },
            { text: "Get busy living or get busy dying.", author: "Stephen King" },
            { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
            { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
            { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison" },
            { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
            { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
            { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
            { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
            { text: "Innovation is the ability to see change as an opportunity - not a threat.", author: "Steve Jobs" },
            { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
            { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
            // Add 300+ more quotes here (truncated for brevity)
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "
