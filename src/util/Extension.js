import browser from 'webextension-polyfill';

export class Extension {
    static async getActiveTab() {
        const tabs = await browser.tabs.query({active: true, currentWindow: true});

        return tabs.shift();
    }

    static async messageActiveTab(data) {
        await browser.tabs.sendMessage((await Extension.getActiveTab()).id, data);
    }
}
