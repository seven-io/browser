import Settings from '@/util/Settings'
import type {SelectChangeEvent} from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, {type ChangeEvent} from 'react'
import browser from 'webextension-polyfill'
import {ApiKey} from './ApiKey'
import {Signature} from './Signature'
import SignaturePosition from './SignaturePosition'
import {To} from './To'

type Props = {
    setState: (o: typeof Settings.defaults) => void
    state: typeof Settings.defaults
}

export const GeneralOptions = ({setState, state}: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => setState({...state, [e.target.name]: e.target.value})

    return <Grid component='section' container direction='column'>
        <Typography variant='h2'>
            {browser.i18n.getMessage('general')}
        </Typography>

        <ApiKey onChange={handleChange} value={state.apiKey}/>
        <To onChange={handleChange} value={state.to}/>
        <Signature onChange={handleChange} value={state.signature}/>
        <SignaturePosition
            onChange={e => setState({...state, signaturePosition: e.target.value as any})}
            value={state.signaturePosition}
        />
    </Grid>

}
