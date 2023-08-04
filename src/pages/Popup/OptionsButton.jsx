import Button from '@mui/material/Button';
import browser from 'webextension-polyfill';
import React from 'react';

export const OptionsButton = () => {
    const handleOptions = () => {
        typeof browser.runtime.openOptionsPage === 'function'
            ? browser.runtime.openOptionsPage()
            : window.open(browser.runtime.getURL('options.html'));
    };

    return <Button onClick={handleOptions} style={{marginBottom: '10px'}}>
        {browser.i18n.getMessage('options')}
    </Button>;
};
