import React from 'react';
import browser from 'webextension-polyfill';
import {TextField} from '@material-ui/core';

export const ApiKey = ({handleChange, value}) => <TextField
    helperText={browser.i18n.getMessage('api_key_info')}
    label={browser.i18n.getMessage('api_key')}
    name='apiKey'
    onChange={handleChange}
    value={value}
/>;
