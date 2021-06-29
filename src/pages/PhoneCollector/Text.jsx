import {TextField} from '@material-ui/core';
import browser from 'webextension-polyfill';
import React from 'react';

export const Text = ({setText, text, type}) => <TextField
    fullWidth
    inputProps={{maxLength: 'sms' === type ? 1520 : 10000}}
    label={browser.i18n.getMessage('text')}
    multiline
    onChange={e => setText(e.target.value)}
    rows={5}
    required
    value={text}
/>;
