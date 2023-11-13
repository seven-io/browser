import {MessageType} from '@/pages/PhoneCollector/ExtraOptions'
import TextField from '@mui/material/TextField'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

export default function Text({setText, type, ...props}: ComponentProps<typeof TextField> & {
    setText: (value: string) => void
    type: MessageType
}) {
    return <TextField
        fullWidth
        inputProps={{maxLength: 'sms' === type ? 1520 : 10000}}
        label={browser.i18n.getMessage('text')}
        multiline
        onChange={e => setText(e.target.value)}
        rows={5}
        required
        {...props}
    />
}
