export default class Base<T> {
    [key: string]: any;

    constructor(initState: { [key: string]: any; } = {}) {
        for (const k in initState) {
            if (initState.hasOwnProperty(k)) {
                this[k] = initState[k];
            }
        }
    }
}
