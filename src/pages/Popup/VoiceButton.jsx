import {Button} from '@material-ui/core';
import browser from 'webextension-polyfill';
import React from 'react';

export const VoiceButton = ({disabled, handleClickSendVoice}) => <Button
    disabled={disabled}
    onClick={handleClickSendVoice}
    style={{marginBottom: '10px'}}
>
    {browser.i18n.getMessage('send_voice')}
</Button>;
