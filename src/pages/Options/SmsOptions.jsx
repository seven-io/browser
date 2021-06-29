import {Grid, Typography} from '@material-ui/core';
import {From} from '../../components/From';
import React from 'react';

export const SmsOptions = ({setStateDeep, state}) =>
    <Grid component='section' container direction='column'>
        <Typography variant='h2'>
            SMS
        </Typography>

        <From extraHelper={true}
              handleChange={e => setStateDeep('sms', e)}
              type='sms'
              value={state.sms ? state.sms.from : ''}
        />
    </Grid>;
