export const binarySearchV2 = <T>(arr: T[], element: T): number => {
    const search = (ini: number, end: number): number => {
        while (ini <= end) {
            const mid = Math.floor((ini + end) / 2);

            if (arr[mid] === element)
                return mid;

            if (element < arr[mid]) {
                end = mid - 1;
                continue;
            }

            ini = mid + 1;
        }

        return -1;
    }

    return search(0, arr.length - 1);
}


export const binarySearch = <T>(arr: T[], element: T): number => {
    const search = (ini: number, end: number): number => {
        const mid = Math.floor((ini + end) / 2);

        if (arr[mid] === element)
            return mid;

        if (element < arr[mid])
            return ini < mid - 1 ? search(ini, mid - 1) : -1;

        return end >= mid + 1 ? search(mid + 1, end) : -1;
    }

    return search(0, arr.length - 1);
}
