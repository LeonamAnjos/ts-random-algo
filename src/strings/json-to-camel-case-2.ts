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

  Object.keys(json).forEach((key: string) => {
    if (Array.isArray(json[key])) {
      newJson[toCamelCaseV2(key)] = (json[key] as JSONArray).map((value) =>
        typeof value === "object" && !Array.isArray(value)
          ? jsonToCamelCaseV2(value as JSONObject)
          : value
      );
    } else if (typeof json[key] === "object") {
      newJson[toCamelCaseV2(key)] = jsonToCamelCaseV2(json[key] as JSONObject);
    } else {
      newJson[toCamelCaseV2(key)] = json[key];
    }
  });

  return newJson;
};

export { jsonToCamelCaseV2, toCamelCaseV2 };
