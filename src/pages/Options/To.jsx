import React from 'react';
import {TextField} from '@material-ui/core';
import browser from 'webextension-polyfill';

export const To = ({handleChange, value}) => <TextField
    helperText={browser.i18n.getMessage('to_info')}
    label={browser.i18n.getMessage('to')}
    name='to'
    onChange={handleChange}
    value={value}
/>;
