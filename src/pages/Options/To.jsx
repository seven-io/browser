import React from 'react';
import TextField from '@mui/material/TextField';
import browser from 'webextension-polyfill';

export const To = ({handleChange, value}) => <TextField
    helperText={browser.i18n.getMessage('to_info')}
    label={browser.i18n.getMessage('to')}
    name='to'
    onChange={handleChange}
    value={value}
/>;
