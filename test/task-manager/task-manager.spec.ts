import { TaskManager } from "../../src/task-manager/task-manager";
import { delay, randomInt } from "../utils";

describe(TaskManager.name, () => {
    describe(".concurrency", () => {
        [
            {
                options: undefined,
                expected: Number.POSITIVE_INFINITY,
            },
            {
                options: {},
                expected: Number.POSITIVE_INFINITY,
            },
            {
                options: { concurrency: 10 },
                expected: 10,
            },
        ].forEach(({options, expected}, index) => {
            it(`#${index}`, () => {
                expect(new TaskManager(options).concurrency).toBe(expected);
            });
        });
    });


    describe(".doesConcurrentAllowAnother", () => {
        const taskManager = new TaskManager({concurrency: 2});

        it("SHOULD allow another", async () => {
            Array.from({length: taskManager.concurrency - 1}).map(() => taskManager.add(() => {}));
            expect(taskManager.doesConcurrentAllowAnother).toBeTruthy();
        });

        it("SHOULD NOT allow another", () => {
            Array.from({length: taskManager.concurrency}).map(() => taskManager.add(() => {}));
            expect(taskManager.doesConcurrentAllowAnother).toBeFalsy();
        });
    });

    describe(".add()", () => {
        const taskManager = new TaskManager({concurrency: 5});

        it("SHOULD resolve WHEN added 1 task AND it resolves", async () => {
            expect.assertions(1);
            const fixture = Symbol("fixture");
            await expect(taskManager.add(() => fixture)).resolves.toBe(fixture);
        });

        it("SHOULD reject WHEN added 1 task AND it throws", async () => {
            expect.assertions(1);
            const error = new Error("fixture");
            await expect(taskManager.add(() => {throw error})).rejects.toBe(error);
        });

        it("SHOULD limit the number of tasks running WHEN the limit is less then number of tasks", async () => {
            const length = taskManager.concurrency * 3;
            expect.assertions(length);

            let running = 0;
            const promises = Array.from({length}).map(() => taskManager.add(async () => {
                running++;
                expect(running <= taskManager.concurrency).toBeTruthy();
                await delay(randomInt(10, 20));
                running--;
            }));

            await Promise.all(promises);
        });
    });
});
