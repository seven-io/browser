import {Button} from '@material-ui/core';
import {General} from '../../util/General';
import browser from 'webextension-polyfill';
import React from 'react';

export const PhoneCollectorButton = ({disabled}) => <Button
    disabled={disabled}
    onClick={() => General.collectNumbers}
    style={{marginBottom: '10px'}}
>
    {browser.i18n.getMessage('collect_phones')}
</Button>;
