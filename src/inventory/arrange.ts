/*
    order: array with 3 numbers, as follows:
        [
            items: amount of items to be sent to wharehouse;
            distance_to_warehouse_1: unit of distance till wharehouse 1;
            distance_to_warehouse_2: unit of distance till wharehouse 2;
        ]

    Given a list of orders, arrange the items taking into account the distance to the warehouse. The closer, the better.

    Given the warehouse ID, return the percentage of items that will be sent to the warehouse.

    Example:
      arrange([[6, 5, 7], [4, 6, 5]], 1) =>  60 //  60% of the items go to warehouse 1
      arrange([[6, 5, 7], [4, 6, 5]], 2) =>  40 //  40% of the items go to warehouse 2
      arrange([[6, 5, 7], [4, 2, 5]], 1) => 100 // 100% of the items go to warehouse 1
      arrange([[6, 5, 7], [4, 2, 5]], 2) =>   0 //   0% of the items go to warehouse 2
      arrange([[6, 5, 5], [4, 5, 5]], 1) =>  50 //  50% of the items go to warehouse 1
      arrange([[6, 5, 5], [4, 5, 5]], 2) =>  50 //  50% of the items go to warehouse 2

*/

const getItems = (order: number[]): number => order[0];

const getDistribuion = (order: number[]): number[] => {
    const [i, d1, d2] = order;

    if (d1 === d2) {
        return [i/2, i/2];
    }

    return [
        (d1 < d2) ? i : 0,
        (d1 > d2) ? i : 0,
    ];
};

export const arrange = (orders: number[][], warehouse: number): number => {
    const distribution = orders.reduce((previous, current): number[] => ([
            previous[0] + getItems(current),
            previous[1] + getDistribuion(current)[0],
            previous[2] + getDistribuion(current)[1],
        ])
    , [0,0,0]);

    if (distribution[0] === 0) {
        return 0;
    }

    return (distribution[warehouse] / distribution[0]) * 100;
}
