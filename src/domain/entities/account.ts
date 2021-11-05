export abstract class Account {
    public createdAt: Date;

    constructor(
        private id: string,
        public value: number,
        public description: string
    ) {
        this.createdAt = new Date();
    }

    getId(): string {
        return this.id;
    }
}

