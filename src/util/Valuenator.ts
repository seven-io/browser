import type {MessageType} from '@/pages/PhoneCollector/ExtraOptions'
import browser from 'webextension-polyfill'
import Settings from './Settings'

export default abstract class Valuenator {
    static async text(text: string | null = null): Promise<string> {
        if (!text?.length) text = prompt(browser.i18n.getMessage('prompt_text'))

        text = await Valuenator.addSignature(text || '')

        if (!text?.length) throw new Error(browser.i18n.getMessage('error_text'))

        return text
    }

    static async from(type: MessageType, from: string | null = null): Promise<string | null> {
        if (from?.length) return from

        const settings = await Settings.getByKey(type)

        return await Valuenator.promptEmpty(settings.from, browser.i18n.getMessage('prompt_from'))
    }

    static async to(to: string | null = null): Promise<string> {
        if (to?.length) return to

        to = await Valuenator.promptEmpty(to, browser.i18n.getMessage('prompt_to'))

        if (!to?.length) throw new Error(browser.i18n.getMessage('error_to'))

        return to
    }

    static async apiKey(): Promise<string> {
        const errMsg = browser.i18n.getMessage('api_key_required')

        let apiKey = await Settings.getByKey('apiKey')

        if (!apiKey) {
            apiKey = prompt(errMsg) ?? ''

            if (apiKey) await Settings.setByKey('apiKey', apiKey)
        }

        if (!apiKey?.length) throw new Error(errMsg)

        return apiKey
    }

    static async addSignature(text: string): Promise<string> {
        const signature = await Settings.getByKey('signature')

        if (signature) {
            const signaturePosition = await Settings.getByKey('signaturePosition')
            text = 'append' === signaturePosition ? `${text}${signature}` : `${signature}${text}`
        }

        return text
    }

    protected static async promptEmpty(value: null | string, msg: string): Promise<string | null> {
        if (value?.length) return value

        return prompt(msg)
    }
}
