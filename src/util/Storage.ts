import browser from 'webextension-polyfill'

export default class Storage<T extends {
    [k: string]: any
}> {
    storage = browser.storage.sync

    constructor(public readonly rootKey: string, public readonly defaults: T) {
    }

    async getAll(): Promise<any> {
        let result = await this.storage.get(this.rootKey)

        if (browser.runtime.lastError) {
            console.error(browser.runtime.lastError)

            return this.defaults
        }

        result = result[this.rootKey]

        return result ? result : await this.setDefaults()
    }

    async getByKey<K extends keyof T>(key: K): Promise<T[K]> {
        let obj = await this.storage.get(this.rootKey)

        if (browser.runtime.lastError) {
            throw new Error(`Failed to retrieve setting by key: ${String(key)}`)
            /*         console.error(browser.runtime.lastError)
                     return null*/
        }

        if (!(this.rootKey in obj)) {
            await this.setDefaults()

            return await this.getByKey(key)
        }

        console.log('Storage.getByKey', key, obj[this.rootKey][key])

        return obj[this.rootKey][key]
    }

    async setByKey(key: string, value: any): Promise<{}> {
        return await this.setObject({[key]: value})
    }

    async setObject(object: {}): Promise<{}> {
        await this.storage.set({[this.rootKey]: object})

        return object
    }

    protected async setDefaults(): Promise<{}> {
        return await this.setObject(this.defaults)
    }
}
