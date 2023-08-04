import Button from '@mui/material/Button';
import browser from 'webextension-polyfill';
import React, {useEffect} from 'react';
import {General} from '../../util/General';

export const SmsButton = ({disabled, setDisabled}) => {
    useEffect(() => setDisabled(true), []);

    const handleClick = async () => {
        await General.sendSMS();

        setDisabled(false);
    };

    return <Button
        disabled={disabled}
        onClick={handleClick}
        style={{marginBottom: '10px'}}
    >
        {browser.i18n.getMessage('send_sms')}
    </Button>;
};
