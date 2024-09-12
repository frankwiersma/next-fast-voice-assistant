var fs = require('fs');
var VoiceAssistant = require('./app/lib/voice-assistant').VoiceAssistant;
// Initialize the VoiceAssistant with default configuration
var assistant = new VoiceAssistant();
// Read an audio file (e.g., 'input-audio.wav') and convert it to a Buffer
var audioBuffer = fs.readFileSync('path/to/your/input-audio.wav');
// Process the audio and get the response
assistant.processAudio(audioBuffer)
    .then(function (responseBuffer) {
    // Save the response to a file (e.g., 'output-audio.wav')
    fs.writeFileSync('path/to/your/output-audio.wav', Buffer.from(responseBuffer));
    console.log('Audio processed successfully. Check the output file.');
})
    .catch(function (error) {
    console.error('Error processing audio:', error);
});
