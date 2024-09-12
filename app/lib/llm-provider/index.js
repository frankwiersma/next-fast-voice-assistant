"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenai = exports.getGroq = void 0;
var groq_1 = require("./groq");
Object.defineProperty(exports, "getGroq", { enumerable: true, get: function () { return groq_1.getGroq; } });
var openai_1 = require("./openai");
Object.defineProperty(exports, "getOpenai", { enumerable: true, get: function () { return openai_1.getOpenai; } });
