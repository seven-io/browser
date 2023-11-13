import {uniq} from 'lodash'
import ReactDOM from 'react-dom/client'
import browser from 'webextension-polyfill'

export default abstract class General {
    static createRoot(): ReactDOM.Root {
        return ReactDOM.createRoot(document.getElementById('root')!)
    }

    static collectNumbers(source = document.body): string[] {
        const numbers = []

        numbers.push(
            ...source.innerText.match(/^[+]*[(]?[0-9]{1,4}[)]?[–\-\s./0-9]*$/gim) ?? [],
        )

        return uniq(numbers.map(General.cleanNumber))
    }

    static async notify(
        message: string | Error | [string, string[]],
        title = 'message_status',
        type = 'basic',
    ): Promise<any> {
        let placeholders: string[] = []

        if (Array.isArray(message)) {
            placeholders = message[1]
            message = message[0]
        }

        const messageName = typeof message === 'string' ? message : message.message
        const translatedMessage = browser.i18n.getMessage(messageName, placeholders)
        if ('' !== translatedMessage) message = translatedMessage

        return browser.runtime.sendMessage({
            action: 'NOTIFY',
            notification: {
                message: typeof message === 'string'
                    ? message : message.message
                        ? message.message : JSON.stringify(message),
                title: browser.i18n.getMessage(title),
                type,
            },
        })
    }

    protected static cleanNumber(number: string): string {
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

    }
}
