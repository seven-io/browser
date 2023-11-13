import type {MessageType} from '@/pages/PhoneCollector/ExtraOptions'
import Valuenator from '@/util/Valuenator'
import General from './General'

export type MessageOptions = {
    extraOptions?: {}
    from?: string | null
    text?: string | null
    to?: string | null
}

export default class Communicator {
    constructor(public readonly type: MessageType) {
    }

    public async dispatch({
                              extraOptions = {},
                              from,
                              text,
                              to,
                          }: MessageOptions) {
        console.log('Communicator.dispatch.from', from)
        console.log('Communicator.dispatch.text', text)
        console.log('Communicator.dispatch.to', to)

        try {
            const apiKey = await Valuenator.apiKey()

            if (!apiKey.length) return await General.notify('api_key_set', 'api_key_required')

            text = text?.length ? await Valuenator.addSignature(text) : await Valuenator.text(text)
            if (!from?.length) from = await Valuenator.from(this.type, from)
            if (!to?.length) to = await Valuenator.to(to)
            if (Array.isArray(to)) to = to.join(',')

            const json = await this.post(apiKey, {
                from,
                text,
                to,
                ...extraOptions,
            })

            const isSuccess = this.isSuccess(json.success)

            await General.notify([
                isSuccess ? 'msg_dispatch_success' : 'msg_dispatch_error',
                [
                    this.type.toUpperCase(),
                    to,
                    ...(isSuccess ? [
                        from ?? '',
                        text,
                    ] : [text]),
                ],
            ])
        } catch (e) {
            await General.notify(e as Error)
        }
    }

    protected isSuccess(success: string) {
        const successCodes = [100]
        if ('sms' === this.type) successCodes.push(101)
        return successCodes.includes(Number.parseInt(success))
    }

    protected async post(apiKey: string, body: {}) {
        console.log('Communicator.post', {endpoint: this.type, apiKey, body})
        const response = await fetch(`https://gateway.seven.io/api/${this.type}`, {
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                SentWith: 'InstallTrigger' in window ? 'firefox' : 'chrome', // TODO: improve detection
                'X-Api-Key': apiKey,
            },
            method: 'POST',
        })
        return await response.json()
    }
}
