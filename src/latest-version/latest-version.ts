class Version {
    private readonly arrVersion: number[] = [];

    constructor(version: string) {
        this.arrVersion = version.split(".").map((v: string) => +v);
    }

    public get major(): number {
        return this.arrVersion[0] ?? 0;
    }

    public get minor(): number {
        return this.arrVersion[1] ?? 0;
    }

    public get patch(): number {
        return this.arrVersion[2] ?? 0;
    }

    // Return:
    // -1: this version is SMALLER
    //  0: this version is EQUAL
    //  1: this version is BIGGER
    public compareTo(version: Version): number {
        if (this.major !== version.major) {
            return this.major < version.major ? -1 : 1;
        }

        if (this.minor !== version.minor) {
            return this.minor < version.minor ? -1 : 1;
        }

        if (this.patch !== version.patch) {
            return this.patch < version.patch ? -1 : 1;
        }

        return 0;
    }
}

export const latestVersion = (v1: string, v2: string): string => {
    const result = new Version(v1).compareTo(new Version(v2));
    return result > 0 ? v1 : v2;
}
