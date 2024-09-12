import { NextRequest, NextResponse } from "next/server";
import { VoiceAssistant } from "@/app/lib/voice-assistant";
import { VoiceAssistantConfig } from "@/types";

// Create a default assistant instance
const defaultAssistant = new VoiceAssistant();

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.audio || typeof data.audio !== "string") {
      return NextResponse.json(
        { error: "Invalid audio data" },
        { status: 400 }
      );
    }

    let audioBuffer = Buffer.from(data.audio, "base64");

    // Ensure audioBuffer length is a multiple of 4
    if (audioBuffer.length % 4 !== 0) {
      const padding = 4 - (audioBuffer.length % 4);
      audioBuffer = Buffer.concat([audioBuffer, Buffer.alloc(padding)]);
    }

    // Check if there is a custom configuration
    let assistant = defaultAssistant;
    if (data.config && typeof data.config === "object") {
      const config: Partial<VoiceAssistantConfig> = {
        language: data.config.language,
        sttModel: data.config.sttModel,
        llmModel: data.config.llmModel,
        ttsVoiceId: data.config.ttsVoiceId,
      };
      assistant = new VoiceAssistant(config);
    }

    const response = await assistant.processAudio(audioBuffer);
    return new NextResponse(response, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const message = searchParams.get("message") || "Hello, how are you doing today?";

    // Check if there is a custom configuration
    let assistant = defaultAssistant;
    const config: Partial<VoiceAssistantConfig> = {};
    if (searchParams.get("language"))
      config.language = searchParams.get("language")!;
    if (searchParams.get("sttModel"))
      config.sttModel = searchParams.get("sttModel")!;
    if (searchParams.get("llmModel"))
      config.llmModel = searchParams.get("llmModel")!;
    if (searchParams.get("ttsVoiceId"))
      config.ttsVoiceId = searchParams.get("ttsVoiceId")!;

    if (Object.keys(config).length > 0) {
      assistant = new VoiceAssistant(config);
    }

    const greeting = await assistant.say(message);
    return new NextResponse(greeting, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
  } catch (error) {
    console.error("Error generating greeting:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
