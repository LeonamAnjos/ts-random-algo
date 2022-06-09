import { JSONArray, JSONObject } from "./json-to-camel-case";

const toCamelCaseV2 = (str: string): string => {
  if (!str) return "";

  return str
    .split(/[\W_]/g)
    .filter((word) => !!word)
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
    )
    .join("");
};

const jsonToCamelCaseV2 = (json: JSONObject): JSONObject => {
  const newJson: JSONObject = {};

  Object.entries(json).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      newJson[toCamelCaseV2(key)] = (value as JSONArray).map((val) =>
        typeof val === "object" && !Array.isArray(val)
          ? jsonToCamelCaseV2(val as JSONObject)
          : val
      );
    } else if (typeof value === "object") {
      newJson[toCamelCaseV2(key)] = jsonToCamelCaseV2(value as JSONObject);
    } else {
      newJson[toCamelCaseV2(key)] = value;
    }
  });

  return newJson;
};

export { jsonToCamelCaseV2, toCamelCaseV2 };
