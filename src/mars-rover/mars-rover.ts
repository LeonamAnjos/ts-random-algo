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

import { Coordinates } from "./coordinates";
import { Direction, parseDirection } from "./directions";

export type Command = "F" | "B" | "L" | "R";

export class MarsRover {
    private coordinates!: Coordinates;
    private readonly commandMap = new Map<Command, () => void>([
        ["F", () => this.coordinates.moveForward()],
        ["B", () => this.coordinates.moveBackwards()],
        ["L", () => this.coordinates.rotateLeft()],
        ["R", () => this.coordinates.rotateRight()],
    ]);


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

            commandFn();
        });
    }

    private parseCoordinates(value: string): Coordinates {
        const [x, y, d] = value.substring(1, value.length - 1).split(", ");
        return new Coordinates(+x, +y, parseDirection(d));
    }
}
