import browser from 'webextension-polyfill';

export class Storage {
    storage = browser.storage.sync;

    constructor(rootKey, defaults) {
        this.rootKey = rootKey;
        this.defaults = defaults;
    }

    async getAll() {
        let result = await this.storage.get(this.rootKey);

        if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError);

            return this.defaults;
        }

        result = result[this.rootKey];

        return result ? result : await this.setDefaults();
    }

    async getByKey(key) {
        let obj = await this.storage.get(this.rootKey);

        if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError);

            return null;
        }

        if (!(this.rootKey in obj)) {
            await this.setDefaults();

            return this.getByKey(key);
        }

        return obj[this.rootKey][key];
    }

    async setDefaults() {
        return await this.setObject(this.defaults);
    }

    async setByKey(key, value) {
        return await this.setObject({[key]: value});
    }

    async setObject(object) {
        await this.storage.set({[this.rootKey]: object});

        return object;
    }
}
