import { Direction, isDirectionAscending, isDirectionOnAxisX } from "./directions";

export class Coordinates {
    constructor(
        private _x: number,
        private _y: number,
        private _direction: Direction) {
            /* EMPTY */
    }

    public get x(): number { return this._x; }
    public get y(): number { return this._y; }
    public get direction(): Direction { return this._direction; }

    public moveForward(): void {
        const progress = isDirectionAscending(this.direction) ? 1 : -1;
        this.move(progress);
    }

    public moveBackwards(): void {
        const progress = isDirectionAscending(this.direction) ? -1 : 1;
        this.move(progress);
    }

    public rotateLeft(): void {
        this._direction = this.direction > Direction.NORTH
            ? this.direction - 1
            : Direction.WEST;
    }

    public rotateRight(): void {
        this._direction = this.direction < Direction.WEST
            ? this.direction + 1
            : Direction.NORTH;
    }

    private move(progress: number): void {
        if (isDirectionOnAxisX(this.direction)) {
            this._x += progress;
        } else {
            this._y += progress;
        }
    }
}
