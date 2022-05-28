import { Command, MarsRover } from "./mars-rover";

describe(MarsRover.name, () => {
  describe(MarsRover.prototype.report.name, () => {
    [
      {
        input: "(4, 2, EAST)",
        expected: "(4, 2) EAST",
      },
      {
        input: "(3, 7, NORTH)",
        expected: "(3, 7) NORTH",
      },
      {
        input: "(10, 1, West)",
        expected: "(10, 1) WEST",
      },
      {
        input: "(1, 10, south)",
        expected: "(1, 10) SOUTH",
      },
      {
        input: "(1, 10, invalid)",
        expected: "(1, 10) NORTH",
      },
      {
        input: "(1, 10)",
        expected: "(1, 10) NORTH",
      },
    ].forEach(({ input, expected }, index: number): void => {
      it(`#${index + 1}:`, () => {
        expect(new MarsRover(input).report()).toEqual(expected);
      });
    });
  });

  describe(MarsRover.prototype.execute.name, () => {
    describe("WHEN invalid command", () => {
      const marsRover = new MarsRover("(4, 2, EAST)");
      [
        {
          command: "",
          expected: "(4, 2) EAST",
        },
        {
          command: "A",
          expected: "(4, 2) EAST",
        },
        {
          command: "1",
          expected: "(4, 2) EAST",
        },
        {
          command: "@",
          expected: "(4, 2) EAST",
        },
      ].forEach(({ command, expected }, index: number) => {
        it(`#${index + 1}`, () => {
          marsRover.execute(command);
          expect(marsRover.report()).toEqual(expected);
        });
      });
    });

    describe("WHEN move forward command", () => {
      const command: Command = "F";
      [
        {
          marsRover: new MarsRover("(4, 2, EAST)"),
          expected: "(5, 2) EAST",
        },
        {
          marsRover: new MarsRover("(4, 2, NORTH)"),
          expected: "(4, 3) NORTH",
        },
        {
          marsRover: new MarsRover("(4, 2, WEST)"),
          expected: "(3, 2) WEST",
        },
        {
          marsRover: new MarsRover("(4, 2, SOUTH)"),
          expected: "(4, 1) SOUTH",
        },
      ].forEach(({ marsRover, expected }, index: number) => {
        it(`#${index + 1}`, () => {
          marsRover.execute(command);
          expect(marsRover.report()).toEqual(expected);
        });
      });
    });

    describe("WHEN move backwards command", () => {
      const command: Command = "B";
      [
        {
          marsRover: new MarsRover("(4, 2, EAST)"),
          expected: "(3, 2) EAST",
        },
        {
          marsRover: new MarsRover("(4, 2, NORTH)"),
          expected: "(4, 1) NORTH",
        },
        {
          marsRover: new MarsRover("(4, 2, WEST)"),
          expected: "(5, 2) WEST",
        },
        {
          marsRover: new MarsRover("(4, 2, SOUTH)"),
          expected: "(4, 3) SOUTH",
        },
      ].forEach(({ marsRover, expected }, index: number) => {
        it(`#${index + 1}`, () => {
          marsRover.execute(command);
          expect(marsRover.report()).toEqual(expected);
        });
      });
    });

    describe("WHEN rotate left command", () => {
      const command: Command = "L";
      [
        {
          marsRover: new MarsRover("(4, 2, EAST)"),
          expected: "(4, 2) NORTH",
        },
        {
          marsRover: new MarsRover("(4, 2, NORTH)"),
          expected: "(4, 2) WEST",
        },
        {
          marsRover: new MarsRover("(4, 2, WEST)"),
          expected: "(4, 2) SOUTH",
        },
        {
          marsRover: new MarsRover("(4, 2, SOUTH)"),
          expected: "(4, 2) EAST",
        },
      ].forEach(({ marsRover, expected }, index: number) => {
        it(`#${index + 1}`, () => {
          marsRover.execute(command);
          expect(marsRover.report()).toEqual(expected);
        });
      });
    });

    describe("WHEN rotate right command", () => {
      const command: Command = "R";
      [
        {
          marsRover: new MarsRover("(4, 2, EAST)"),
          expected: "(4, 2) SOUTH",
        },
        {
          marsRover: new MarsRover("(4, 2, NORTH)"),
          expected: "(4, 2) EAST",
        },
        {
          marsRover: new MarsRover("(4, 2, WEST)"),
          expected: "(4, 2) NORTH",
        },
        {
          marsRover: new MarsRover("(4, 2, SOUTH)"),
          expected: "(4, 2) WEST",
        },
      ].forEach(({ marsRover, expected }, index: number) => {
        it(`#${index + 1}`, () => {
          marsRover.execute(command);
          expect(marsRover.report()).toEqual(expected);
        });
      });
    });

    describe("WHEN multiple commands", () => {
      const marsRover = new MarsRover("(4, 2, EAST)");
      [
        {
          commands: "FLFFFRFLB",
          expected: "(6, 4) NORTH",
        },
        {
          commands: "F_L",
          expected: "(6, 5) WEST",
        },
      ].forEach(({ commands, expected }, index: number) => {
        it(`#${index + 1}`, () => {
          marsRover.execute(commands);
          expect(marsRover.report()).toEqual(expected);
        });
      });
    });
  });
});
