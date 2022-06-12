/*
    Input.: list of time (in seconds), user and resource accessed at certain day.
    Output: the resource most accessed in a interval of 5 minutes.

    Example:

    input: [
        ["300", "user_1", "resource_1"],
        ["400", "user_2", "resource_2"],
        ["500", "user_3", "resource_1"],
        ["2000", "user_4", "resource_1"],
        ["2100", "user_3", "resource_2"],
        ["3000", "user_2", "resource_2"],
        ["3500", "user_1", "resource_2"],
    ]

    output: "('resource_1'), 2"

    Explanation:
    - From time 300 till 500 (interval of 5 minutes), resource_1 was accessed twice.
*/

type ResourceAccessCounter = {
  resource: string;
  count: number;
};

const TIME_PERIOD = 300;

const mostAccessInPeriod = (
  access: number[],
  period: number = TIME_PERIOD
): number => {
  const sortedAccess = access.sort((a, b) => a - b); // O(n log n)

  const map = new Map<number, number>();
  for (let i = 0; i < sortedAccess.length; i++) {
    map.set(sortedAccess[i], 1);

    for (let j = i + 1; j < sortedAccess.length; j++) {
      if (sortedAccess[j] - sortedAccess[i] > period) {
        break;
      }
      map.set(sortedAccess[i], (map.get(sortedAccess[i]) ?? 1) + 1);
    }
  }

  return Array.from(map.values()).reduce(
    (previous, current) => (current > previous ? current : previous),
    0
  );
};

const mostRequestedResource = (logs: string[][]): ResourceAccessCounter => {
  const map = new Map<string, number[]>();

  for (const [time, _, resource] of logs) {
    const times = map.get(resource) ?? [];
    times.push(+time);
    map.set(resource, times);
  }

  let mostRequested = {
    resource: "",
    count: 0,
  };

  for (const [resource, access] of map.entries()) {
    const count = mostAccessInPeriod(access, TIME_PERIOD);

    if (mostRequested.count < count) {
      mostRequested = {
        resource,
        count,
      };
    }
  }

  return mostRequested;
};

export { mostRequestedResource };
