/*
Conway’s Game of Life
The game is played on a grid of cells.
Each cell can be populated or unpopulated.

The game takes place over a series of generations. Each generation is derived from the previous generation by applying a set of rules as follows:

For a cell that is populated:
If it has one or less populated neighbours, it dies
If it has four or more populated neighbours, it dies
If it has  two or three populated neighbours, it survives

For a cell that is 'empty' or 'unpopulated'
If it has three neighbours, it becomes populated.

NB: All rules are applied in parallel. That is, the death of a cell in this generation does not affect its neighbours in this generation
*/

export class Cell {
  static at(x: number, y: number): Cell {
    return new Cell(x, y);
  }

  static from(str: string): Cell {
    const [x, y] = str.split(",");
    return new Cell(+x, +y);
  }

  constructor(public readonly x: number, public readonly y: number) {}

  public get neighbours(): Cell[] {
    return [
      Cell.at(this.x, this.y + 1),
      Cell.at(this.x, this.y - 1),
      Cell.at(this.x + 1, this.y),
      Cell.at(this.x - 1, this.y),
      Cell.at(this.x + 1, this.y + 1),
      Cell.at(this.x + 1, this.y - 1),
      Cell.at(this.x - 1, this.y + 1),
      Cell.at(this.x - 1, this.y - 1),
    ];
  }

  public neighboursInBound(min: Cell, max: Cell) {
    return this.neighbours
      .filter(({ x, y }) => x >= min.x && y >= min.y)
      .filter(({ x, y }) => x <= max.x && y <= max.y);
  }

  public format(): string {
    return `${this.x},${this.y}`;
  }
}

export class ConwayGame {
  private readonly min!: Cell;
  private readonly max!: Cell;

  constructor(public readonly width: number, public readonly height: number) {
    if (this.width < 1 || this.height < 1) {
      throw Error("Invalid arguments");
    }

    this.min = new Cell(1, 1);
    this.max = new Cell(width, height);
  }

  public play(populatedCells: Cell[]): Cell[] {
    if (populatedCells.length < 3) return [];

    const populated = new Set(populatedCells.map((c) => c.format()));
    const neighboursCount = new Map<string, number>();
    const survivors: Cell[] = [];

    for (const cell of populatedCells) {
      const neighbours = cell.neighbours
        .filter((c) => !this.isOutOfBound(c))
        .map((c) => c.format());

      let count = 0;
      for (const n of neighbours) {
        if (populated.has(n)) count++;

        neighboursCount.set(n, (neighboursCount.get(n) ?? 0) + 1);
      }

      if (count > 1 && count < 4) survivors.push(cell);
    }

    for (const [k, v] of neighboursCount) {
      if (v === 3 && !populated.has(k)) {
        survivors.push(Cell.from(k));
      }
    }

    return survivors.filter((c) => !!c);
  }

  private isOutOfBound({ x, y }: Cell): boolean {
    return x < this.min.x || y < this.min.y || x > this.max.x || y > this.max.y;
  }
}
