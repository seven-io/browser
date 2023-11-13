import General from '@/util/General'
import Button from '@mui/material/Button'
import React, {type ComponentProps} from 'react'
import browser from 'webextension-polyfill'

export default function PhoneCollectorButton(props: ComponentProps<typeof Button>) {
    return <Button
        onClick={() => General.collectNumbers}
        sx={{marginBottom: '10px'}}
        {...props}
    >
        {browser.i18n.getMessage('collect_phones')}
    </Button>
}
