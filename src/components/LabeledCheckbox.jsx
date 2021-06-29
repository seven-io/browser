import React from 'react';
import {Checkbox, FormControlLabel} from '@material-ui/core';
import browser from 'webextension-polyfill';

export const LabeledCheckbox = ({checked, handleChange, label}) => <FormControlLabel
    control={<Checkbox checked={checked} onChange={handleChange}/>}
    label={browser.i18n.getMessage(label)}
/>;
