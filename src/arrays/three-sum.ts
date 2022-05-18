/*

https://leetcode.com/problems/3sum/

    Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []
nums.siz
Constraints:

0 <= nums.length <= 3000
-105 <= nums[i] <= 105

*/


const threeSumAlgo = (nums: number[]): number[][] => {
    const findTarget = (a: number, b: number): number => -(a + b);

    nums.sort((a: number, b: number): number => a-b);  // O(n log n)

    const result: number[][] = [];
    for(let i = 0; i < nums.length - 2; i++) {   // O(n)
        if (nums[i] === nums[i-1]) continue;

        const seen = new Set<number>();
        for(let j = i + 1; j < nums.length; j++) {     // O(n)
            const target = findTarget(nums[i], nums[j]);
            if (seen.has(target)) {
                result.push([nums[i], target, nums[j]]);

                while (j < nums.length- 1 && nums[j] === nums[j+1]) j++;
            }
            seen.add(nums[j]);
        }
    }

    return result;
}

export const threeSum = (nums: number[]): Promise<number[][]> => {
    return new Promise<number[][]>((resolve, reject) => {
        try {
            resolve(threeSumAlgo(nums));
        } catch(error: unknown) {
            reject(error);
        }
    });
}
