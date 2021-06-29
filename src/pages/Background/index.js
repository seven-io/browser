import browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener(async ({action, notification}) => {
    console.log('index.js:::browser.runtime.onMessage.addListener');

    if ('NOTIFY' !== action) console.warn(`Unknown Action "${action}".`);

    const opts = {
        iconUrl: 'icon128.png',
        title: browser.i18n.getMessage('notification_title'),
        type: 'basic',
        ...notification
    };

    await browser.notifications.create(opts);
});

browser.contextMenus.onClicked.addListener(async data => {
    const {menuItemId, selectionText} = data;

    /*console.log('browser.contextMenus.onClicked', data);
        const activeTabs = await browser.tabs.query({active: true});
        console.log('activeTabs', activeTabs);
        const currentWindowTabs = await browser.tabs.query({currentWindow: true});
        console.log('currentWindowTabs', currentWindowTabs);
        const lastFocusedWindowTabs = await browser.tabs.query({lastFocusedWindow: true});
        console.log('lastFocusedWindowTabs', lastFocusedWindowTabs);*/

    const allTabs = await browser.tabs.query({});
    //console.log('allTabs', allTabs);
    const activeTab = allTabs.find(t => t.active);
    //console.log('activeTab', activeTab);
    const tabId = activeTab.id; // activeTabs.shift().id

    console.log('tabId', tabId);
    console.log('preSendMessage', data);

    try { // https://github.com/mozilla/webextension-polyfill/issues/207
        await browser.tabs.sendMessage(tabId, {menuItemId, selectionText});
    } catch {
    }
});

browser.runtime.onInstalled.addListener(() => {
    const createContextMenu = (id, title) => {
        const opts = {
            contexts: ['all'], //['selection'],
            id,
            title: browser.i18n.getMessage(title),
        };

        browser.contextMenus.create(opts);
    };

    createContextMenu('sms', 'send_sms');
    createContextMenu('voice', 'send_voice');
    createContextMenu('collect', 'collect_numbers');
});
