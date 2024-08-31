var speechRecognition = window.webkitSpeechRecognition;
var recognition = new speechRecognition();
var textbox = $("#textbox");
var instructions = $("#instructions"); // Correct selector, assuming instructions is an ID

var content = '';
 var recognizing = false; // Variable to track recognition status

recognition.continuous = true;

recognition.onstart = function() {
    instructions.text("Voice Recognition is on");
};

recognition.onspeechend = function() {
    instructions.text("No activity.");
    recognizing = false; // Reset recognizing to allow restarting
};

recognition.onerror = function(event) {
    if(event.error === 'no-speech') {
        instructions.text("Try again.");
    }
    recognizing = false; // Reset recognizing in case of error
};


// Move the onresult handler outside of the onerror handler
recognition.onresult = function(event) {
    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript

    content += transcript
  
    textbox.val(content); // Update the textbox content
};

$("#start-btn").click(function(event) {
    // if (recognizing) {
    //     recognition.stop(); // Stop the ongoing recognition
    // }
    if(content.length) {
        content += '';
    }
    recognition.start();
});


console.log(textbox); // Should log the element with ID "textbox"
console.log(instructions);
