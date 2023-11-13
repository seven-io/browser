import TextField from '@mui/material/TextField'
import React, {ComponentProps} from 'react'
import browser from 'webextension-polyfill'

export const To = (props: ComponentProps<typeof TextField>) => <TextField
    helperText={browser.i18n.getMessage('to_info')}
    label={browser.i18n.getMessage('to')}
    name='to'
    {...props}
/>
