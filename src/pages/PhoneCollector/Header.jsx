import {Button, Grid, Typography} from '@material-ui/core';
import browser from 'webextension-polyfill';
import {Close} from '@material-ui/icons';
import React from 'react';

export const Header = () => {
    const handleClickClose = async () => {
        await browser.runtime.sendMessage({action: 'PHONE_COLLECTOR_CLOSE'});
    };

    return <Grid container justify='space-between'>
        <Typography component='h1'>
            {browser.i18n.getMessage('phone_collector')}
        </Typography>

        <Button endIcon={<Close/>} onClick={handleClickClose} variant='outlined'>
            <Typography component='span'>
                {browser.i18n.getMessage('close')}
            </Typography>
        </Button>
    </Grid>;

};
