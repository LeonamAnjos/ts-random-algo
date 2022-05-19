# Typescript Playground

## Content

### Arrays
* Binary Search ([source](./src/arrays/binary-search.ts])) ([test](./test/arrays/binary-search.spec.ts))
* Minimum Swaps ([source](./src/arrays/minimum-swaps.ts])) ([test](./test/arrays/minimum-swaps.spec.ts))
* Three Sum ([source](./src/arrays/three-sum.ts])) ([test](./test/arrays/three-sum.spec.ts))
* Three Sum Closest ([source](./src/arrays/three-sum-closest.ts])) ([test](./test/arrays/three-sum-closest.spec.ts))

### Inventory
* Arrange ([source](./src/inventory/arrange.ts])) ([test](./test/inventory/arrange.spec.ts))


### Mars Rover
* Mars Rover ([source](./src/mars-rover/mars-rover.ts])) ([test](./test/mars-rover/mars-rover.spec.ts))


### Sorting
* Merge Sorted Array ([source](./src/sorting/merge-sorted-array.ts])) ([test](./test/sorting/merge-sorted-array.spec.ts))

### Strings
* Json to Camel Case ([source](./src/strings/json-to-camel-case.ts])) ([test](./test/strings/json-to-camel-case.spec.ts))
* My AtoI ([source](./src/strings/my-atoi.ts])) ([test](./test/strings/my-atoi.spec.ts))

### Task Manager
* Task Manager ([source](./src/task-manager/task-manager.ts])) ([test](./test/task-manager/task-manager.spec.ts))
* Task Timeout ([source](./src/task-manager/task-timeout.ts])) ([test](./test/task-manager/task-timeout.spec.ts))


## Create project

This project was created using Vite with the following commands:

```sh
yarn create vite
yarn add --dev jest typescript ts-jest @types/jest
yarn install
yarn ts-jest config:init
```

Add test script to `package.json`.
```json
{
    ...
    "scripts": {
        ...
        "test": "jest --watchAll --verbose"
    }
    ...
}
```
