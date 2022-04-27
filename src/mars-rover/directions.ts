export enum Direction {
    NORTH = 1,
    EAST,
    SOUTH,
    WEST,
}

type DirectionStrings = keyof typeof Direction;

export const parseDirection = (str: string): Direction => {
    if (!str) {
        return Direction.NORTH;
    }

    const key = str.trim().toUpperCase();
    return Direction[key as DirectionStrings] ?? Direction.NORTH;
}

export const isDirectionOnAxisX = (direction: Direction): boolean => {
    return [Direction.EAST, Direction.WEST].includes(direction);
}

export const isDirectionAscending = (direction: Direction): boolean => {
    return [Direction.EAST, Direction.NORTH].includes(direction);
}
