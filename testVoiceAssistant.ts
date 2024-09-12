import * as fs from 'fs';
import { VoiceAssistant } from './app/lib/voice-assistant';
import { VoiceAssistantConfig } from './app/types';  // Adjust this path based on your project structure

async function testVoiceAssistant() {
  try {
    // Initialize the VoiceAssistant with default configuration
    const config: VoiceAssistantConfig = {
      // Add any necessary configuration options here
    };
    const assistant = new VoiceAssistant(config);

    // Read an audio file and convert it to a Buffer
    const audioBuffer = await fs.promises.readFile('path/to/your/input-audio.wav');

    // Process the audio and get the response
    const responseBuffer = await assistant.processAudio(audioBuffer);

    // Save the response to a file
    await fs.promises.writeFile('path/to/your/output-audio.wav', responseBuffer);

    console.log('Audio processed successfully. Check the output file.');
  } catch (error) {
    console.error('Error processing audio:', error);
  }
}

// Run the test
testVoiceAssistant();