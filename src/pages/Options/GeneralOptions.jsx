import {Grid, Typography} from '@material-ui/core';
import browser from 'webextension-polyfill';
import {ApiKey} from './ApiKey';
import {To} from './To';
import {Signature} from './Signature';
import {SignaturePosition} from './SignaturePosition';
import React from 'react';

export const GeneralOptions = ({setState, state}) => {
    const handleChange = e => setState({...state, [e.target.name]: e.target.value});

    return <Grid component='section' container direction='column'>
        <Typography variant='h2'>
            {browser.i18n.getMessage('general')}
        </Typography>

        <ApiKey handleChange={handleChange} value={state.apiKey}/>
        <To handleChange={handleChange} value={state.to}/>
        <Signature handleChange={handleChange} value={state.signature}/>
        <SignaturePosition handleChange={handleChange} value={state.signaturePosition}/>
    </Grid>;

};
