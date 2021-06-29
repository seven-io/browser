import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Typography} from '@material-ui/core';
import browser from 'webextension-polyfill';
import {General} from '../../util/General';
import Settings from '../../util/Settings';
import {SmsOptions} from './SmsOptions';
import {VoiceOptions} from './VoiceOptions';
import {GeneralOptions} from './GeneralOptions';

export const Options = () => {
    const [state, setState] = useState(Settings.defaults);

    const setStateDeep = (k, e) => {
        const merge = {[k]: {[e.target.name]: e.target.value}};
        const newState = {...state, ...merge};
        setState(newState);
    };

    const handleSubmit = async e => {
        e.preventDefault();

        await Settings.setObject(state);

        await General.notify('settings_updated', 'settings_updated_title');
    };

    useEffect(() => {
        Settings.getAll().then(setState).catch(console.error);
    }, []);

    return <Container>
        <Box component='form' onSubmit={handleSubmit}>
            <Typography variant='h1'>
                Sms77 {browser.i18n.getMessage('options')}
            </Typography>

            <GeneralOptions setState={setState} state={state}/>

            <SmsOptions setStateDeep={setStateDeep} state={state}/>

            <VoiceOptions setStateDeep={setStateDeep} state={state}/>

            <Button fullWidth type='submit'>
                {browser.i18n.getMessage('submit')}
            </Button>
        </Box>
    </Container>;
};
