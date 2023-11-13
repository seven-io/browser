import TextField from '@mui/material/TextField'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

export const ApiKey = (props: ComponentProps<typeof TextField>) => <TextField
    helperText={browser.i18n.getMessage('api_key_info')}
    label={browser.i18n.getMessage('api_key')}
    name='apiKey'
    {...props}
/>
