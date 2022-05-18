/*

https://leetcode.com/problems/3sum-closest/

Given an integer array nums of length n and an integer target,
find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Example 2:

Input: nums = [0,0,0], target = 1
Output: 0

Constraints:

3 <= nums.length <= 1000
-1000 <= nums[i] <= 1000
-104 <= target <= 104

*/


export const threeSumClosest = (nums: number[], target: number): number => {
    const closer = (a: number, b: number): number => Math.abs(a - target) > Math.abs(b - target) ? b : a;

    let result = Number.POSITIVE_INFINITY;

    nums.sort((a, b) => a - b);

    for(let i = 0; i < nums.length - 2; i++) {
        if(nums[i] === nums[i-1]) continue;

        let [s, f] = [i+1, nums.length - 1];

        while (s < f) {
            const sum = nums[i] + nums[s] + nums[f];
            if (sum === target)
                return sum;

            result = closer(result, sum);
            if (sum > target) {
                f--;
                while(nums[f] === nums[f+1] && f > s) f--;
            } else {
                s++;
                while(nums[s] === nums[s-1] && f > s) s++;
            }
        }
    }

    return result;
};
