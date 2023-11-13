import Storage from './Storage'

export default new Storage<{
    apiKey: string
    signature: string
    signaturePosition: 'append' | 'prepend'
    sms: {
        from: string
    },
    to: string
    voice: {
        from: string
    },
}>('settings', {
    apiKey: '',
    signature: '',
    signaturePosition: 'append',
    sms: {
        from: '',
    },
    to: '',
    voice: {
        from: '',
    },
})
