import browser from 'webextension-polyfill';
import {uniq} from 'lodash';
import Settings from './Settings';

export class General {
    static WRAPPER_ID = 'root';

    static cleanNumber(number) {
        return number
            .replace('\t', '')
            .replace('\n', '')
            .replace('\r', '')
            .replace('+', '')
            .replace('-', '')
            .replace('–', '')
            .replace('(', '')
            .replace(')', '')
            .replace(/\s+/g, '')
            ;
    }

    static collectNumbers(source = document.body) {
        const numbers = [];

        numbers.push(
            ...source.innerText.match(/^[+]*[(]?[0-9]{1,4}[)]?[–\-\s./0-9]*$/gim));

        return uniq(numbers.map(n => General.cleanNumber(n)));
    }

    static async sendSMS(text, to = null, from = null, extraOptions = {}) {
        await General.sendSmsOrVoice('sms', text, to, from, extraOptions);
    }

    static async sendVoice(text, to = null, from = null, extraOptions = {}) {
        for (const _to of Array.isArray(to) ? to : [to])
            await General.sendSmsOrVoice('voice', text, _to, from, extraOptions);
    }

    static async post(endpoint, apiKey, body) {
        const response = await fetch(`https://gateway.sms77.io/api/${endpoint}`, {
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                SentWith: 'InstallTrigger' in window ? 'firefox' : 'chrome', // TODO: improve detection
                'X-Api-Key': apiKey,
            },
            method: 'POST',
        });
        return await response.json();
    }

    static async sendSmsOrVoice(type, text, to, from, extraOptions = {}) {
        try {
            const apiKey = await General.getApiKey();

            if (!(apiKey || '').length)
                return await General.notify('api_key_set', 'api_key_required');

            text = await General.getText(text);
            from = await General.getFrom(from);
            to = await General.getTo(to);
            if (Array.isArray(to)) to = to.join(',');

            const json = await General.post(type, apiKey, {
                from,
                text,
                to,
                ...extraOptions,
            });

            const successCodes = [100];
            if ('sms' === type) successCodes.push(101);
            const isSuccess = successCodes.includes(Number.parseInt(json.success));

            await General.notify([
                isSuccess ? 'msg_dispatch_success' : 'msg_dispatch_error',
                [type.toUpperCase(), to, ...isSuccess ? [from, text] : [text]]]);
        } catch (e) {
            await General.notify(e);
        }
    }

    static async getText(text = null) {
        if (!(text || '').length) text = prompt(browser.i18n.getMessage('prompt_text'));

        text = text || '';
        text = await General.addSignature(text);

        if (!(text || '').length) throw new Error(browser.i18n.getMessage('error_text'));

        return text;
    };

    static async getFrom(from = null) {
        if ((from || '').length) return from;

        return await General.promptEmpty('from', browser.i18n.getMessage('prompt_from'));
    }

    static async addSignature(text) {
        const signature = await Settings.getByKey('signature');
        if (signature)
            text = 'append' === await Settings.getByKey('signaturePosition')
                ? `${text}${signature}` : `${signature}${text}`;

        return text;
    }

    static async getTo(to = null) {
        if ((to || '').length) return to;

        to = await General.promptEmpty('to', browser.i18n.getMessage('prompt_to'));

        if (!(to || '').length) throw new Error(browser.i18n.getMessage('error_to'));

        return to;
    };

    static async getApiKey() {
        const errMsg = browser.i18n.getMessage('api_key_required');

        let apiKey = await Settings.getByKey('apiKey');

        if (!apiKey) {
            apiKey = prompt(errMsg);

            if (apiKey) await Settings.setByKey('apiKey', apiKey);
        }

        if (!(apiKey || '').length) throw new Error(errMsg);

        return apiKey;
    };

    static async notify(message, title = 'message_status', type = 'basic') {
        let placeholders = [];

        if (Array.isArray(message)) {
            placeholders = message[1];
            message = message[0];
        }

        const translatedMessage = browser.i18n.getMessage(message, placeholders);
        if ('' !== translatedMessage) message = translatedMessage;

        return browser.runtime.sendMessage({
            action: 'NOTIFY',
            notification: {
                message: typeof message === 'string'
                    ? message : message.message
                        ? message.message : JSON.stringify(message),
                title: browser.i18n.getMessage(title),
                type,
            },
        });
    }

    static async promptEmpty(key, msg) {
        let value = await Settings.getByKey(key);

        if (!(value || '').length) value = prompt(msg);

        return value;
    }
}
