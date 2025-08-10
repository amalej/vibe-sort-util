const baseUrl = `https://generativelanguage.googleapis.com`;

type SortDirection = "ascending" | "descending";

interface VibeSortOptions {
  sortDirection?: SortDirection;
  propertyToSort?: string;
  apiVersion?: string;
  model?: string;
}

interface VibeSortResponse {
  isValidPrompt: string;
  sortedList: any[];
  promptHelper: string;
}

const defaultVibeSortOptions = {
  sortDirection: "ascending",
  apiVersion: "v1beta",
  model: "gemini-2.5-flash",
  propertyToSort: null,
};

export async function vibeSort<T>(
  arr: T[],
  options?: VibeSortOptions
): Promise<T[]> {
  const mergedOpts = {
    ...defaultVibeSortOptions,
    ...options,
  };
  if (arr.length === 0) return [];
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const operation = [mergedOpts.model, "generateContent"].join(":");
  const fullUrl = [baseUrl, mergedOpts.apiVersion, "models", operation].join(
    "/"
  );
  if (!geminiApiKey) {
    throw Error("Missing GEMINI_API_KEY");
  }

  const jsonSchema = convertToJsonSchema(arr);
  const propertyToSortString =
    jsonSchema.type === "OBJECT" && options?.propertyToSort
      ? `, using the ${options?.propertyToSort} property`
      : "";
  const prompt = `Given the list of ${jsonSchema.type}:
\`\`\`
${JSON.stringify(arr, null, 2)}
\`\`\`
Arrange the list of ${jsonSchema.type} in ${
    mergedOpts.sortDirection
  } order${propertyToSortString}. Strictly return an object that looks like
\`\`\`
{
 isValidPrompt: true if the prompt is complete. false if the prompt is missing information.
 sortedList: the sorted list.
 promptHelper: if the prompt is incomplete, shortly explain why.
}
\`\`\`
`;

  const requestBody = {
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
            items: { ...jsonSchema },
          },
          promptHelper: { type: "STRING" },
        },
        required: ["isValidPrompt", "promptHelper", "sortedList"],
      },
    },
  };

  const res = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": geminiApiKey,
    },
    body: JSON.stringify(requestBody),
  });

  if (res.status !== 200) {
    throw Error(res.statusText);
  }

  const json = await res.json();
  if (res.status !== 200) {
    if (json.error.message) {
      throw Error(json.error.message);
    }
  }

  const jsonResponse = JSON.parse(
    json.candidates[0].content.parts[0].text
  ) as VibeSortResponse;
  if (!jsonResponse.isValidPrompt) {
    throw Error(jsonResponse.promptHelper ?? "Prompt was invalid");
  }
  return jsonResponse.sortedList;
}

function convertToJsonSchema(inputData: any): {
  type: string;
  [key: string]: any;
} {
  function inferBasicTypeSchema(value: any) {
    if (typeof value === "string") {
      return { type: "STRING" };
    } else if (typeof value === "number") {
      return { type: Number.isInteger(value) ? "INTEGER" : "NUMBER" };
    } else if (typeof value === "boolean") {
      return { type: "BOOLEAN" };
    } else if (Array.isArray(value)) {
      return { type: "ARRAY" };
    } else if (typeof value === "object" && value !== null) {
      const properties: { [key: string]: any } = {};
      for (let key of Object.keys(value)) {
        properties[key] = convertToJsonSchema(value[key]);
      }
      return { type: "OBJECT", properties, required: Object.keys(properties) };
    }
    return { type: "UNKNOWN" };
  }

  if (!Array.isArray(inputData)) {
    return { ...inferBasicTypeSchema(inputData) };
  }

  const firstItem = inputData[0];
  return { ...inferBasicTypeSchema(firstItem) };
}
