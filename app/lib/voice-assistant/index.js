"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceAssistant = void 0;
var sdk_1 = require("@deepgram/sdk");
var axios_1 = require("axios");
var ai_1 = require("ai");
var llm_provider_1 = require("../llm-provider");
var VoiceAssistant = /** @class */ (function () {
    function VoiceAssistant(config) {
        if (config === void 0) { config = {}; }
        this.vad = null;
        this.chatContext = [
            {
                role: "system",
                content: "You are a voice assistant. Pretend we're having a human conversation, no special formatting or headings, just natural speech.",
            },
        ];
        this.config = __assign({ language: "zh", sttModel: "nova-2", llmModel: "llama-3.1-8b-instant", ttsVoiceId: "0b904166-a29f-4d2e-bb20-41ca302f98e9" }, config);
        this.deepgram = (0, sdk_1.createClient)(process.env.DEEPGRAM_API_KEY);
        this.groq = (0, llm_provider_1.getGroq)();
        this.initVAD();
    }
    VoiceAssistant.prototype.initVAD = function () {
        return __awaiter(this, void 0, void 0, function () {
            var NonRealTimeVAD_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof window === "undefined")) return [3 /*break*/, 3];
                        return [4 /*yield*/, Promise.resolve().then(function () { return require("@ricky0123/vad/dist/index.node"); })];
                    case 1:
                        NonRealTimeVAD_1 = (_b.sent()).NonRealTimeVAD;
                        _a = this;
                        return [4 /*yield*/, NonRealTimeVAD_1.new()];
                    case 2:
                        _a.vad = _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoiceAssistant.prototype.processAudio = function (audioBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var audioFloat32, sampleRate, speechDetected, _a, _b, _c, audio, start, end, e_1_1, transcription, response;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!this.vad) {
                            throw new Error("VAD not initialized");
                        }
                        audioFloat32 = new Float32Array(audioBuffer.buffer, audioBuffer.byteOffset, audioBuffer.byteLength / 4);
                        sampleRate = 16000;
                        speechDetected = false;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 12]);
                        _a = true, _b = __asyncValues(this.vad.run(audioFloat32, sampleRate));
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 5];
                        _f = _c.value;
                        _a = false;
                        audio = _f.audio, start = _f.start, end = _f.end;
                        speechDetected = true;
                        return [3 /*break*/, 5];
                    case 4:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _g.trys.push([7, , 10, 11]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _e.call(_b)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12:
                        if (!speechDetected)
                            return [2 /*return*/, new ArrayBuffer(0)];
                        return [4 /*yield*/, this.transcribe(audioBuffer)];
                    case 13:
                        transcription = _g.sent();
                        return [4 /*yield*/, this.generateResponse(transcription)];
                    case 14:
                        response = _g.sent();
                        return [4 /*yield*/, this.synthesizeSpeech(response)];
                    case 15: return [2 /*return*/, _g.sent()];
                }
            });
        });
    };
    VoiceAssistant.prototype.transcribe = function (audioBuffer) {
        return __awaiter(this, void 0, void 0, function () {
            var options, result, err_1;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        options = {
                            model: this.config.sttModel,
                            smart_format: true,
                            language: this.config.language,
                            mimetype: "audio/wav",
                        };
                        return [4 /*yield*/, this.deepgram.listen.prerecorded.transcribeFile(audioBuffer, options)];
                    case 1:
                        result = (_d.sent()).result;
                        return [2 /*return*/, ((_c = (_b = (_a = result === null || result === void 0 ? void 0 : result.results) === null || _a === void 0 ? void 0 : _a.channels[0]) === null || _b === void 0 ? void 0 : _b.alternatives[0]) === null || _c === void 0 ? void 0 : _c.transcript) || ""];
                    case 2:
                        err_1 = _d.sent();
                        console.error("Transcription failed:", err_1);
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoiceAssistant.prototype.generateResponse = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var text, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, ai_1.generateText)({
                                model: this.groq(this.config.llmModel),
                                system: this.chatContext[0].content,
                                prompt: input,
                                temperature: 0.9,
                                maxTokens: 700,
                            })];
                    case 1:
                        text = (_a.sent()).text;
                        return [2 /*return*/, text];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Response generation failed:", err_2);
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoiceAssistant.prototype.synthesizeSpeech = function (text) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("https://api.cartesia.ai/tts/bytes", {
                                transcript: text,
                                model_id: "sonic-multilingual",
                                voice: { mode: "id", id: this.config.ttsVoiceId },
                                __experimental_controls: {
                                    speed: "slow",
                                    emotion: ["positivity:high", "curiosity"],
                                },
                                output_format: {
                                    container: "raw",
                                    encoding: "pcm_f32le",
                                    sample_rate: 44100,
                                },
                                language: this.config.language,
                            }, {
                                headers: {
                                    "Cartesia-Version": "2024-06-10",
                                    "X-API-Key": process.env.CARTESIA_API_KEY,
                                    "Content-Type": "application/json",
                                },
                                responseType: "arraybuffer",
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        err_3 = _a.sent();
                        console.error("Speech synthesis failed:", err_3);
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VoiceAssistant.prototype.say = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.synthesizeSpeech(message)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return VoiceAssistant;
}());
exports.VoiceAssistant = VoiceAssistant;
