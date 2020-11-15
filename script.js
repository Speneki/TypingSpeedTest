const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const complimentElement = document.getElementById('compliment');
const WPMElement = document.getElementById('wpm');

let wordCount = 0;
let mistakes = 0;
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    if (arrayValue.length == 1) {
        startTimer();
    }

    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index];

        if (char == null) {
            charSpan.classList.remove('incorrect');
            charSpan.classList.remove('incorrect');
            correct = false;
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
        } else {
            mistakes ++;
            console.log(mistakes);
            charSpan.classList.remove('correct');
            charSpan.classList.add('incorrect');
            correct = false;
        }
    })
    if (correct) {
        const compliments = ["Nice!", "Good one!", "Got em.", "Bravo", "Nailed it!", "Way 2 go", "Nicely done", "Hell yeah", "Heck yeah", "Well, look at you!", "🤙🤙🤙", "👈😎👉", "🥳"];
        const random = Math.floor(Math.random() * compliments.length);
        complimentElement.innerText = compliments[random];
        getWPM();
        getNextQuote();
    }
})

function getQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function getNextQuote() {
    wordCount = 0;
    mistakes = 0;
    const quote = await getQuote()
    quoteDisplayElement.innerText = "";
    quote.split(" ").forEach(() => wordCount++)
    quote.split("").forEach( char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char;
        quoteDisplayElement.appendChild(charSpan)
    })

    quoteInputElement.value = null;

}

let startTime;
let timerTime;
let myTimer;
function startTimer() {
    timerElement.innerText = 0.0;
    startTime = new Date();
    myTimer = setInterval(() => {
        timer.innerText = (getTimerTime() / 10).toFixed(1)
    }, 100)
}


function getTimerTime() {
    return Math.floor((new Date() - startTime) / 100)
}

function getWPM() {
    let seconds = timerElement.innerText;
    let num = wordCount * 60;
    let WPM = num / seconds;
    WPMElement.innerText = WPM.toFixed(2) + " WPM last round with " + mistakes + " mistakes.";
    clearInterval(myTimer);
}

getNextQuote()