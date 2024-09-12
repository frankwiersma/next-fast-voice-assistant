"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroq = getGroq;
var openai_1 = require("@ai-sdk/openai");
var groqInstance = null;
function getGroq() {
    if (!groqInstance) {
        var baseUrl = "https://api.groq.com/openai/v1";
        if (!baseUrl) {
            throw new Error("groq-baseUrl is not defined.");
        }
        if (!process.env.GROQ_API_KEY) {
            throw new Error("GROQ_API_KEY is not defined.");
        }
        groqInstance = (0, openai_1.createOpenAI)({
            apiKey: process.env.GROQ_API_KEY,
            baseURL: baseUrl,
        });
    }
    return groqInstance;
}
