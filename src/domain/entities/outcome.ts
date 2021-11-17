import { createUniqueId } from '../infra/createUniqueId';
import { Account } from './account';

class Outcome extends Account {
    constructor(
        value: number,
        description: string,
        public date: Date,
        public paid?: boolean
    ) {
        super(createUniqueId(), value, description);
    }
}

export { Outcome };
