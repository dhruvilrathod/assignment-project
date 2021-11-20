export class User {
    id: any;
    public constructor(
        public disabled: boolean,
        public mail: string,
        public name: string,
        public roles: []
    ) { }
}