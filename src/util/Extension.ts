import browser, {type Tabs} from 'webextension-polyfill'

export default class Extension {
    static async getActiveTab(): Promise<Tabs.Tab | undefined> {
        const tabs = await browser.tabs.query({active: true, currentWindow: true})

        return tabs.shift()
    }

    static async messageActiveTab(data: any): Promise<void> {
        const activeTab = await Extension.getActiveTab()
        if (!activeTab) {
            console.warn('No active tab found')
            return
        }
        if (!activeTab.id) {
            console.warn('Active tab has no ID')
            return
        }
        await browser.tabs.sendMessage(activeTab.id, data)
    }
}
