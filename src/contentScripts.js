import browser from 'webextension-polyfill';
import {General} from './util/General';

const iframeName = 'sms77_collected_phones';

browser.runtime.onMessage.addListener(async data => {
    const {action, menuItemId} = data;

    if ('action' in data) switch (action) {
        case 'PHONE_COLLECTOR_CLOSE':
            document.querySelector(`iframe[name='${iframeName}']`).remove();
            break;

        default:
            throw new Error(`Unknown action ${action}`);
    }

    else if ('menuItemId' in data) switch (menuItemId) {
        case 'collect':
            const {sms77browser} = await browser.storage.local.get('sms77browser');

            await browser.storage.local.set({
                sms77browser: {
                    ...(sms77browser || {}),
                    collectedPhones: General.collectNumbers(),
                }
            });

            // await chrome.runtime.sendMessage({action: "PHONE_COLLECTOR_OPEN"}); TODO - see Background/index.js@PHONE_COLLECTOR_OPEN

            document.querySelector('body').append((() => {
                const iframe = document.createElement('iframe');
                iframe.classList.add('phoneCollector');
                iframe.name = iframeName;
                iframe.src = browser.runtime.getURL('phoneCollector.html');
                Object.entries({
                    backgroundColor: '#cdcdcd',
                    height: '100%',
                    opacity: .9,
                    position: 'fixed',
                    width: '100%',
                    zIndex: Number.MAX_SAFE_INTEGER,
                }).forEach(([k, v]) => iframe.style[k] = v);

                return iframe;
            })());
            break;
        case 'sms':
        case 'voice':
            await General.sendSmsOrVoice(
                menuItemId, await General.getText(data.selectionText));
            break;
        default:
            throw new Error(`Unknown menuItemId ${menuItemId}`);
    }
});
