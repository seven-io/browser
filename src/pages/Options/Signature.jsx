import React from 'react';
import browser from 'webextension-polyfill';
import TextField from '@mui/material/TextField';

export const Signature = ({handleChange, value}) => <TextField
    helperText={browser.i18n.getMessage('signature_label')}
    label={browser.i18n.getMessage('signature')}
    multiline
    name='signature'
    onChange={handleChange}
    value={value}
/>;
