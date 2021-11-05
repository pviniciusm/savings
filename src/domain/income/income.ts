class Income {
    constructor(
        public value: number,
        public description: string,
        public date: Date,
        public paid?: boolean
    ) {}
}

export {Income};