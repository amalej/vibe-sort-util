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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.vibeSort = vibeSort;
var baseUrl = "https://generativelanguage.googleapis.com";
var defaultVibeSortOptions = {
    sortDirection: "ascending",
    apiVersion: "v1beta",
    model: "gemini-2.5-flash",
    propertyToSort: null,
};
function vibeSort(arr, options) {
    return __awaiter(this, void 0, void 0, function () {
        var mergedOpts, geminiApiKey, operation, fullUrl, jsonSchema, propertyToSortString, prompt, requestBody, res, json, jsonResponse;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    mergedOpts = __assign(__assign({}, defaultVibeSortOptions), options);
                    if (arr.length === 0)
                        return [2 /*return*/, []];
                    geminiApiKey = process.env.GEMINI_API_KEY;
                    operation = [mergedOpts.model, "generateContent"].join(":");
                    fullUrl = [baseUrl, mergedOpts.apiVersion, "models", operation].join("/");
                    if (!geminiApiKey) {
                        throw Error("Missing GEMINI_API_KEY");
                    }
                    jsonSchema = convertToJsonSchema(arr);
                    propertyToSortString = jsonSchema.type === "OBJECT" && (options === null || options === void 0 ? void 0 : options.propertyToSort)
                        ? ", using the ".concat(options === null || options === void 0 ? void 0 : options.propertyToSort, " property")
                        : "";
                    prompt = "Given the list of ".concat(jsonSchema.type, ":\n```\n").concat(JSON.stringify(arr, null, 2), "\n```\nArrange the list of ").concat(jsonSchema.type, " in ").concat(mergedOpts.sortDirection, " order").concat(propertyToSortString, ". Strictly return an object that looks like\n```\n{\n isValidPrompt: true if the prompt is complete. false if the prompt is missing information.\n sortedList: the sorted list.\n promptHelper: if the prompt is incomplete, shortly explain why.\n}\n```\n");
                    requestBody = {
                        contents: [
                            {
                                parts: [
                                    {
                                        text: prompt,
                                    },
                                ],
                            },
                        ],
                        generationConfig: {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: "OBJECT",
                                properties: {
                                    isValidPrompt: { type: "BOOLEAN" },
                                    sortedList: {
                                        type: "ARRAY",
                                        items: __assign({}, jsonSchema),
                                    },
                                    promptHelper: { type: "STRING" },
                                },
                                required: ["isValidPrompt", "promptHelper", "sortedList"],
                            },
                        },
                    };
                    return [4 /*yield*/, fetch(fullUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "X-goog-api-key": geminiApiKey,
                            },
                            body: JSON.stringify(requestBody),
                        })];
                case 1:
                    res = _b.sent();
                    if (res.status !== 200) {
                        throw Error(res.statusText);
                    }
                    return [4 /*yield*/, res.json()];
                case 2:
                    json = _b.sent();
                    if (res.status !== 200) {
                        if (json.error.message) {
                            throw Error(json.error.message);
                        }
                    }
                    jsonResponse = JSON.parse(json.candidates[0].content.parts[0].text);
                    if (!jsonResponse.isValidPrompt) {
                        throw Error((_a = jsonResponse.promptHelper) !== null && _a !== void 0 ? _a : "Prompt was invalid");
                    }
                    return [2 /*return*/, jsonResponse.sortedList];
            }
        });
    });
}
function convertToJsonSchema(inputData) {
    function inferBasicTypeSchema(value) {
        if (typeof value === "string") {
            return { type: "STRING" };
        }
        else if (typeof value === "number") {
            return { type: Number.isInteger(value) ? "INTEGER" : "NUMBER" };
        }
        else if (typeof value === "boolean") {
            return { type: "BOOLEAN" };
        }
        else if (Array.isArray(value)) {
            return { type: "ARRAY" };
        }
        else if (typeof value === "object" && value !== null) {
            var properties = {};
            for (var _i = 0, _a = Object.keys(value); _i < _a.length; _i++) {
                var key = _a[_i];
                properties[key] = convertToJsonSchema(value[key]);
            }
            return { type: "OBJECT", properties: properties, required: Object.keys(properties) };
        }
        return { type: "UNKNOWN" };
    }
    if (!Array.isArray(inputData)) {
        return __assign({}, inferBasicTypeSchema(inputData));
    }
    var firstItem = inputData[0];
    return __assign({}, inferBasicTypeSchema(firstItem));
}
//# sourceMappingURL=index.js.map