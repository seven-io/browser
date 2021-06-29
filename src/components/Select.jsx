import React from 'react';
import browser from 'webextension-polyfill';

export default ({options, label, selected, ...props}) => <label>
    {browser.i18n.getMessage(label)}

    <select {...props}>
        {Object.entries(options).map(([k, v]) =>
            <option value={v} selected={v === selected}>
                {browser.i18n.getMessage(k)}</option>)}
    </select>
</label>