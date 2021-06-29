import {Radio, RadioGroup} from 'react-mdl';
import React from 'react';
import browser from 'webextension-polyfill';

export default ({values, ...props}) => {
    return <RadioGroup {...props}>
        {Object.entries(values).map(([k, v]) => <Radio
            value={v}>{browser.i18n.getMessage(k)}</Radio>)}
    </RadioGroup>;
}