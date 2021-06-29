import browser from 'webextension-polyfill';
import {Extension} from '../../util/Extension';

browser.runtime.onMessage.addListener(async ({action, ...props}) => {
    switch (action) {
        case 'NOTIFY':
            await browser.notifications.create({
                iconUrl: 'icon128.png',
                message: props.notification.message,
                title: props.notification.title
                    || browser.i18n.getMessage('notification_title'),
                type: props.notification.type || 'basic',
            });
            break;
        case 'PHONE_COLLECTOR_CLOSE':
            await Extension.messageActiveTab({action: 'PHONE_COLLECTOR_CLOSE'});
            break;
        case 'PHONE_COLLECTOR_OPEN':
            /*            // TODO: send message in contentScripts.js

                        const phoneCollectorWindow = await browser.windows.create({
                            height: 600,
                            tabId: tab.id,
                            type: 'popup',
                            url: browser.extension.getURL('phoneCollector.html'),
                            width: 800,
                        });

                        console.log('phoneCollectorWindow', phoneCollectorWindow);*/
            break;
        default:
            throw new Error(`Unknown Action "${action}".`);
    }
});

browser.contextMenus.onClicked.addListener(async ({menuItemId, selectionText}) => {
    try { // https://github.com/mozilla/webextension-polyfill/issues/207
        await browser.tabs.sendMessage(
            (await browser.tabs.query({})).find(t => t.active).id,
            {menuItemId, selectionText});
    } catch {
    }
});

browser.runtime.onInstalled.addListener(() => {
    const createContextMenu = (id, title) => browser.contextMenus.create({
        contexts: [
            'all',
            // 'selection', // TODO?
        ],
        id,
        title: browser.i18n.getMessage(title),
    });

    createContextMenu('sms', 'send_sms');
    createContextMenu('voice', 'send_voice');
    createContextMenu('collect', 'collect_phones');
});
