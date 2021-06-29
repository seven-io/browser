import React from 'react';
import {MenuItem, Select} from '@material-ui/core';
import browser from 'webextension-polyfill';

const options = {
    signature_position_prepend: 'prepend',
    signature_position_append: 'append',
};

export const SignaturePosition = ({handleChange, value}) => <Select
    label={browser.i18n.getMessage('signature_position')}
    name='signaturePosition'
    onChange={handleChange}
    value={value}
>
    {Object.entries(options).map(([k, v]) => <MenuItem
        key={k} value={v}>{browser.i18n.getMessage(k)}</MenuItem>)}
</Select>;
