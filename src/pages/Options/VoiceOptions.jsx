import {Grid, Typography} from '@material-ui/core';
import browser from 'webextension-polyfill';
import {From} from '../../components/From';
import React from 'react';

export const VoiceOptions = ({setStateDeep, state}) =>
    <Grid component='section' container direction='column'>
        <Typography variant='h2'>
            {browser.i18n.getMessage('voice')}
        </Typography>

        <From extraHelper={true}
              handleChange={e => setStateDeep('voice', e)}
              type='voice'
              value={state.voice ? state.voice.from : ''}
        />
    </Grid>;
