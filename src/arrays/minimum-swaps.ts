/*
You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] without any duplicates.
You are allowed to swap any two elements.
Find the minimum number of swaps required to sort the array in ascending order.

https://www.hackerrank.com/challenges/minimum-swaps-2/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
*/

export const minimumSwaps = (arr: number[]): number => {
    let count = 0;
    for(let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == i + 1) continue;

        for(let y = i + 1; y < arr.length; y++) {
            if (arr[y] != i + 1) continue;

            const e = arr[y];
            arr[y] = arr[i];
            arr[i] = e;

            count++;
            break;
        }
    }
    return count;
}
