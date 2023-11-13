export default class Form {
    constructor(public readonly form: HTMLFormElement) {
    }

    toObject(): {} {
        return Object.fromEntries((new FormData(this.form)).entries())
    }
}
