export abstract class Account {

    constructor(
        private id: string,
        public value: number,
        public description: string
    ) { }

    getId(): string {
        return this.id;
    }
}

