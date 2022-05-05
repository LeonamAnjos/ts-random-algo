/*
https://leetcode.com/explore/interview/card/top-interview-questions-easy/127/strings/884/

Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function).

The algorithm for myAtoi(string s) is as follows:

Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string) is '-' or '+'. Read this character in if it is either. This determines if the final result is negative or positive respectively. Assume the result is positive if neither is present.
Read in next the characters until the next non-digit character or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32). If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then clamp the integer so that it remains in the range. Specifically, integers less than -231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result.
Note:

Only the space character ' ' is considered a whitespace character.
Do not ignore any characters other than the leading whitespace or the rest of the string after the digits.

Input: s = "42"
Output: 42

Input: s = "   -42"
Output: -42

Input: s = "4193 with words"
Output: 4193
*/

const minNumber = (-2)**31;
const maxNumber = (2)**31-1;

export const myAtoi2 = (s: string): number => {
    let start = 0
    let end = 0

    // 1.
    while (s[start] === " "){
      start++
    }

    // 2.
    let sign = "+"
    if (s[start] === "+" || s[start] === "-" ){
      sign = s[start]
      start++
    }

    while(s[start + end] === "0"){
      start++
    }

    const digits = Array.from("0123456789");
    if (!(s[start + end] in digits)){
      return 0
    }

    while(s[start + end] in digits){
      end++
    }

    s = sign + s.slice(start,start + end)


    let res = Number(s)
    if (isNaN(res)) {
        return 0
    }

    res = res < minNumber ? minNumber : res
    res = res > maxNumber ? maxNumber : res

    return  res
};

export const myAtoi = (str: string): number => {
    const s = str.trim();
    const num = s.match(/[+\-]?\d+/) ?? ["0"];
    if (!s.startsWith(num[0])) {
        return 0;
    }

    const i = Number(num);
    if(isNaN(i)) return 0;

    const big = i > 0 ? maxNumber : minNumber;
    return Math.abs(i) > maxNumber ? big : i;
};
