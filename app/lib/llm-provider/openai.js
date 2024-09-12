"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenai = getOpenai;
var openai_1 = require("@ai-sdk/openai");
var openaiInstance = null;
function getOpenai() {
    if (!openaiInstance) {
        var baseUrl = "https://api.openai.com/v1/";
        if (!baseUrl) {
            throw new Error("openai-baseUrl is not defined.");
        }
        if (!process.env.OPENAI_API_KEY) {
            throw new Error("OPENAI_API_KEY is not defined.");
        }
        openaiInstance = (0, openai_1.createOpenAI)({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: baseUrl,
            compatibility: "strict",
        });
    }
    return openaiInstance;
}
