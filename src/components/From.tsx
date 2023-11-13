import TextField from '@mui/material/TextField'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

type Props = ComponentProps<typeof TextField> & {
    extraHelper?: boolean
}

export default function From({extraHelper = false, type, ...props}: Props) {

    let helperText = browser.i18n.getMessage('sms' === type
        ? 'from_restrictions_sms' : 'from_restrictions_voice')
    if (extraHelper) helperText = `${helperText} ${browser.i18n.getMessage('from_info')}`

    return <TextField
        helperText={helperText}
        inputProps={{
            maxLength: 16,
        }}
        label={browser.i18n.getMessage('from')}
        name='from'
        {...props}
    />
}
