/*

    2
   / \
  3   7
 / \   \
5   8   9

maxValPerLevel = [2, 7, 9]

*/

export interface TreeNode {
  value: number;
  left?: TreeNode | undefined;
  right?: TreeNode | undefined;
}

const findMaxValPerLevel = (
  root: TreeNode | undefined,
  level: number,
  arr: number[]
): void => {
  if (!root) return;

  if (arr.length === level) {
    arr.push(root.value);
  } else {
    arr[level] = Math.max(arr[level], root.value);
  }

  findMaxValPerLevel(root.left, level + 1, arr);
  findMaxValPerLevel(root.right, level + 1, arr);
};

export const maxValPerLevel = (root: TreeNode): number[] => {
  const arr: number[] = [];

  findMaxValPerLevel(root, 0, arr);

  return arr;
};
