# NEXT FAST VOICE ASSISTANT API

## Project Overview

This project is the TypeScript version of [fast-voice-assistant](https://github.com/dsa/fast-voice-assistant.git).

**Key feature: Speed! 🚀 We recommend using WebRTC for transmitting audio streams, which minimizes latency.**

It integrates OpenAPI, a highly customizable AI voice assistant, with advanced Speech-to-Text (STT), Natural Language Processing (NLP), and Text-to-Speech (TTS) technologies. It provides a simple yet powerful interface that makes it easy to integrate voice interaction capabilities into various applications.

## Deployment

⚠️ Some limitations:

- This project requires the `onnxruntime-node` dependency, so you need to add `externals` configuration in `next.config.js` and set `onnxruntime-node` as `commonjs onnxruntime-node`.
- Due to the large size of `onnxruntime-node` (over 500MB at build time), it cannot be deployed as a Serverless function because of server size restrictions (250MB).
- We recommend deploying it traditionally, but if you find a better solution, feel free to submit a PR.

## Key Features

- **Voice Activity Detection (VAD)**: Uses efficient algorithms to accurately detect voice input.
- **Speech-to-Text (STT)**: Leverages advanced models from Deepgram for precise speech transcription.
- **Natural Language Processing (NLP)**: Utilizes powerful language models (like GPT) to generate intelligent responses.
- **Text-to-Speech (TTS)**: Uses high-quality speech synthesis technology from Cartesia.
- **Highly Customizable**: Supports multiple languages, model choices, and flexible configuration options.
- **Easy Integration**: Provides a simple RESTful API, making it easy to integrate into various applications.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Deepgram STT
- GPT/GROQ language models
- Cartesia TTS
- @ricky0123/vad for voice activity detection

## API Usage Guide

### POST /api/voice-assistant

Processes audio input and returns a voice response.

### Request Body

```json
{
  "audio": "base64_encoded_audio_data",
  "config": {
    "language": "zh",
    "sttModel": "nova-2",
    "llmModel": "llama-3.1-8b-instant",
    "ttsVoiceId": "voice-id"
  }
}
```

- `audio`: Base64-encoded audio data (required)
- `config`: Optional configuration object
  - `language`: Language code (optional, default is "zh"). The international language code format used here is [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag)
  - `sttModel`: Speech-to-text model (optional) See [Deepgram's Models](https://developers.deepgram.com/docs/models) for reference.
  - `llmModel`: Language model (optional) Uses models from [Groq](https://console.groq.com/docs/models)
  - `ttsVoiceId`: Text-to-speech voice ID (optional). You can refer to [Cartesia's Voices](https://play.cartesia.ai/library) for available options.

### Response

Returns audio data in WAV format.

### GET /api/voice-assistant

Generates a voice greeting.

#### Query Parameters

- `message`: The text to convert to speech (optional, default is "Hello, how are you today?")
- `language`: Language code (optional)
- `sttModel`: Speech-to-text model (optional)
- `llmModel`: Language model (optional)
- `ttsVoiceId`: Text-to-speech voice ID (optional)

### Response

Returns audio data in WAV format.

### Example Usage

#### Sending a POST request with cURL

```bash
curl -X POST https://your-api-url/api/voice-assistant \
  -H "Content-Type: application/json" \
  -d '{
    "audio": "base64_encoded_audio_data",
    "config": {
      "language": "en",
      "sttModel": "nova-2",
      "llmModel": "llama-3.1-8b-instant",
      "ttsVoiceId": "eda5bbff-1ff1-4886-8ef1-4e69a77640a0"
    }
  }'

# Example using default configuration
AUDIO_BASE64=$(base64 -i input-audio.wav | tr -d '\n')
echo "{\"audio\": \"$AUDIO_BASE64\"}" > temp_audio.json

curl -X POST http://localhost:3000/api/voice-assistant \
    -H "Content-Type: application/json" \
    --data @temp_audio.json | ffmpeg -f f32le -ar 44100 -ac 1 -i pipe: output4.wav

rm temp_audio.json
```

#### Sending a GET request with cURL

```bash
curl -G "http://localhost:3000/api/voice-assistant" \
     --data-urlencode "message=Next Fast Voice Assistant is incredibly fast and convenient!" \
     --data-urlencode "language=zh" \
     --data-urlencode "sttModel=nova-2" \
     --data-urlencode "llama-3.1-8b-instant3" \
     --data-urlencode "ttsVoiceId=eda5bbff-1ff1-4886-8ef1-4e69a77640a0" | ffmpeg -f f32le -ar 44100 -ac 1 -i pipe: voice.wav
```

## Project Advantages

1. **Highly flexible**: Supports multiple languages and models, customizable for different needs.
2. **Superior performance**: Uses cutting-edge AI technology to deliver fast, accurate voice interaction.
3. **Easy integration**: Simple API design makes it easy to integrate into various applications.
4. **High scalability**: Modular design allows for easy addition of new features or replacement of existing components.
5. **Real-time processing**: Supports real-time voice input and response.
6. **Secure and reliable**: Employs strict error handling and security measures.

## Deployment

1. Clone the repository:

   ```
   git clone https://github.com/steveoOn/next-fast-voice-assistant.git
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set environment variables (in the `.env.local` file):

   ```
   DEEPGRAM_API_KEY=your_deepgram_key
   CEREBRAS_API_KEY=your_cerebras_key
   CARTESIA_API_KEY=your_cartesia_key
   ```

   Refer to the [.env.example](./.env.example) file to create your own environment variables file.

4. Run the development server:

   ```
   pnpm dev
   ```

5. Build the production version:
   ```
   pnpm build
   ```

## Contribution

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

## License

This project is licensed under the [MIT License](LICENSE).