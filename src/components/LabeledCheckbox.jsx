import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import browser from 'webextension-polyfill';

export const LabeledCheckbox = ({checked, handleChange, label}) => <FormControlLabel
    control={<Checkbox checked={checked} onChange={handleChange}/>}
    label={browser.i18n.getMessage(label)}
/>;
