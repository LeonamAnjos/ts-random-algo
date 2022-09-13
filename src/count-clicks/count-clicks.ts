type TCountDomain = { domain: string, count: number };

const breakdownDomain = (domain: string): string[] => {
    const arr: string[] = [domain];

    const split = domain.split(".");
    while (split.length > 1) {
        split.shift();
        arr.push(split.join("."));
    }
    return arr;
}

const transformToCountDomain = (input: string): TCountDomain => {
    const [clicks, domain] = input.split(",");
    return { domain, count: +clicks };
}

export const countClicks = (clicks: string[]): Map<string, number> => {
    const map = new Map<string, number>();

    clicks.map(transformToCountDomain).forEach((value) => {
        const { domain, count } = value;
        for(const domainPart of breakdownDomain(domain)) {
            map.set(domainPart, (map.get(domainPart) ?? 0) + count);
        }
    });

    return map;
}
