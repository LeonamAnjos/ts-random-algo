import { ConwayGame, Cell } from "./conways-game";

describe("Position", () => {
  describe(".neighbours", () => {
    it(`SHOULD return WHEN Position(2, 2)`, () => {
      const actual = new Cell(2, 2).neighbours;
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(1, 1)`, () => {
      const actual = new Cell(1, 1).neighbours;
      expect(actual).toMatchSnapshot();
    });
  });

  describe(".neighboursInBound", () => {
    const minPos = new Cell(1, 1);
    const maxPos = new Cell(3, 3);

    it(`SHOULD return WHEN Position(1, 1)`, () => {
      const actual = new Cell(1, 1).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(2, 2)`, () => {
      const actual = new Cell(2, 2).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(1, 2)`, () => {
      const actual = new Cell(1, 2).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(2, 3)`, () => {
      const actual = new Cell(2, 3).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(3, 1)`, () => {
      const actual = new Cell(3, 1).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(1, 3)`, () => {
      const actual = new Cell(1, 3).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(3, 3)`, () => {
      const actual = new Cell(3, 3).neighboursInBound(minPos, maxPos);
      expect(actual).toMatchSnapshot();
    });

    it(`SHOULD return WHEN Position(4, 3)`, () => {
      const actual = new Cell(4, 3).neighboursInBound(minPos, new Cell(5, 6));
      expect(actual).toMatchSnapshot();
    });
  });
});

describe("ConwayGame", () => {
  it("SHOULD create", () => {
    const conwayGame = new ConwayGame(5, 7);

    expect(conwayGame).toBeDefined();
    expect(conwayGame.width).toBe(5);
    expect(conwayGame.height).toBe(7);
  });

  it("SHOULD fail WHEN width OR hight is invalid", () => {
    expect(() => new ConwayGame(-1, 1)).toThrowError("Invalid arguments");
    expect(() => new ConwayGame(0, 1)).toThrowError("Invalid arguments");
    expect(() => new ConwayGame(1, -1)).toThrowError("Invalid arguments");
    expect(() => new ConwayGame(1, 0)).toThrowError("Invalid arguments");
  });

  describe(".play", () => {
    const conwayGame = new ConwayGame(5, 6);

    [
      [],
      [new Cell(1, 1)],
      [new Cell(2, 2)],
      [new Cell(1, 3)],
      [new Cell(1, 1), new Cell(1, 2)],
      [new Cell(2, 1), new Cell(1, 3)],
      [new Cell(1, 1), new Cell(2, 2), new Cell(4, 3)],
    ].forEach((input: Cell[], index: number) => {
      it(`SHOULD return empty populated cells #${index}`, () => {
        expect(conwayGame.play(input).length).toBe(0);
      });
    });

    [
      [Cell.at(1, 1), Cell.at(1, 2), Cell.at(1, 3)],
      [
        Cell.at(2, 4),
        Cell.at(2, 5),
        Cell.at(3, 2),
        Cell.at(3, 4),
        Cell.at(4, 3),
        Cell.at(4, 4),
      ],
    ].forEach((input, index: number) => {
      it(`SHOULD return populated cells #${index}`, () => {
        const actual = conwayGame.play(input);
        expect(actual).toMatchSnapshot();
      });
    });
  });
});
