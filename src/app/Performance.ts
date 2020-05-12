class Performance {
    description: string;
    startedAt = 0;

    constructor(description: string) {
        this.description = description;
    }

    start = () => {
        this.startedAt = performance.now();
    }

    end = () => {
        console.log(`Task "${this.description}" run for ${performance.now() - this.startedAt} ms`);
    }
}

export default Performance;
