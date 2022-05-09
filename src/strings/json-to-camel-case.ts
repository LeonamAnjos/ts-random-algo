export type JSONObject = {[key: string]: JSONValue};
export type JSONArray = Array<JSONValue>;
export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

export const snakeCaseToCamelCase = (str: string): string => {
    const arr = str.split("_").filter((s: string) => s.length > 0);
    for (let i = 1; i < arr.length; i++) {
        arr[i] = arr[i][0].toUpperCase() + arr[i].substring(1);
    }
    return arr.join("");
}

export const jsonToCamelCase = (json: JSONObject): JSONObject => {
    const result = {} as JSONObject;
    Object.entries(json).forEach(([k, v]) => {
        result[snakeCaseToCamelCase(k)] = Array.isArray(v) || typeof v !== "object"
            ? v
            : jsonToCamelCase(v as JSONObject);
    });

    return result;
}
