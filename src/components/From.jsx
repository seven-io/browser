import React from 'react';
import browser from 'webextension-polyfill';
import TextField from '@mui/material/TextField';

export const From = ({extraHelper = false, handleChange, type, value}) => {

    let helperText = browser.i18n.getMessage('sms' === type
        ? 'from_restrictions_sms' : 'from_restrictions_voice');
    if (extraHelper) helperText = `${helperText} ${browser.i18n.getMessage('from_info')}`;

    return <TextField
        helperText={helperText}
        inputProps={{
            maxLength: 16,
        }}
        label={browser.i18n.getMessage('from')}
        name='from'
        onChange={handleChange}
        value={value}
    />;
};
