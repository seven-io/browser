//import 'material-design-lite/material.min';
import browser from 'webextension-polyfill';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-mdl';
import '../../assets/img/icon16.png';
import '../../assets/img/icon19.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import logo from '../../assets/img/logo.svg';
import {General} from '../../util/General';
import Settings from '../../util/Settings';

export default () => {
    const [apiKey, setApiKey] = useState(null);
    const [text, setText] = useState(null);
    const disabled = null === apiKey;

    useEffect(() => {
        Settings.getByKey('apiKey').then(setApiKey).catch(console.error);
    }, []);

    const handleClickSendSms = async () => {
        await General.sendSMS(text);

        setText(null);
    };

    const handleClickSendVoice = async () => {
        await General.sendVoice(text);

        setText(null);
    };

    const handleOptions = () => {
        typeof browser.runtime.openOptionsPage === 'function'
            ? browser.runtime.openOptionsPage()
            : window.open(browser.runtime.getURL('options.html'));
    };

    return <div
        style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        }}
    >
        <img src={logo} alt='extension icon'
             style={{marginBottom: '15px', marginTop: '15px', maxWidth: '150px',}}/>

        <Button
            colored
            onClick={handleOptions}
            raised
            ripple
            style={{marginBottom: '10px'}}
        >
            {browser.i18n.getMessage('options')}
        </Button>

        <Button
            onClick={handleClickSendSms}
            raised
            ripple
            style={{marginBottom: '10px'}}
            disabled={disabled}
        >
            {browser.i18n.getMessage('send_sms')}
        </Button>

        <Button
            disabled={disabled}
            onClick={handleClickSendVoice}
            raised
            ripple
            style={{marginBottom: '10px'}}
        >
            {browser.i18n.getMessage('send_voice')}
        </Button>

        <Button
            // disabled={disabled}
            onClick={General.collectNumbers}
            raised
            ripple
            style={{marginBottom: '10px'}}
        >
            {browser.i18n.getMessage('collect_numbers')}
        </Button>
    </div>;
}
