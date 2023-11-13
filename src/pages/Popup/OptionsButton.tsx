import Button from '@mui/material/Button'
import React from 'react'
import browser from 'webextension-polyfill'

export default function OptionsButton() {
    const handleOptions = () => {
        typeof browser.runtime.openOptionsPage === 'function'
            ? browser.runtime.openOptionsPage()
            : window.open(browser.runtime.getURL('options.html'))
    }

    return <Button onClick={handleOptions} sx={{marginBottom: '10px'}}>
        {browser.i18n.getMessage('options')}
    </Button>
}
