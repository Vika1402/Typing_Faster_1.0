// DOM Elements
let typingArea = document.querySelector("textarea");
let btn = document.getElementById("btn");
let showSentence = document.querySelector("#showSentence");
let scorepara = document.querySelector("#score");
let show_time = document.getElementById("show_timer");

// Variables
let startTime, endTime, totalTime, sentense_to_write;
let sentence = [
    "Hello, I am learning JavaScript.",
    "The sky is a beautiful shade of blue today.",
    "In football, teamwork is key to winning.",
    "Nature has a way of calming the mind.",
    "Philosophy encourages deep thinking about life.",
    "Artificial intelligence is transforming industries.",
    "Mountains stand tall and silent, observing time pass.",
    "Running helps to clear the mind and stay fit.",
    "The universe is vast and full of mysteries.",
    "Ethics guide our decisions in complex situations.",
];

// Timer variables
let intervalId, elapsTime = 0;

// Event Listener for the button
btn.addEventListener("click", () => {
    switch (btn.innerText.toLowerCase()) {
        case "start":
            typingArea.removeAttribute("disabled");
            startTypingTest();
            break;
        case "done":
            typingArea.setAttribute("disabled", true);
            endTypingTest();
            break;
        default:
            break;
    }
});

// Start typing test
const startTypingTest = () => {
    let randomNumber = Math.floor(Math.random() * sentence.length);
    showSentence.innerHTML = sentence[randomNumber];
    startTime = new Date().getTime();
    btn.innerText = "Done";
    showTimer();
};

// Show timer
const showTimer = () => {
    if (btn.innerText === "Done") {
        intervalId = setInterval(() => {
            elapsTime++;
            show_time.innerText = elapsTime;
        }, 1000);
    } else if (btn.innerText === "Start") {
        clearInterval(intervalId);
        elapsTime = 0;
        show_time.innerText = " ";
    }
};

// End typing test
const endTypingTest = () => {
    btn.innerText = "Start";
    clearInterval(intervalId); // Stop the timer
    let date = new Date();
    endTime = date.getTime();
    totalTime = (endTime - startTime) / 1000; // Calculate total time in seconds
    calculateTypingSpeed(totalTime);
    resetTypingTest();
};

// Calculate typing speed and accuracy
const calculateTypingSpeed = (time_taken) => {
    let typedText = typingArea.value.trim();
    let actualWords = typedText === "" ? 0 : typedText.split(" ");
    actualWords = errorChecking(actualWords);
    
    if (actualWords !== 0) {
        let typingSpeed = (actualWords / time_taken) * 60;
        typingSpeed = Math.round(typingSpeed);
        scorepara.innerHTML = `Your typing speed is ${typingSpeed} words per minute, and you correctly typed ${actualWords} out of ${sentense_to_write.length} words. Time taken: ${time_taken.toFixed(2)} seconds.`;
    } else {
        scorepara.innerHTML = `Your typing speed is 0 words per minute. Time taken: ${time_taken.toFixed(2)} seconds.`;
    }
};

// Error checking for typed words
const errorChecking = (typedWords) => {
    let correctWords = 0;
    sentense_to_write = showSentence.innerHTML.trim().split(" ");
    
    for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === sentense_to_write[i]) {
            correctWords++;
        }
    }
    return correctWords;
};

// Reset typing test after completion
const resetTypingTest = () => {
    showSentence.innerText = "";
    typingArea.value = "";
    typingArea.setAttribute("disabled", true);
    elapsTime = 0;
    show_time.innerText = "";
};
