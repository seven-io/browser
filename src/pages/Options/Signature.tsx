import TextField from '@mui/material/TextField'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

export const Signature = (props: ComponentProps<typeof TextField>) => <TextField
    helperText={browser.i18n.getMessage('signature_label')}
    label={browser.i18n.getMessage('signature')}
    multiline
    name='signature'
    {...props}
/>
