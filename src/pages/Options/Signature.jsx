import React from 'react';
import browser from 'webextension-polyfill';
import {TextField} from '@material-ui/core';

export const Signature = ({handleChange, value}) => <TextField
    helperText={browser.i18n.getMessage('signature_label')}
    label={browser.i18n.getMessage('signature')}
    multiline
    name='signature'
    onChange={handleChange}
    value={value}
/>;
