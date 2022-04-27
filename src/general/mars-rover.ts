/*
Problem Description
You are part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet.
Write an idiomatic piece of software that translates the commands sent from earth to actions executed by the rover yielding a final state.

When the rover touches down on Mars, it is initialised with its current coordinates and the direction it is facing.
These could be any coordinates, supplied as arguments (x, y, direction) e.g. (4, 2, EAST).

Part I
The rover is given a command string which contains multiple commands.
This string must then be broken into each individual command and that command then executed.
Implement the following commands:

F -> Move forward on current heading
B -> Move backwards on current heading
L -> Rotate left by 90 degrees
R -> Rotate right by 90 degrees

An example command might be FLFFFRFLB

Once the full command string has been followed, the rover reports it's current coordinates and heading in the format (6, 4) NORTH
*/

enum Direction {
    NORTH = 1,
    EAST,
    SOUTH,
    WEST,
}

type DirectionStrings = keyof typeof Direction;

const parseDirection = (str: string): Direction => {
    if (!str) {
        return Direction.NORTH;
    }

    const key = str.trim().toUpperCase();
    return Direction[key as DirectionStrings] ?? Direction.NORTH;
}

type Coordinates = {
    x: number,
    y: number,
    direction: Direction,
}

const isAxisX = (direction: Direction): boolean => {
    return [Direction.EAST, Direction.WEST].includes(direction);
}

const isAscending = (direction: Direction): boolean => {
    return [Direction.EAST, Direction.NORTH].includes(direction);
}

const move = (coordinates: Coordinates, progress: number): Coordinates => {
    return isAxisX(coordinates.direction)
    ? {...coordinates, x: coordinates.x + progress}
    : {...coordinates, y: coordinates.y + progress};
}

const moveForward = (coordinates: Coordinates): Coordinates => {
    const progress = isAscending(coordinates.direction) ? 1 : -1;
    return move(coordinates, progress);
}

const moveBackwards = (coordinates: Coordinates): Coordinates => {
    const progress = isAscending(coordinates.direction) ? -1 : 1;
    return move(coordinates, progress);
}

const rotateLeft = (coordinates: Coordinates): Coordinates => {
    const direction = coordinates.direction > Direction.NORTH ? coordinates.direction - 1 : Direction.WEST;
    return {...coordinates, direction};
}

const rotateRight = (coordinates: Coordinates): Coordinates => {
    const direction = coordinates.direction < Direction.WEST ? coordinates.direction + 1 : Direction.NORTH;
    return {...coordinates, direction};
}

export type Command = "F" | "B" | "L" | "R";
export type CommandFn = (coordinates: Coordinates) => Coordinates;

export class MarsRover {
    private readonly commandMap = new Map<Command, CommandFn>([
        ["F", moveForward],
        ["B", moveBackwards],
        ["L", rotateLeft],
        ["R", rotateRight],
    ]);

    private coordinates!: Coordinates;

    public constructor(coordinates: string) {
        this.coordinates = this.parseCoordinates(coordinates);
    }

    public report(): string {
        const {x, y, direction} = this.coordinates;
        return `(${x}, ${y}) ${Direction[direction]}`;
    }

    public execute(commands: string): void {
        if (!commands) {
            return;
        }

        commands.split("").forEach((strCommand: string) => {
            const commandFn = this.commandMap.get(strCommand as Command);
            if (!commandFn) {
                return;
            }

            this.coordinates = commandFn(this.coordinates);
        });
    }

    private parseCoordinates(value: string): Coordinates {
        const [x, y, d] = value.substring(1, value.length - 1).split(", ");
        return {
            x: +x,
            y: +y,
            direction: parseDirection(d),
        }
    }
}
