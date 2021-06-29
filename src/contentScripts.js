import browser from 'webextension-polyfill';
import {General} from './util/General';

browser.runtime.onMessage.addListener(async ({menuItemId, selectionText}) => {
    switch (menuItemId) {
        case 'collect':
            const collectedPhones = General.collectNumbers();
            await browser.storage.local.set(
                {...await browser.storage.local.get('sms77browser'), collectedPhones});
            //console.log('contentScripts::phones', phones);
            const iframe = document.createElement('iframe');
            iframe.name = 'sms77_collected_phones';
            //iframe.sms77 = {collectedPhones: phones};
            //iframe.contentWindow.sms77 = {collectedPhones: phones};
            // iframe.id = 'sms77_numberCollector';
            iframe.classList.add('modalDialog');
            iframe.src = browser.runtime.getURL('numberCollector.html');
            //iframe.style.display = 'none'; // frame will be visible otherwise
            document.querySelector('body').appendChild(iframe);
            //window.frames[iframe.name].insertAdjacentHTML('beforeend', `<div>${JSON.stringify(phones)}</div>`);
            // window.frames[iframe.name].sms77 = {collectedPhones};
            break;
        case 'sms':
        case 'voice':
            await General.sendSmsOrVoice(
                menuItemId, await General.getText(selectionText));
            break;

    }
});
