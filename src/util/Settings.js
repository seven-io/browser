import {Storage} from './Storage';

export default new Storage('settings', {
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
});
