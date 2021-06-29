export class Form {
    constructor(form) {
        this.form = form;
    }

    toObject() {
        return Object.fromEntries((new FormData(this.form)).entries());
    }
}
